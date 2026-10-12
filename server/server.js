import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { ApiError } from './gemini.js'
import { parseTransaction, isValidDate } from './parseTransaction.js'
import { generateSummary } from './summary.js'
import { perIpLimiter, dailyLimiter } from './rateLimits.js'

const app = express()
const PORT = process.env.PORT || 3001

// Only turn this on behind a hosting proxy (we set it when deploying)
if (process.env.TRUST_PROXY === '1') {
  app.set('trust proxy', 1)
}

const allowedOrigins = (
  process.env.ALLOWED_ORIGINS || 'http://localhost:5173,https://jacobnyabuto.github.io'
)
  .split(',')
  .map((origin) => origin.trim())

app.use(
  cors({
    origin(origin, callback) {
      // No origin means a non-browser tool (curl, PowerShell), which CORS doesn't apply to
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(null, false)
      }
    },
  })
)

// Lets the server read JSON sent in request bodies (limited to 10 KB)
app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'MoneyTrack API is running',
    aiKeyLoaded: Boolean(process.env.GEMINI_API_KEY),
  })
})

// The limiters run first: per visitor, then the global daily cap
const aiLimits = [perIpLimiter, dailyLimiter]

app.post('/api/parse-transaction', aiLimits, async (req, res, next) => {
  try {
    const { text, today } = req.body ?? {}

    if (typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ error: 'Please type a sentence describing the transaction.' })
    }
    if (text.length > 200) {
      return res.status(400).json({ error: 'Please keep it under 200 characters.' })
    }
    if (!isValidDate(today)) {
      return res.status(400).json({ error: 'A valid "today" date (YYYY-MM-DD) is required.' })
    }

    const transaction = await parseTransaction(text.trim(), today)
    res.json({ transaction })
  } catch (error) {
    next(error)
  }
})

app.post('/api/summary', aiLimits, async (req, res, next) => {
  try {
    const result = await generateSummary(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

// One place that turns errors into JSON responses
app.use((error, req, res, next) => {
  void next // Express needs four parameters here to treat this as an error handler

  if (error instanceof ApiError) {
    return res.status(error.status).json({ error: error.message })
  }
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'The request body is not valid JSON.' })
  }
  if (error.type === 'entity.too.large') {
    return res.status(413).json({ error: 'The request is too large.' })
  }

  console.error('Unexpected server error:', error.message)
  res.status(500).json({ error: 'Something went wrong on the server.' })
})

app.listen(PORT, () => {
  console.log(`MoneyTrack API listening on http://localhost:${PORT}`)
})