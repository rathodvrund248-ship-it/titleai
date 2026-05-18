"use client"
import { useState, useRef, useEffect } from 'react'

export default function Reports() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [generating, setGenerating] = useState(false)
    const [generated, setGenerated] = useState(false)
    const [activeSection, setActiveSection] = useState('overview')

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const words = ['TITLEAI', 'LEGAL', 'REPORT', 'OPINION', 'SCRUTINY', 'VERIFIED', 'ADVOCATE', 'TITLE', 'CLEAR', 'RISK', 'MORTGAGE', 'DEED', 'EC', 'SURVEY']
        const fontSize = 13
        const cols = Math.floor(canvas.width / fontSize)
        const drops: number[] = Array(cols).fill(1)
        const speeds: number[] = Array(cols).fill(0).map(() => Math.random() * 0.4 + 0.2)
        const draw = () => {
            ctx.fillStyle = 'rgba(2,2,8,0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            for (let i = 0; i < drops.length; i++) {
                const word = words[Math.floor(Math.random() * words.length)]
                ctx.fillStyle = 'rgba(245,158,11,' + (Math.random() * 0.4 + 0.2) + ')'
                ctx.font = 'bold ' + fontSize + 'px monospace'
                ctx.fillText(word[Math.floor(Math.random() * word.length)], i * fontSize, drops[i] * fontSize)
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
                drops[i] += speeds[i]
            }
        }
        const interval = setInterval(draw, 40)
        return () => clearInterval(interval)
    }, [])

    const handleGenerate = () => {
        setGenerating(true)
        setTimeout(() => {
            setGenerating(false)
            setGenerated(true)
        }, 3000)
    }

    const sections = [
        { id: 'overview', label: 'Overview' },
        { id: 'title', label: 'Title Verification' },
        { id: 'risk', label: 'Risk Analysis' },
        { id: 'mortgage', label: 'Mortgage Opinion' },
        { id: 'legal', label: 'Legal Opinion' },
    ]

    return (
        <div style={{ minHeight: '100vh', background: '#020208', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', position: 'relative', overflow: 'hidden' }}>

            <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, opacity: 0.4 }} />
            <div style={{ position: 'fixed', top: '20%', left: '40%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

            {/* Sidebar */}
            <div style={{ width: '225px', background: 'rgba(2,2,8,0.95)', borderRight: '1px solid rgba(99,102,241,0.25)', padding: '24px 0', display: 'flex', flexDirection: 'column', flexShrink: 0, zIndex: 10, backdropFilter: 'blur(30px)' }}>
                <div style={{ padding: '0 20px 22px', borderBottom: '1px solid rgba(99,102,241,0.15)' }}>
                    <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '-1px' }}>
                        <span style={{ color: '#fff' }}>Title</span>
                        <span style={{ color: '#6366f1', textShadow: '0 0 20px #6366f1' }}>AI</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px #10b981' }}></div>
                        <div style={{ fontSize: '9px', color: '#10b981', letterSpacing: '2.5px', fontWeight: '700' }}>SYSTEM ONLINE</div>
                    </div>
                </div>
                <div style={{ padding: '20px 12px', flex: 1 }}>
                    {[
                        { icon: '⬡', label: 'Dashboard' },
                        { icon: '◈', label: 'Cases' },
                        { icon: '⬆', label: 'Upload Docs' },
                        { icon: '⛓', label: 'Title Flow' },
                        { icon: '◉', label: 'Risk Engine' },
                        { icon: '◈', label: 'Mortgage' },
                        { icon: '▤', label: 'Reports', active: true },
                    ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', marginBottom: '3px', background: item.active ? 'rgba(99,102,241,0.18)' : 'transparent', border: item.active ? '1px solid rgba(99,102,241,0.5)' : '1px solid transparent', cursor: 'pointer' }}>
                            <span style={{ fontSize: '15px', color: item.active ? '#6366f1' : '#1e293b' }}>{item.icon}</span>
                            <span style={{ fontSize: '13px', color: item.active ? '#fff' : '#475569', fontWeight: item.active ? '700' : '400' }}>{item.label}</span>
                            {item.active && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 10px #6366f1' }}></div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main */}
            <div style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 10 }}>

                <div style={{ padding: '18px 32px', borderBottom: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(2,2,8,0.9)', backdropFilter: 'blur(30px)' }}>
                    <div>
                        <div style={{ fontSize: '22px', fontWeight: '900', color: '#fff' }}>
                            AI Legal <span style={{ color: '#f59e0b', textShadow: '0 0 20px rgba(245,158,11,0.8)' }}>Report</span>
                        </div>
                        <div style={{ fontSize: '10px', color: '#334155', marginTop: '3px', letterSpacing: '2px', fontWeight: '600' }}>AI GENERATED TITLE SCRUTINY & LEGAL OPINION</div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {generated && (
                            <button style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '10px', padding: '10px 20px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', letterSpacing: '0.5px' }}>
                                ↓ DOWNLOAD PDF
                            </button>
                        )}
                        <button
                            onClick={handleGenerate}
                            disabled={generating}
                            style={{ background: generating ? 'rgba(245,158,11,0.2)' : 'linear-gradient(135deg, #f59e0b, #ef4444)', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 22px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', boxShadow: generating ? 'none' : '0 0 25px rgba(245,158,11,0.4)', letterSpacing: '0.5px' }}>
                            {generating ? '⟳ GENERATING...' : generated ? '↻ REGENERATE' : '⚡ GENERATE REPORT'}
                        </button>
                    </div>
                </div>

                <div style={{ padding: '32px' }}>

                    {/* Not generated yet */}
                    {!generated && !generating && (
                        <div style={{ background: 'rgba(2,2,8,0.9)', border: '2px dashed rgba(245,158,11,0.3)', borderRadius: '20px', padding: '80px 40px', textAlign: 'center', backdropFilter: 'blur(30px)' }}>
                            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📋</div>
                            <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '12px', letterSpacing: '-0.5px' }}>Generate AI Legal Report</div>
                            <div style={{ fontSize: '14px', color: '#334155', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px', lineHeight: '1.7' }}>
                                AI will analyze all uploaded documents and generate a complete title scrutiny report with legal opinion, risk analysis, and mortgage recommendations.
                            </div>
                            <button onClick={handleGenerate}
                                style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: '#fff', border: 'none', borderRadius: '12px', padding: '16px 40px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 30px rgba(245,158,11,0.4)', letterSpacing: '0.5px' }}>
                                ⚡ GENERATE AI LEGAL REPORT
                            </button>
                        </div>
                    )}

                    {/* Generating */}
                    {generating && (
                        <div style={{ background: 'rgba(2,2,8,0.9)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', padding: '60px 40px', textAlign: 'center', backdropFilter: 'blur(30px)' }}>
                            <div style={{ fontSize: '48px', marginBottom: '24px' }}>⚡</div>
                            <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff', marginBottom: '32px' }}>AI Generating Legal Report...</div>
                            {[
                                'Analyzing all uploaded documents...',
                                'Extracting entities and verification...',
                                'Running risk analysis engine...',
                                'Generating title flow chain...',
                                'Preparing legal opinion...',
                            ].map((step, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderRadius: '10px', marginBottom: '8px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.1)', maxWidth: '500px', margin: '0 auto 8px', textAlign: 'left' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px #f59e0b', flexShrink: 0 }}></div>
                                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>{step}</div>
                                </div>
                            ))}
                            <div style={{ marginTop: '24px', height: '4px', background: 'rgba(245,158,11,0.1)', borderRadius: '4px', maxWidth: '500px', margin: '24px auto 0', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: '75%', background: 'linear-gradient(90deg, #f59e0b, #ef4444)', borderRadius: '4px', boxShadow: '0 0 15px rgba(245,158,11,0.8)' }} />
                            </div>
                        </div>
                    )}

                    {/* Generated Report */}
                    {generated && (
                        <div>
                            {/* Report Header */}
                            <div style={{ background: 'rgba(2,2,8,0.95)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', padding: '32px', marginBottom: '20px', backdropFilter: 'blur(30px)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#f59e0b', letterSpacing: '2px', fontWeight: '800', marginBottom: '8px' }}>TITLEAI — LEGAL SCRUTINY REPORT</div>
                                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#fff', marginBottom: '6px' }}>Patel Residence — Navrangpura, Ahmedabad</div>
                                        <div style={{ fontSize: '13px', color: '#475569' }}>Report No: TAI-2024-4821 · Generated: 18 May 2026</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '10px', color: '#334155', letterSpacing: '1px', marginBottom: '6px' }}>OVERALL STATUS</div>
                                        <div style={{ fontSize: '16px', fontWeight: '900', color: '#f59e0b', textShadow: '0 0 15px rgba(245,158,11,0.6)' }}>CONDITIONALLY CLEAR</div>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                                    {[
                                        { label: 'Risk Level', value: 'Medium', color: '#f59e0b' },
                                        { label: 'Title Status', value: 'Clear', color: '#10b981' },
                                        { label: 'Mortgage', value: '92% Ready', color: '#6366f1' },
                                        { label: 'Chain', value: '58 Years', color: '#8b5cf6' },
                                    ].map(m => (
                                        <div key={m.label} style={{ padding: '14px 16px', background: 'rgba(99,102,241,0.05)', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.1)' }}>
                                            <div style={{ fontSize: '10px', color: '#334155', letterSpacing: '1px', fontWeight: '700', marginBottom: '6px' }}>{m.label.toUpperCase()}</div>
                                            <div style={{ fontSize: '16px', fontWeight: '800', color: m.color }}>{m.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Section Tabs */}
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                                {sections.map(s => (
                                    <button key={s.id} onClick={() => setActiveSection(s.id)}
                                        style={{ padding: '9px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', border: activeSection === s.id ? '1px solid #f59e0b' : '1px solid rgba(245,158,11,0.2)', background: activeSection === s.id ? 'rgba(245,158,11,0.15)' : 'rgba(2,2,8,0.8)', color: activeSection === s.id ? '#f59e0b' : '#475569', transition: 'all 0.2s' }}>
                                        {s.label}
                                    </button>
                                ))}
                            </div>

                            {/* Overview */}
                            {activeSection === 'overview' && (
                                <div style={{ background: 'rgba(2,2,8,0.9)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(30px)' }}>
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#fff', letterSpacing: '1px', marginBottom: '20px' }}><span style={{ color: '#f59e0b' }}>▤</span> EXECUTIVE SUMMARY</div>
                                    <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.8', marginBottom: '24px' }}>
                                        The property situated at Survey No. 142/A, Plot No. 7, Village Odhav, Ahmedabad has been examined. The title chain spanning 58 years from 1966 to 2024 has been verified and found to be substantially clear with minor observations.
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        {[
                                            { title: 'Property Details', items: ['Survey No: 142/A', 'Plot No: 7', 'Village: Odhav, Ahmedabad', 'Area: 242 sq. yards', 'Type: Non-Agricultural'] },
                                            { title: 'Current Owner', items: ['Name: Priya Patel', 'Sale Deed: Reg. 4821/2024', 'Purchase Price: ₹1.85 Cr', 'Date: March 2024', 'Sub-Registrar: Ahmedabad'] },
                                        ].map(section => (
                                            <div key={section.title} style={{ padding: '18px', background: 'rgba(99,102,241,0.05)', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.1)' }}>
                                                <div style={{ fontSize: '11px', color: '#6366f1', letterSpacing: '1px', fontWeight: '800', marginBottom: '12px' }}>{section.title.toUpperCase()}</div>
                                                {section.items.map((item, i) => (
                                                    <div key={i} style={{ fontSize: '13px', color: '#94a3b8', padding: '5px 0', borderBottom: '1px solid rgba(99,102,241,0.06)' }}>{item}</div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Title Verification */}
                            {activeSection === 'title' && (
                                <div style={{ background: 'rgba(2,2,8,0.9)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(30px)' }}>
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#fff', letterSpacing: '1px', marginBottom: '20px' }}><span style={{ color: '#f59e0b' }}>⛓</span> TITLE VERIFICATION</div>
                                    <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.8', marginBottom: '20px' }}>
                                        The title chain has been traced from 1966 to 2024 — a period of 58 years. All transactions have been verified through original documents and revenue records.
                                    </div>
                                    {[
                                        { year: '1966-1978', event: 'Original agricultural land held by Maganbhai Patel', status: 'Verified' },
                                        { year: '1978-1989', event: 'Inherited by Ramanbhai Patel via succession certificate', status: 'Verified' },
                                        { year: '1989-1994', event: 'Family partition — Plot 7 allotted exclusively', status: 'Verified' },
                                        { year: '1994', event: 'NA conversion obtained from District Collector', status: 'Verified' },
                                        { year: '2008-2018', event: 'Sold to Hitesh Mehta — Reg. 2847/2008', status: 'Verified' },
                                        { year: '2018-2024', event: 'Sold to Suresh Shah — Reg. 1923/2018', status: 'Verified' },
                                        { year: '2024', event: 'Current sale to Priya Patel — Reg. 4821/2024', status: 'Under Review' },
                                    ].map((t, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '16px', padding: '12px 16px', borderRadius: '10px', marginBottom: '8px', background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.08)' }}>
                                            <div style={{ fontSize: '12px', color: '#6366f1', fontWeight: '700', minWidth: '80px', fontFamily: 'monospace' }}>{t.year}</div>
                                            <div style={{ flex: 1, fontSize: '13px', color: '#94a3b8' }}>{t.event}</div>
                                            <span style={{ fontSize: '10px', color: t.status === 'Verified' ? '#10b981' : '#f59e0b', background: t.status === 'Verified' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', padding: '3px 10px', borderRadius: '6px', fontWeight: '700', border: '1px solid ' + (t.status === 'Verified' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'), whiteSpace: 'nowrap' }}>{t.status}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Risk Analysis */}
                            {activeSection === 'risk' && (
                                <div style={{ background: 'rgba(2,2,8,0.9)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(30px)' }}>
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#fff', letterSpacing: '1px', marginBottom: '20px' }}><span style={{ color: '#f59e0b' }}>◉</span> RISK ANALYSIS</div>
                                    {[
                                        { risk: 'Area Mismatch', level: 'High', desc: 'Sale Deed (242 sq.yd) vs 7/12 (238 sq.yd) — 4 sq.yd discrepancy. Rectification deed recommended.', color: '#ef4444' },
                                        { risk: 'Mutation Pending', level: 'Medium', desc: 'Revenue mutation not updated post 2024 sale. Must be completed before mortgage disbursement.', color: '#f59e0b' },
                                        { risk: 'Boundary Variation', level: 'Medium', desc: 'Minor variation in NA Order boundary description. Physical inspection recommended.', color: '#f59e0b' },
                                        { risk: 'Property Card', level: 'Low', desc: 'Property card not submitted. Obtain from AMC before final report.', color: '#3b82f6' },
                                    ].map((r, i) => (
                                        <div key={i} style={{ padding: '18px 20px', borderRadius: '12px', marginBottom: '12px', background: r.color + '08', border: '1px solid ' + r.color + '25' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>{r.risk}</div>
                                                <span style={{ fontSize: '10px', color: r.color, background: r.color + '15', padding: '4px 12px', borderRadius: '6px', fontWeight: '800', border: '1px solid ' + r.color + '40', letterSpacing: '1px' }}>{r.level.toUpperCase()}</span>
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>{r.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Mortgage Opinion */}
                            {activeSection === 'mortgage' && (
                                <div style={{ background: 'rgba(2,2,8,0.9)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(30px)' }}>
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#fff', letterSpacing: '1px', marginBottom: '20px' }}><span style={{ color: '#f59e0b' }}>🏦</span> MORTGAGE OPINION</div>
                                    <div style={{ padding: '20px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '14px', marginBottom: '20px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#10b981', marginBottom: '8px' }}>✓ PROPERTY IS MORTGAGEABLE</div>
                                        <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.7' }}>Subject to completion of mutation entry and submission of property card, the property is suitable for equitable mortgage. Recommended loan amount: ₹1.48 Cr (80% LTV).</div>
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>Conditions for Mortgage:</div>
                                    {['Complete mutation entry at revenue office', 'Submit certified property card copy', 'Obtain NOC from society if applicable', 'Execute equitable mortgage deed', 'Deposit original title documents with bank'].map((c, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 14px', borderRadius: '8px', marginBottom: '8px', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)' }}>
                                            <span style={{ color: '#6366f1', fontWeight: '800', flexShrink: 0 }}>{i + 1}.</span>
                                            <span style={{ fontSize: '13px', color: '#94a3b8' }}>{c}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Legal Opinion */}
                            {activeSection === 'legal' && (
                                <div style={{ background: 'rgba(2,2,8,0.9)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(30px)' }}>
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#fff', letterSpacing: '1px', marginBottom: '20px' }}><span style={{ color: '#f59e0b' }}>⚖</span> FINAL LEGAL OPINION</div>
                                    <div style={{ padding: '24px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '14px', marginBottom: '24px' }}>
                                        <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.9' }}>
                                            Based on examination of documents submitted, we are of the opinion that the title to the property bearing Survey No. 142/A, Plot No. 7, Village Odhav, Ahmedabad is <span style={{ color: '#f59e0b', fontWeight: '700' }}>conditionally clear and marketable</span>, subject to resolution of observations noted herein.
                                            <br /><br />
                                            The property is suitable for purchase and mortgage, provided the pending mutation entry is completed and area discrepancy is rectified through appropriate legal procedure.
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px', padding: '20px', background: 'rgba(99,102,241,0.05)', borderRadius: '14px', border: '1px solid rgba(99,102,241,0.15)' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0, boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>⚖</div>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Generated by TitleAI</div>
                                            <div style={{ fontSize: '12px', color: '#475569' }}>AI-Powered Property Legal Intelligence · Report No: TAI-2024-4821</div>
                                            <div style={{ fontSize: '11px', color: '#334155', marginTop: '4px' }}>This report is AI-generated and should be reviewed by a qualified advocate before final use.</div>
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