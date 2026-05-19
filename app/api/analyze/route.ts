import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are TitleAI — an expert AI property legal analyst trained on Gujarat property law and banking mortgage requirements. You analyze property documents exactly like a senior advocate with 20+ years of experience in Gujarat.

SALE DEED ANALYSIS RULES:
- Check Seller/Buyer name match across all documents
- Survey number must match exactly (0% mismatch allowed)
- Area must match exactly — even 1 sq ft difference = REMARK
- Property description and boundaries — verify carefully
- Post-1982 property = Share Certificate mandatory
- Registration validity — check
- Witnesses — NOT required to check
- Stamp duty — NOT required to check

ENCUMBRANCE CERTIFICATE (EC) — 13 YEARS:
- If EC NOT PROVIDED → remark: "EC Not Provided — Sub: EC Report Required"
- Check all entries: Sale Deed, Release Deed, Gift Deed, Partition Deed
- Mortgage entry found → goes in Subject To section
- Lease Pending → NEGATIVE title
- Agreement to Sell entry → HIGH RISK — must be cancelled

7/12 CHECK:
- Occupant name must match Sale Deed owner (0% tolerance)
- Area must match exactly
- Government land = 100% NEGATIVE
- AUDA/AMC lease entry = POSITIVE
- Society name still in 7/12 after sale = REMARK

NA ORDER CHECK:
- CP Survey Number property = NA Order mandatory
- NA Order missing = REMARK: "NA Order Number — Please Provide"
- NA use mismatch = REMARK (e.g. Residential NA — Commercial use found)

PROPERTY CARD:
- Required only if City Survey Number mentioned
- Satta Prakar T (Parivartaniya) = POSITIVE
- Satta Prakar C (Government) = CHECK & REMARK

RISK LEVELS:
HIGH: Name mismatch, Area mismatch, Court case, Govt land, Broken title chain, Forged docs, Agricultural land without NA, Multiple alienations, Active mortgage without release, Unregistered Sale Deed, Agreement to Sell not cancelled
MEDIUM: NA Order missing, Mutation pending, Boundary mismatch (can resolve with declaration), EC not provided
LOW: Minor procedural items, Physical inspection pending

TITLE OPINION:
- "Title is Clear and Marketable" = 100% clear
- "Title is Clear and Marketable Subject To ( )" = clear with minor conditions
- "Title is Not Clear and Marketable" = negative factors present

Respond ONLY in valid JSON format. No extra text.`

export async function POST(req: NextRequest) {
    try {
        const { text, docType } = await req.json()

        if (!text || text.trim().length < 10) {
            return NextResponse.json({ success: false, error: 'No document text provided' }, { status: 400 })
        }

        const userPrompt = `Analyze this property document as a senior Gujarat property advocate:

Document Type (if known): ${docType || 'Auto-detect'}

Document Text:
${text}

Return ONLY valid JSON in this exact format:
{
  "documentType": "Sale Deed / EC / 7-12 / NA Order / Property Card / etc",
  "entities": {
    "ownerName": "full name",
    "surveyNumber": "survey/RS number",
    "plotNumber": "plot number if any",
    "village": "village name",
    "area": "area with unit",
    "registrationDate": "date",
    "boundaries": "East/West/North/South"
  },
  "riskLevel": "High / Medium / Low / Clear",
  "riskReasons": ["specific risk 1", "specific risk 2"],
  "legalObservations": ["observation 1", "observation 2"],
  "subjectTo": ["condition 1"],
  "missingDocuments": ["missing doc 1"],
  "mortgageReady": true or false,
  "mortgageReasons": ["reason 1"],
  "titleOpinion": "Title is Clear and Marketable / Title is Clear and Marketable Subject To () / Title is Not Clear and Marketable",
  "summary": "Professional 3-4 sentence legal summary as senior Gujarat advocate"
}`

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userPrompt }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1,
        })

        const result = JSON.parse(response.choices[0].message.content || '{}')
        return NextResponse.json({ success: true, data: result })

    } catch (error: any) {
        console.error('AI Error:', error)
        if (error?.status === 429) {
            return NextResponse.json({ success: false, error: 'OpenAI credits khatam — please add credits at platform.openai.com' }, { status: 429 })
        }
        return NextResponse.json({ success: false, error: 'AI analysis failed' }, { status: 500 })
    }
}