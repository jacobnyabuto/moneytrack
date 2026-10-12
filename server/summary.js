import { callGemini, ApiError } from './gemini.js'
import { EXPENSE_CATEGORIES } from './parseTransaction.js'

const MONTHS =
  'January|February|March|April|May|June|July|August|September|October|November|December'
const PERIOD_PATTERN = new RegExp(`^(All time|(${MONTHS}) \\d{4})$`)

const schema = {
  type: 'OBJECT',
  properties: {
    summary: { type: 'STRING' },
    tips: { type: 'ARRAY', items: { type: 'STRING' } },
  },
  required: ['summary', 'tips'],
}

function checkMoney(value, name) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1000000000) {
    throw new ApiError(`Invalid ${name}.`, 400)
  }
  return Math.round(value * 100) / 100
}

function formatMoney(value) {
  return `$${value.toFixed(2)}`
}

// Accept only what we expect. Free text never reaches the prompt.
function validateInput(body) {
  const { periodLabel, income, expenses, budget = 0, categories } = body ?? {}

  if (typeof periodLabel !== 'string' || !PERIOD_PATTERN.test(periodLabel)) {
    throw new ApiError('Invalid period.', 400)
  }

  const cleanIncome = checkMoney(income, 'income')
  const cleanExpenses = checkMoney(expenses, 'expenses')
  const cleanBudget = checkMoney(budget, 'budget')

  if (!Array.isArray(categories) || categories.length > EXPENSE_CATEGORIES.length) {
    throw new ApiError('Invalid categories.', 400)
  }

  const cleanCategories = categories.map((item) => {
    if (typeof item !== 'object' || item === null || !EXPENSE_CATEGORIES.includes(item.category)) {
      throw new ApiError('Invalid category.', 400)
    }
    return { category: item.category, total: checkMoney(item.total, 'category total') }
  })

  if (cleanExpenses === 0 || cleanCategories.length === 0) {
    throw new ApiError('There are no expenses to summarize for this period.', 400)
  }

  return {
    periodLabel,
    income: cleanIncome,
    expenses: cleanExpenses,
    budget: cleanBudget,
    categories: cleanCategories,
  }
}

function buildPrompt({ periodLabel, income, expenses, budget, categories }) {
  const lines = [
    `Period: ${periodLabel}`,
    `Income: ${formatMoney(income)}`,
    `Expenses: ${formatMoney(expenses)}`,
  ]

  if (income > 0) {
    const savingsRate = ((income - expenses) / income) * 100
    lines.push(`Savings rate: ${savingsRate.toFixed(1)}%`)
  }

  if (budget > 0 && periodLabel !== 'All time') {
    lines.push(
      `Monthly budget: ${formatMoney(budget)} (${((expenses / budget) * 100).toFixed(1)}% used)`
    )
  }

  lines.push('Spending by category (share of total expenses):')
  categories.forEach(({ category, total }) => {
    lines.push(`- ${category}: ${formatMoney(total)} (${((total / expenses) * 100).toFixed(1)}%)`)
  })

  return `You write short, friendly reviews of a person's personal spending. All amounts are in US dollars.

Return:
- "summary": 2 to 3 plain-language sentences describing the period, using only the numbers below.
- "tips": exactly 3 short, practical, general suggestions based on this data.

Rules:
- Use only the numbers provided. Never invent or estimate numbers.
- Do not give investment, tax, or legal advice. You are not a financial advisor.
- Be encouraging, never judgmental.

Data:
${lines.join('\n')}`
}

export async function generateSummary(body) {
  const data = validateInput(body)
  const result = await callGemini({ prompt: buildPrompt(data), schema, maxOutputTokens: 800 })

  // ---- Validate the AI's answer ----
  const summary = String(result.summary ?? '').trim().slice(0, 600)
  const tips = Array.isArray(result.tips)
    ? result.tips
        .filter((tip) => typeof tip === 'string' && tip.trim() !== '')
        .map((tip) => tip.trim().slice(0, 200))
        .slice(0, 3)
    : []

  if (summary === '') {
    throw new ApiError('The AI service did not return a summary. Please try again.', 502)
  }

  return { summary, tips }
}