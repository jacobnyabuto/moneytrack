const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

// An error that carries the HTTP status we want to send to the browser
export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

export async function callGemini({ prompt, schema, maxOutputTokens = 400 }) {
  const apiKey = process.env.GEMINI_API_KEY
  const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'

  if (!apiKey) {
    throw new ApiError('The AI service is not configured on the server.', 500)
  }

  // Give up if Gemini takes longer than 15 seconds
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(`${BASE_URL}/${model}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0,
          maxOutputTokens,
          responseMimeType: 'application/json',
          responseSchema: schema,
        },
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      const details = (await response.text()).slice(0, 300)
      console.error(`Gemini returned ${response.status}:`, details)

      if (response.status === 429) {
        throw new ApiError('The AI service is busy. Please try again in a minute.', 429)
      }
      throw new ApiError('The AI service could not process the request.', 502)
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      throw new ApiError('The AI service returned an empty answer.', 502)
    }

    return JSON.parse(text)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    if (error.name === 'AbortError') {
      throw new ApiError('The AI service took too long to answer.', 504)
    }
    console.error('Unexpected Gemini error:', error.message)
    throw new ApiError('The AI service returned an unexpected answer.', 502)
  } finally {
    clearTimeout(timer)
  }
}