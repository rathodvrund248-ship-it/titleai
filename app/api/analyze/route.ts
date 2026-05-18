import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
    try {
        const { text, docType } = await req.json()

        const prompt = `You are TitleAI — an expert Indian property legal intelligence system.

Analyze this property document and provide:
1. Document Type (Sale Deed, EC, 7/12, NA Order, etc.)
2. Key Entities (owner names, survey numbers, plot numbers, village, area, dates)
3. Risk Analysis (High/Medium/Low with reasons)
4. Legal Observations (any issues, mismatches, missing info)
5. Mortgage Readiness (Yes/No with reasons)

Document Text:
${text}

${docType ? `Document Type hint: ${docType}` : ''}

Respond in this JSON format:
{
  "documentType": "",
  "entities": {
    "ownerName": "",
    "surveyNumber": "",
    "plotNumber": "",
    "village": "",
    "area": "",
    "registrationDate": "",
    "boundaries": ""
  },
  "riskLevel": "Low/Medium/High",
  "riskReasons": [],
  "legalObservations": [],
  "mortgageReady": true/false,
  "mortgageReasons": [],
  "summary": ""
}`

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
        })

        const result = JSON.parse(response.choices[0].message.content || '{}')

        return NextResponse.json({ success: true, data: result })
    } catch (error) {
        console.error('AI Error:', error)
        return NextResponse.json({ success: false, error: 'AI analysis failed' }, { status: 500 })
    }
}