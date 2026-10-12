import { rateLimit } from 'express-rate-limit'

// Per visitor: 10 AI requests per minute
export const perIpLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a minute and try again.' },
})

// Everyone together: 300 AI requests per day, to protect the free quota
export const dailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 300,
  standardHeaders: false,
  legacyHeaders: false,
  keyGenerator: () => 'all-visitors',
  message: { error: "The AI features have reached today's limit. Please try again tomorrow." },
})