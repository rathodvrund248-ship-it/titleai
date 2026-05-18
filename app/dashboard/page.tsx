"use client"
import { useEffect, useState, useRef } from 'react'
import Sidebar from '@/components/Sidebar'

export default function Dashboard() {
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)
    const [hoveredCase, setHoveredCase] = useState<string | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const update = () => {
            const now = new Date()
            setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
            setDate(now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase())
        }
        update()
        const timer = setInterval(update, 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const words = ['TITLEAI', 'SALEDEED', 'EC', '7/12', 'RISK', 'LOW', 'HIGH', 'SURVEY', 'PLOT', 'MUTATION', 'TITLE', 'LEGAL', 'BANK', 'MORTGAGE', 'DEED', 'REPORT']
        const fontSize = 13
        const cols = Math.floor(canvas.width / fontSize)
        const drops: number[] = Array(cols).fill(1)
        const speeds: number[] = Array(cols).fill(0).map(() => Math.random() * 0.4 + 0.2)
        const draw = () => {
            ctx.fillStyle = 'rgba(2,2,8,0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            for (let i = 0; i < drops.length; i++) {
                const word = words[Math.floor(Math.random() * words.length)]
                ctx.fillStyle = 'rgba(99,102,241,' + (Math.random() * 0.5 + 0.3) + ')'
                ctx.font = 'bold ' + fontSize + 'px monospace'
                ctx.fillText(word[Math.floor(Math.random() * word.length)], i * fontSize, drops[i] * fontSize)
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
                drops[i] += speeds[i]
            }
        }
        const interval = setInterval(draw, 40)
        return () => clearInterval(interval)
    }, [])

    const metrics = [
        { id: 'cases', label: 'Total Cases', value: '24', sub: '3 ACTIVE', color: '#6366f1', color2: '#3b82f6', icon: '◈' },
        { id: 'risk', label: 'Risk Score Avg', value: '18', sub: 'LOW RISK', color: '#10b981', color2: '#34d399', icon: '◉' },
        { id: 'docs', label: 'Docs Processed', value: '142', sub: 'THIS MONTH', color: '#3b82f6', color2: '#60a5fa', icon: '▣' },
        { id: 'reports', label: 'Reports Generated', value: '31', sub: 'THIS MONTH', color: '#8b5cf6', color2: '#a78bfa', icon: '▤' },
    ]

    const cases = [
        { name: 'Patel Residence — Navrangpura', type: 'Sale Deed', risk: 'LOW', riskColor: '#10b981', date: 'Today', progress: 92 },
        { name: 'Shah Commercial Plot — Surat', type: 'NA Order', risk: 'HIGH', riskColor: '#ef4444', date: 'Yesterday', progress: 45 },
        { name: 'Mehta Villa — Vadodara', type: 'EC + 7/12', risk: 'MEDIUM', riskColor: '#f59e0b', date: '15 May', progress: 67 },
    ]

    return (
        <div style={{ minHeight: '100vh', background: '#020208', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', position: 'relative', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, opacity: 0.5 }} />
            <div style={{ position: 'fixed', top: '5%', left: '25%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

            <Sidebar />

            <div style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 10 }}>
                <div style={{ padding: '18px 32px', borderBottom: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(2,2,8,0.9)', backdropFilter: 'blur(30px)' }}>
                    <div>
                        <div style={{ fontSize: '22px', fontWeight: '900', color: '#fff' }}>Command <span style={{ color: '#6366f1', textShadow: '0 0 20px rgba(99,102,241,0.8)' }}>Center</span></div>
                        <div style={{ fontSize: '10px', color: '#334155', marginTop: '3px', letterSpacing: '2px', fontWeight: '600' }}>AI PROPERTY LEGAL INTELLIGENCE PLATFORM</div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '100px', padding: '8px 18px' }}>
                            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
                            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', letterSpacing: '1px' }}>AI ENGINE ONLINE</span>
                        </div>
                        <button style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px 22px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}>+ NEW CASE</button>
                    </div>
                </div>

                <div style={{ padding: '32px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                        {metrics.map(m => (
                            <div key={m.id}
                                onMouseEnter={() => setHoveredCard(m.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{ background: 'rgba(2,2,8,0.9)', border: hoveredCard === m.id ? '1px solid ' + m.color + '80' : '1px solid ' + m.color + '30', borderRadius: '20px', padding: '28px 24px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s ease', transform: hoveredCard === m.id ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)', boxShadow: hoveredCard === m.id ? '0 20px 60px ' + m.color + '30' : '0 0 30px ' + m.color + '10' }}>
                                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, ' + m.color + '25 0%, transparent 70%)' }} />
                                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '2px', background: 'linear-gradient(90deg, transparent, ' + m.color + ', transparent)' }} />
                                <div style={{ fontSize: '22px', color: m.color, marginBottom: '16px' }}>{m.icon}</div>
                                <div style={{ fontSize: '9px', color: '#334155', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700' }}>{m.label}</div>
                                <div style={{ fontSize: '44px', fontWeight: '900', letterSpacing: '-2px', lineHeight: 1, background: 'linear-gradient(135deg, ' + m.color + ', ' + m.color2 + ')', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{m.value}</div>
                                <div style={{ fontSize: '10px', color: m.color, marginTop: '12px', fontWeight: '800', letterSpacing: '1.5px' }}>{m.sub}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '16px' }}>
                        <div style={{ background: 'rgba(2,2,8,0.9)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(30px)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <div style={{ fontSize: '13px', fontWeight: '800', color: '#fff', letterSpacing: '1px' }}><span style={{ color: '#6366f1' }}>◈</span> RECENT CASES</div>
                                <div style={{ fontSize: '10px', color: '#6366f1', cursor: 'pointer', border: '1px solid rgba(99,102,241,0.4)', padding: '6px 16px', borderRadius: '8px', fontWeight: '700' }}>VIEW ALL</div>
                            </div>
                            {cases.map(c => (
                                <div key={c.name}
                                    onMouseEnter={() => setHoveredCase(c.name)}
                                    onMouseLeave={() => setHoveredCase(null)}
                                    style={{ padding: '16px', borderRadius: '12px', marginBottom: '10px', background: hoveredCase === c.name ? c.riskColor + '08' : 'transparent', border: hoveredCase === c.name ? '1px solid ' + c.riskColor + '30' : '1px solid transparent', transition: 'all 0.25s', cursor: 'pointer', transform: hoveredCase === c.name ? 'translateX(8px)' : 'none' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <div>
                                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#e2e8f0', marginBottom: '3px' }}>{c.name}</div>
                                            <div style={{ fontSize: '11px', color: '#334155' }}>{c.type} · {c.date}</div>
                                        </div>
                                        <span style={{ fontSize: '10px', background: c.riskColor + '15', color: c.riskColor, padding: '5px 12px', borderRadius: '6px', fontWeight: '800', border: '1px solid ' + c.riskColor + '40', height: 'fit-content' }}>{c.risk}</span>
                                    </div>
                                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: c.progress + '%', background: 'linear-gradient(90deg, ' + c.riskColor + '60, ' + c.riskColor + ')', borderRadius: '4px' }} />
                                    </div>
                                    <div style={{ fontSize: '10px', color: '#334155', marginTop: '5px', textAlign: 'right', fontWeight: '600' }}>{c.progress}% COMPLETE</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: 'rgba(2,2,8,0.9)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(30px)' }}>
                            <div style={{ fontSize: '13px', fontWeight: '800', color: '#fff', marginBottom: '24px', letterSpacing: '1px' }}><span style={{ color: '#6366f1' }}>◉</span> AI MODULES</div>
                            {[
                                { name: 'OCR Engine', status: 'ONLINE', color: '#10b981' },
                                { name: 'Risk Analyzer', status: 'ONLINE', color: '#10b981' },
                                { name: 'Title Flow AI', status: 'ONLINE', color: '#10b981' },
                                { name: 'Mortgage AI', status: 'ONLINE', color: '#10b981' },
                                { name: 'Report Generator', status: 'STANDBY', color: '#f59e0b' },
                            ].map(m => (
                                <div key={m.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(99,102,241,0.06)' }}>
                                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{m.name}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: m.color, boxShadow: '0 0 10px ' + m.color }} />
                                        <span style={{ fontSize: '10px', color: m.color, fontWeight: '800', letterSpacing: '1.5px' }}>{m.status}</span>
                                    </div>
                                </div>
                            ))}
                            <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px' }}>
                                <div style={{ fontSize: '20px', fontWeight: '900', color: '#6366f1', letterSpacing: '3px', fontFamily: 'monospace', textShadow: '0 0 20px rgba(99,102,241,0.8)' }}>{time}</div>
                                <div style={{ fontSize: '10px', color: '#334155', marginTop: '4px', letterSpacing: '1px', fontWeight: '600' }}>{date}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}