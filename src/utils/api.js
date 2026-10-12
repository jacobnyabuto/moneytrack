import { getToday } from './dateHelpers'

const API_URL = import.meta.env.VITE_API_URL

// If no backend address is configured, the AI features stay hidden
export const isAiAvailable = Boolean(API_URL)

// Shared by every AI call: sends JSON, handles timeouts and errors
async function postJson(path, body) {
  // Give up after 30 seconds (free hosting can be slow to wake up)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 30000)

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    // The body might not be JSON if something went badly wrong
    let data = null
    try {
      data = await response.json()
    } catch {
      data = null
    }

    if (!response.ok) {
      throw new Error(data?.error || 'Something went wrong. Please try again.')
    }

    return data
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('The request took too long. Please try again.')
    }
    // fetch throws a TypeError when the server can't be reached at all
    if (error instanceof TypeError) {
      throw new Error("Couldn't reach the server. Is the backend running?")
    }
    throw error
  } finally {
    clearTimeout(timer)
  }
}

export async function parseTransactionText(text) {
  const data = await postJson('/api/parse-transaction', { text, today: getToday() })

  if (!data || typeof data.transaction !== 'object' || data.transaction === null) {
    throw new Error('The server sent an unexpected answer.')
  }

  return data.transaction
}

export async function fetchSummary(payload) {
  const data = await postJson('/api/summary', payload)

  if (!data || typeof data.summary !== 'string' || !Array.isArray(data.tips)) {
    throw new Error('The server sent an unexpected answer.')
  }

  return { summary: data.summary, tips: data.tips }
}