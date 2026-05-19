"use client"
import { useEffect, useRef, useState } from 'react'
import Sidebar from '@/components/Sidebar'

export default function Reports() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [generated, setGenerated] = useState(false)
    const [generating, setGenerating] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const [step, setStep] = useState(0)

    const steps = [
        'Extracting document text via OCR...',
        'Classifying document types...',
        'Analysing title chain...',
        'Detecting risks and discrepancies...',
        'Generating legal opinion...',
    ]

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const words = ['TITLEAI', 'LEGAL', 'REPORT', 'OPINION', 'SCRUTINY', 'ADVOCATE', 'TITLE', 'CLEAR', 'RISK', 'MORTGAGE', 'DEED', 'EC', 'SURVEY']
        const fontSize = 13
        const cols = Math.floor(canvas.width / fontSize)
        const drops: number[] = Array(cols).fill(1)
        const draw = () => {
            ctx.fillStyle = 'rgba(2,2,8,0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = 'rgba(245,158,11,0.3)'
            ctx.font = `${fontSize}px monospace`
            drops.forEach((y, i) => {
                const word = words[Math.floor(Math.random() * words.length)]
                const char = word[Math.floor(Math.random() * word.length)]
                ctx.fillText(char, i * fontSize, y * fontSize)
                if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
                drops[i]++
            })
        }
        const interval = setInterval(draw, 50)
        return () => clearInterval(interval)
    }, [])

    const generateReport = () => {
        setGenerating(true)
        setStep(0)
        let s = 0
        const iv = setInterval(() => {
            s++
            setStep(s)
            if (s >= steps.length) {
                clearInterval(iv)
                setTimeout(() => { setGenerating(false); setGenerated(true) }, 600)
            }
        }, 800)
    }

    const getSeverityColor = (s: string) => {
        if (s === 'High') return '#ef4444'
        if (s === 'Medium') return '#f59e0b'
        return '#10b981'
    }

    const tabs = ['PART I — Documents', 'PART II — Title Flow', 'PART III — Discrepancies', 'PART IV — Opinion']

    const documents = [
        { name: 'Registered Sale Deed dated 20/11/1965 (Doc No. 4520)', desc: 'Root of title. Transfer from Aayar Vastabhai Sardulbhai to Aayar Panchabhai & Devayat Ladhabhai. Agricultural land, Village Bedi, Rajkot.', amount: 'N/A' },
        { name: 'Registered Sale Deed dated 01/06/1968 (Doc No. 2184)', desc: 'Transfer to 4 purchasers jointly — Champaklal Maniyar, Mohan Patel, Sava Patel, Premji Meghji. Survey No. 120, 7 Acres, Village Bedi.', amount: 'Rs. 16,700' },
        { name: 'Heirship Certificate dated 20/10/1997', desc: 'Legal heirs of Late Savabhai Virabhai Patel — Hiruben (Widow), Ramjibhai, Ambabhai, Demjibhai.', amount: 'N/A' },
        { name: 'Probate of Will dated 06/07/1998', desc: '25% share of Mohanbhai Virabhai Patel devolved to Valjibhai & Govindbhai Mohanbhai via Probate.', amount: 'N/A' },
        { name: 'Registered Release Deed dated 27/09/2018 (Doc No. 4540)', desc: 'Heirs of Premjibhai Domadiya release undivided share in Survey No. 69.', amount: 'Nil' },
        { name: 'Registered Partition Deed dated 17/01/2023 (Doc No. 407)', desc: 'Partition of Survey No. 69 among successors. Subject property allotted to Valjibhai Mohanbhai Padariya group.', amount: 'N/A' },
        { name: 'NA Conversion Order No. 736/09/06/019/2024 dated 12/06/2024', desc: 'Collector Rajkot converts Survey No. 69/3 (4112.40 Sq.Mtrs) to non-agricultural for residential use.', amount: 'N/A' },
        { name: 'RUDA Layout Permission dated 01/08/2024', desc: 'Development permission for layout on R.S. No. 69/3, Village Bedi. Net plot area 4112.40 Sq.Mtrs.', amount: 'N/A' },
        { name: 'Registered Sale Deed dated 11/09/2024 (Doc No. 14412)', desc: 'Valjibhai Padariya & 3 brothers sell Plots 45-56 (671.73 Sq.Mtrs) to Rasilaben Talaviya.', amount: 'Rs. 14,11,000' },
        { name: 'Registered Sale Deed dated 01/07/2025 (Doc No. 10533)', desc: 'Rasilaben Talaviya sells Plots 52-56 (291.7 Sq.Mtrs) to Jay Mansukhbhai Lakhani (Swaminarayan Developers).', amount: 'Rs. 6,75,000' },
        { name: 'Sale Deed (Vachan Dastavej) dated __/04/2025 — UNREGISTERED', desc: 'Jay Lakhani to Smt. Manisha Miyatra for Plot No. 52. Document is UNDATED and UNREGISTERED.', amount: 'Rs. 12,50,000' },
        { name: 'Encumbrance Certificate 2012–2026 (SRO Rajkot-2)', desc: 'EC reflects Sale Deed 14412, Declaration 10528, Sale Deed 10533, and Agreement to Sell 10535 (Jay Lakhani to Bharatbhai Amreliya for Plots 52-56).', amount: 'Rs. 260' },
    ]

    const titleFlow = [
        'Registered Sale Deed dated 20/11/1965 (Doc No. 4520) — Aayar Vastabhai Sardulbhai transferred parent agricultural land to Aayar Panchabhai Ladhabhai and Aayar Devayat Ladhabhai. This forms the root of title.',
        'By Registered Sale Deed dated 01/06/1968 (Doc No. 2184) — Panchabhai & Devayat Ladhabhai sold Survey No. 120 (7 Acres, Village Bedi) to four joint purchasers: Champaklal Maniyar, Mohan Patel, Sava Patel, and Premji Meghji for Rs. 16,700.',
        'Title devolved through succession — Share of Mohan Patel (died 06/01/1998) devolved via Probate of Will (06/07/1998) to sons Valjibhai & Govindbhai. Share of Sava Patel (died 21/08/1996) devolved via Heirship Certificate (20/10/1997). Heirs of Premji Meghji released rights via Release Deed No. 4540 (27/09/2018).',
        'By Registered Partition Deed dated 17/01/2023 (Doc No. 407) — Successors of original 4 purchasers partitioned land re-surveyed as Revenue Survey No. 69. Subject property allotted to Valjibhai Mohanbhai Padariya group.',
        'NA Conversion Order obtained from Collector, Rajkot on 12/06/2024 and RUDA Layout Permission on 01/08/2024 for residential development on R.S. No. 69/3/Paiki 2.',
        'By Registered Sale Deed dated 11/09/2024 (Doc No. 14412) — Valjibhai Mohanbhai Padariya & 3 brothers sold Plots 45-56 (671.73 Sq.Mtrs) to Smt. Rasilaben Ghanshyambhai Talaviya for Rs. 14,11,000. Name mutated in revenue records.',
        'By Registered Sale Deed dated 01/07/2025 (Doc No. 10533) — Rasilaben Talaviya sold Plots 52-56 (291.7 Sq.Mtrs) to Shri Jay Mansukhbhai Lakhani (Swaminarayan Developers) for Rs. 6,75,000.',
        'Developer Jay Mansukhbhai Lakhani executed Sale Deed for Plot No. 52 in favour of Smt. Manisha Shaileshbhai Miyatra for Rs. 12,50,000. However, this deed is UNDATED and UNREGISTERED — does not confer valid legal title.',
        'EC (2012-2026) reflects Registered Agreement to Sell (Doc No. 10535) dated 01/07/2025 by Jay Lakhani in favour of third party Shri Bharatbhai Harjibhai Amreliya for Plots 52-56. This creates a significant prior encumbrance on the title.',
    ]

    const discrepancies = [
        { severity: 'High', issue: 'The Sale Deed executed by vendor Shri Jay Mansukhbhai Lakhani in favour of proposed borrower Smt. Manisha Shaileshbhai Miyatra is undated and unregistered. An unregistered sale deed does not confer valid legal title upon the purchaser.', suggestion: 'The borrower and vendor must execute and duly register the Sale Deed with the concerned Sub-Registrar Office. Loan cannot be disbursed until title is validly transferred via registration.' },
        { severity: 'High', issue: 'EC reflects Registered Agreement to Sell (Doc No. 10535) dated 01/07/2025 by Jay Mansukhbhai Lakhani in favour of third party Shri Bharatbhai Harjibhai Amreliya for Plots 52-56. This constitutes a material encumbrance and prior claim on the property.', suggestion: 'Borrower must procure a registered Deed of Cancellation for Agreement to Sell (Doc No. 10535). Fresh updated EC must be obtained thereafter. Bank must not proceed until this prior agreement is formally and legally cancelled.' },
        { severity: 'High', issue: 'Significant discrepancy in Eastern boundary — Sale Deed 14412 mentions "Survey No. 70"; Sale Deed 10533 mentions "Survey No. 69/4"; approved Layout Plan shows Eastern boundary as adjacent to Survey No. 68 and 7.50 meter road.', suggestion: 'Obtain certified Tippan/FMB sketch from DILR office. A Rectification Deed may be required to correct boundaries in title documents to match official survey records.' },
        { severity: 'Medium', issue: 'Long and complex title chain involving multiple successions, partition, and conversion. Authenticity of all link documents especially older deeds, POAs, and succession documents is crucial.', suggestion: 'Obtain certified copies of all key documents (especially Partition Deed No. 407, Sale Deeds No. 14412 & 10533) from jurisdictional Sub-Registrar Office to verify against official records.' },
        { severity: 'Low', issue: 'Physical inspection of the property has not been conducted as part of this scrutiny.', suggestion: 'Conduct site visit to confirm physical possession, identify any encroachments or boundary disputes, and verify property against approved layout plan.' },
        { severity: 'Low', issue: 'Minor spelling inconsistency — "MANESHA" in legal request form vs "Manisha" in draft Sale Deed.', suggestion: 'Confirm correct spelling across all documents. An affidavit confirming both names belong to the same person may be obtained.' },
    ]

    return (
        <div style={{ background: '#020208', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex' }}>
            <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, opacity: 0.5, pointerEvents: 'none' }} />
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '200px', position: 'relative', zIndex: 1 }}>

                {/* Topbar */}
                <div style={{ borderBottom: '1px solid rgba(245,158,11,0.2)', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(2,2,8,0.9)', backdropFilter: 'blur(20px)' }}>
                    <div>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>AI Legal <span style={{ color: '#f59e0b' }}>Report</span></div>
                        <div style={{ fontSize: '11px', color: '#4b5563', marginTop: '2px' }}>DOCUMENT SCRUTINY REPORT</div>
                    </div>
                    {generated && (
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={() => { setGenerated(false); setGenerating(false) }} style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '8px', padding: '8px 16px', color: '#f59e0b', fontSize: '13px', cursor: 'pointer' }}>↻ REGENERATE</button>
                            <button style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '8px', padding: '8px 16px', color: '#000', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>↓ DOWNLOAD PDF</button>
                        </div>
                    )}
                </div>

                <div style={{ padding: '32px' }}>

                    {/* NOT GENERATED */}
                    {!generated && !generating && (
                        <div style={{ textAlign: 'center', padding: '80px 32px' }}>
                            <div style={{ fontSize: '48px', marginBottom: '24px' }}>📋</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>Generate Legal Scrutiny Report</div>
                            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Document Scrutiny Report — Part I, II, III, IV</div>
                            <div style={{ fontSize: '13px', color: '#4b5563', marginBottom: '40px' }}>Upload documents first — AI will analyse and generate complete report</div>
                            <button onClick={generateReport} style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '12px', padding: '16px 48px', color: '#000', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 0 40px rgba(245,158,11,0.4)' }}>
                                ⚡ GENERATE REPORT
                            </button>
                        </div>
                    )}

                    {/* GENERATING */}
                    {generating && (
                        <div style={{ textAlign: 'center', padding: '80px 32px' }}>
                            <div style={{ fontSize: '16px', fontWeight: '600', color: '#f59e0b', marginBottom: '40px', letterSpacing: '2px' }}>AI PROCESSING...</div>
                            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                                {steps.map((s, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', marginBottom: '8px', background: i < step ? 'rgba(245,158,11,0.05)' : 'rgba(10,10,20,0.5)', border: `1px solid ${i < step ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.05)'}`, borderRadius: '10px', transition: 'all 0.3s' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: i < step ? '#f59e0b' : 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: i < step ? '#000' : '#6b7280', fontWeight: '700', flexShrink: 0 }}>
                                            {i < step ? '✓' : i + 1}
                                        </div>
                                        <div style={{ fontSize: '14px', color: i < step ? '#f59e0b' : '#4b5563', textAlign: 'left' }}>{s}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* GENERATED */}
                    {generated && (
                        <div>
                            {/* Header */}
                            <div style={{ background: 'rgba(10,10,20,0.9)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '16px', padding: '32px', marginBottom: '24px', backdropFilter: 'blur(20px)' }}>
                                <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(245,158,11,0.15)' }}>
                                    <div style={{ fontSize: '11px', color: '#f59e0b', letterSpacing: '3px', marginBottom: '8px' }}>TITLEAI — AI POWERED PROPERTY INTELLIGENCE</div>
                                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>SUB: DOCUMENT SCRUTINY REPORT</div>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '12px' }}>
                                        <span style={{ fontSize: '12px', color: '#6b7280' }}>Report No: <span style={{ color: '#f59e0b' }}>TAI-2025-0052</span></span>
                                        <span style={{ fontSize: '12px', color: '#6b7280' }}>Date: <span style={{ color: '#f59e0b' }}>19/05/2026</span></span>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0' }}>
                                    {[
                                        { label: 'A. Name of the Applicant', value: 'Smt. Manisha Shaileshbhai Miyatra' },
                                        { label: 'B. Name of Owner', value: 'Shri Jay Mansukhbhai Lakhani (Prop. Swaminarayan Developers)' },
                                        { label: 'C. Name of Proposed Owner', value: 'Smt. Manisha Shaileshbhai Miyatra' },
                                        { label: 'D. Nature of Property', value: 'Plot with Construction' },
                                        { label: 'E. Nature of Ownership', value: 'Freehold' },
                                        { label: 'F. SRO', value: 'S.R.O - RAJKOT-2 Morbi Road' },
                                        { label: 'G. Survey No.', value: '69/3/Paiki 2' },
                                    ].map((item, i) => (
                                        <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid rgba(245,158,11,0.06)', borderRight: i % 2 === 0 ? '1px solid rgba(245,158,11,0.06)' : 'none' }}>
                                            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>{item.label}</div>
                                            <div style={{ fontSize: '13px', color: '#fff', fontWeight: '500' }}>{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ padding: '16px', borderTop: '1px solid rgba(245,158,11,0.06)', marginTop: '4px' }}>
                                    <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>H. DESCRIPTION OF PROPERTY</div>
                                    <div style={{ fontSize: '13px', color: '#d1d5db', lineHeight: '1.7' }}>Plot No. 52, having Plot area admeasuring 54.29 Sq.Mtrs with Construction area admeasuring 87.62 Sq.Mtrs in Phase-C of the scheme known as "Vrundavan Village", situated on Non-Agricultural land bearing Revenue Survey No. 69/3 (Post NA Revenue Survey No. 69/3/Paiki 2), at Mouje Bedi, Taluka and District Rajkot, Gujarat.</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '16px', padding: '16px', background: 'rgba(245,158,11,0.03)', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.1)' }}>
                                    <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px', gridColumn: '1/-1' }}>BOUNDARIES</div>
                                    {[{ dir: 'EAST', val: 'Adjacent Survey No. 69/4 — 3.96 Mtrs' }, { dir: 'WEST', val: '9.00 Meter Road — 3.96 Mtrs' }, { dir: 'NORTH', val: 'Plot No. 51 — 13.71 Mtrs' }, { dir: 'SOUTH', val: 'Plot No. 53 — 13.71 Mtrs' }].map(b => (
                                        <div key={b.dir} style={{ display: 'flex', gap: '8px' }}>
                                            <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '700', minWidth: '40px' }}>{b.dir}:</span>
                                            <span style={{ fontSize: '12px', color: '#9ca3af' }}>{b.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tabs */}
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', background: 'rgba(10,10,20,0.8)', borderRadius: '10px', padding: '4px', border: '1px solid rgba(245,158,11,0.1)' }}>
                                {tabs.map((tab, i) => (
                                    <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, padding: '10px 8px', borderRadius: '8px', border: 'none', background: activeTab === i ? 'rgba(245,158,11,0.15)' : 'transparent', color: activeTab === i ? '#f59e0b' : '#4b5563', fontSize: '11px', fontWeight: activeTab === i ? '700' : '400', cursor: 'pointer', letterSpacing: '0.5px' }}>
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* PART I */}
                            {activeTab === 0 && (
                                <div style={{ background: 'rgba(10,10,20,0.8)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '12px', overflow: 'hidden' }}>
                                    <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
                                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>PART I — LIST OF DOCUMENTS SUBMITTED FOR SCRUTINY AND LEGAL OPINION</div>
                                    </div>
                                    {documents.map((doc, i) => (
                                        <div key={i} style={{ padding: '20px 24px', borderBottom: i < documents.length - 1 ? '1px solid rgba(245,158,11,0.06)' : 'none' }}>
                                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '8px' }}>
                                                <div style={{ minWidth: '24px', height: '24px', borderRadius: '6px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#f59e0b', fontWeight: '700', flexShrink: 0 }}>{i + 1}</div>
                                                <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>{doc.name}</div>
                                            </div>
                                            <div style={{ marginLeft: '36px' }}>
                                                <div style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '1.7', marginBottom: '8px' }}>{doc.desc}</div>
                                                {doc.amount !== 'N/A' && <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '6px', padding: '4px 10px' }}><span style={{ fontSize: '11px', color: '#6b7280' }}>Amount:</span><span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '600' }}>{doc.amount}</span></div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* PART II */}
                            {activeTab === 1 && (
                                <div style={{ background: 'rgba(10,10,20,0.8)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '12px', overflow: 'hidden' }}>
                                    <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
                                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>PART II — FLOW OF TITLE OF PROPERTY (HISTORY OF TITLE)</div>
                                    </div>
                                    <div style={{ padding: '24px', position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '44px', top: '24px', bottom: '24px', width: '2px', background: 'linear-gradient(180deg, rgba(245,158,11,0.5), rgba(245,158,11,0.05))' }} />
                                        {titleFlow.map((entry, i) => (
                                            <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(245,158,11,0.15)', border: '2px solid rgba(245,158,11,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#f59e0b', fontWeight: '700', flexShrink: 0, zIndex: 1 }}>{i + 1}</div>
                                                <div style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.1)', borderRadius: '10px', padding: '16px', flex: 1 }}>
                                                    <div style={{ fontSize: '13px', color: '#d1d5db', lineHeight: '1.7' }}>{entry}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* PART III */}
                            {activeTab === 2 && (
                                <div style={{ background: 'rgba(10,10,20,0.8)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '12px', overflow: 'hidden' }}>
                                    <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
                                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>PART III — DISCREPANCIES / QUERIES NOTED</div>
                                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                                            {['High', 'Medium', 'Low'].map(s => (
                                                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getSeverityColor(s) }} />
                                                    <span style={{ fontSize: '11px', color: '#6b7280' }}>{discrepancies.filter(d => d.severity === s).length} {s}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ padding: '16px 24px' }}>
                                        {discrepancies.map((d, i) => (
                                            <div key={i} style={{ marginBottom: '16px', background: `${getSeverityColor(d.severity)}08`, border: `1px solid ${getSeverityColor(d.severity)}25`, borderRadius: '12px', overflow: 'hidden' }}>
                                                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${getSeverityColor(d.severity)}20`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{ background: getSeverityColor(d.severity), borderRadius: '6px', padding: '3px 10px', fontSize: '11px', color: '#fff', fontWeight: '700', letterSpacing: '1px' }}>{d.severity.toUpperCase()}</div>
                                                    <div style={{ fontSize: '12px', color: getSeverityColor(d.severity), fontWeight: '600' }}>Issue #{i + 1}</div>
                                                </div>
                                                <div style={{ padding: '16px' }}>
                                                    <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px', letterSpacing: '1px' }}>ISSUE</div>
                                                    <div style={{ fontSize: '13px', color: '#d1d5db', lineHeight: '1.7', marginBottom: '16px' }}>{d.issue}</div>
                                                    <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px', letterSpacing: '1px' }}>SUGGESTION</div>
                                                    <div style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.7', paddingLeft: '12px', borderLeft: `2px solid ${getSeverityColor(d.severity)}40` }}>{d.suggestion}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* PART IV */}
                            {activeTab === 3 && (
                                <div style={{ background: 'rgba(10,10,20,0.8)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '12px', overflow: 'hidden' }}>
                                    <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
                                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>PART IV — FINAL CERTIFICATE / OPINION</div>
                                    </div>
                                    <div style={{ padding: '32px' }}>
                                        <div style={{ background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.4)', borderRadius: '12px', padding: '20px 24px', marginBottom: '28px', textAlign: 'center' }}>
                                            <div style={{ fontSize: '18px', fontWeight: '800', color: '#ef4444', letterSpacing: '1px' }}>TITLE IS NOT CLEAR AND MARKETABLE</div>
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#d1d5db', lineHeight: '1.9', marginBottom: '32px' }}>
                                            Upon scrutiny of the submitted documents, it is opined that the title to the subject property, being Plot No. 52, admeasuring 54.29 Sq.Mtrs with construction of 87.62 Sq.Mtrs, in "Vrundavan Village", Phase-C, R.S. No. 69/3/Paiki 2, Village Bedi, Rajkot, is NOT clear and marketable at present. The title flow is traceable but is rendered defective by two major issues: (1) The Sale Deed in favour of the proposed borrower is not registered, and therefore she does not hold valid legal title; (2) There is a subsisting registered Agreement to Sell in favour of a third party executed by the current vendor, which constitutes a significant encumbrance. Therefore, the property is NOT considered suitable for creating an equitable mortgage in its current state.
                                        </div>
                                        <div style={{ borderTop: '1px solid rgba(245,158,11,0.15)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                            <div>
                                                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>REPORT GENERATED BY</div>
                                                <div style={{ fontSize: '13px', color: '#f59e0b', fontWeight: '600' }}>TitleAI — AI Property Intelligence Platform</div>
                                                <div style={{ fontSize: '11px', color: '#4b5563', marginTop: '2px' }}>Report No: TAI-2025-0052 | Date: 19/05/2026</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ width: '160px', borderBottom: '1px solid rgba(255,255,255,0.2)', marginBottom: '8px', height: '40px' }} />
                                                <div style={{ fontSize: '13px', color: '#fff', fontWeight: '600' }}>Adv. [Name]</div>
                                                <div style={{ fontSize: '11px', color: '#6b7280' }}>Advocate & Notary</div>
                                                <div style={{ fontSize: '11px', color: '#6b7280' }}>Enrolment No: ___________</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}