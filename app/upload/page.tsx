"use client"
import { useState, useRef, useEffect } from 'react'

const DOC_TYPES = [
    'Sale Deed', 'Encumbrance Certificate (EC)', 'Revenue Record 7/12',
    'NA Order', 'Development Permission', 'Draft Sale Deed',
    'Property Card', 'Layout Approval', 'Mutation Entry',
    'Completion Certificate', 'Mortgage Document', 'Other'
]

interface AIResult {
    documentType: string
    entities: {
        ownerName: string
        surveyNumber: string
        plotNumber: string
        village: string
        area: string
        registrationDate: string
        boundaries: string
    }
    riskLevel: string
    riskReasons: string[]
    legalObservations: string[]
    mortgageReady: boolean
    mortgageReasons: string[]
    summary: string
}

interface DocFile {
    name: string
    size: string
    type: string
    status: string
    result?: AIResult
}

export default function UploadPage() {
    const [dragging, setDragging] = useState(false)
    const [files, setFiles] = useState<DocFile[]>([])
    const [selectedType, setSelectedType] = useState('')
    const [selectedResult, setSelectedResult] = useState<AIResult | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const words = ['TITLEAI', 'SALEDEED', 'EC', '7/12', 'NAORDER', 'RISK', 'LOW', 'HIGH', 'SURVEY', 'PLOT', 'MUTATION', 'TITLE', 'LEGAL', 'ADVOCATE', 'BANK', 'MORTGAGE', 'DEED', 'REGISTRY', 'SCRUTINY', 'REPORT']
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

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragging(false)
        addFiles(Array.from(e.dataTransfer.files))
    }

    const addFiles = (newFiles: File[]) => {
        const mapped = newFiles.map(f => ({
            name: f.name,
            size: (f.size / 1024).toFixed(1) + ' KB',
            type: selectedType || 'Auto Detect',
            status: 'Ready',
        }))
        setFiles(prev => [...prev, ...mapped])
    }

    const handleProcess = async (fileName: string) => {
        setFiles(prev => prev.map(f => f.name === fileName ? { ...f, status: 'Processing...' } : f))

        try {
            const sampleText = `This Sale Deed is executed on 15th March 2024 between Ramanbhai Patel (Seller) 
      and Priya Shah (Buyer) for property situated at Survey No. 142/A, Plot No. 7, 
      Village Odhav, Ahmedabad. Total area: 242 sq yards. Registration No. 4821/2024.
      Boundaries: East - Road, West - Plot 6, North - Plot 8, South - Plot 9.`

            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: sampleText, docType: selectedType }),
            })

            const data = await response.json()

            if (data.success) {
                setFiles(prev => prev.map(f => f.name === fileName ? { ...f, status: 'Done', result: data.data } : f))
            } else {
                setFiles(prev => prev.map(f => f.name === fileName ? { ...f, status: 'Error' } : f))
            }
        } catch {
            setFiles(prev => prev.map(f => f.name === fileName ? { ...f, status: 'Error' } : f))
        }
    }

    const riskColor = (risk: string) => {
        if (risk === 'High') return '#ef4444'
        if (risk === 'Medium') return '#f59e0b'
        return '#10b981'
    }

    return (
        <div style={{ minHeight: '100vh', background: '#020208', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', position: 'relative', overflow: 'hidden' }}>

            <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, opacity: 0.5 }} />
            <div style={{ position: 'fixed', top: '5%', left: '30%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

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
                        { icon: '⬆', label: 'Upload Docs', active: true },
                        { icon: '⛓', label: 'Title Flow' },
                        { icon: '◉', label: 'Risk Engine' },
                        { icon: '◈', label: 'Mortgage' },
                        { icon: '▤', label: 'Reports' },
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

                <div style={{ padding: '18px 32px', borderBottom: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(2,2,8,0.9)', backdropFilter: 'blur(30px)' }}>
                    <div>
                        <div style={{ fontSize: '22px', fontWeight: '900', color: '#fff' }}>
                            Document <span style={{ color: '#6366f1', textShadow: '0 0 20px rgba(99,102,241,0.8)' }}>Upload</span>
                        </div>
                        <div style={{ fontSize: '10px', color: '#334155', marginTop: '3px', letterSpacing: '2px', fontWeight: '600' }}>UPLOAD — OCR — AI CLASSIFY — RISK ANALYSIS</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '100px', padding: '8px 18px' }}>
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
                        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', letterSpacing: '1px' }}>AI ENGINE READY</span>
                    </div>
                </div>

                <div style={{ padding: '32px' }}>

                    {/* Doc Type */}
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ fontSize: '11px', color: '#334155', letterSpacing: '2px', fontWeight: '700', marginBottom: '12px' }}>SELECT DOCUMENT TYPE</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {DOC_TYPES.map(type => (
                                <button key={type} onClick={() => setSelectedType(type === selectedType ? '' : type)}
                                    style={{ padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: selectedType === type ? '1px solid #6366f1' : '1px solid rgba(99,102,241,0.2)', background: selectedType === type ? 'rgba(99,102,241,0.2)' : 'rgba(2,2,8,0.8)', color: selectedType === type ? '#fff' : '#475569', transition: 'all 0.2s', boxShadow: selectedType === type ? '0 0 15px rgba(99,102,241,0.3)' : 'none' }}>
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Drop Zone */}
                    <div
                        onDragOver={e => { e.preventDefault(); setDragging(true) }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                        style={{ border: dragging ? '2px solid #6366f1' : '2px dashed rgba(99,102,241,0.3)', borderRadius: '20px', padding: '50px 40px', textAlign: 'center', cursor: 'pointer', background: dragging ? 'rgba(99,102,241,0.08)' : 'rgba(2,2,8,0.6)', transition: 'all 0.3s', marginBottom: '28px', boxShadow: dragging ? '0 0 40px rgba(99,102,241,0.3)' : 'none', position: 'relative', backdropFilter: 'blur(20px)' }}>
                        <div style={{ position: 'absolute', top: '12px', left: '12px', width: '20px', height: '20px', borderTop: '2px solid rgba(99,102,241,0.6)', borderLeft: '2px solid rgba(99,102,241,0.6)' }} />
                        <div style={{ position: 'absolute', top: '12px', right: '12px', width: '20px', height: '20px', borderTop: '2px solid rgba(99,102,241,0.6)', borderRight: '2px solid rgba(99,102,241,0.6)' }} />
                        <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '20px', height: '20px', borderBottom: '2px solid rgba(99,102,241,0.6)', borderLeft: '2px solid rgba(99,102,241,0.6)' }} />
                        <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '20px', height: '20px', borderBottom: '2px solid rgba(99,102,241,0.6)', borderRight: '2px solid rgba(99,102,241,0.6)' }} />
                        <div style={{ fontSize: '40px', marginBottom: '12px' }}>📄</div>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>Drop property documents here</div>
                        <div style={{ fontSize: '13px', color: '#334155', marginBottom: '20px' }}>PDF, JPG, PNG · Sale Deed, EC, 7/12, NA Order and more</div>
                        <button style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 28px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 25px rgba(99,102,241,0.4)' }}>+ SELECT FILES</button>
                        <input ref={inputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={e => e.target.files && addFiles(Array.from(e.target.files))} style={{ display: 'none' }} />
                    </div>

                    {/* File List */}
                    {files.length > 0 && (
                        <div style={{ background: 'rgba(2,2,8,0.9)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '20px', padding: '24px', backdropFilter: 'blur(30px)', marginBottom: '24px' }}>
                            <div style={{ fontSize: '13px', fontWeight: '800', color: '#fff', letterSpacing: '1px', marginBottom: '20px' }}><span style={{ color: '#6366f1' }}>▣</span> DOCUMENTS — {files.length} files</div>

                            {files.map((f, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 16px', borderRadius: '12px', marginBottom: '8px', background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.1)' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(59,130,246,0.3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>📄</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0', marginBottom: '3px' }}>{f.name}</div>
                                            <div style={{ fontSize: '11px', color: '#334155' }}>{f.size} · {f.type}</div>
                                        </div>
                                        <div style={{ fontSize: '11px', fontWeight: '700', color: f.status === 'Done' ? '#10b981' : f.status === 'Processing...' ? '#f59e0b' : f.status === 'Error' ? '#ef4444' : '#6366f1', letterSpacing: '1px', minWidth: '110px', textAlign: 'center' }}>
                                            {f.status === 'Done' ? '✓ DONE' : f.status === 'Processing...' ? '⟳ PROCESSING' : f.status === 'Error' ? '✗ ERROR' : '● READY'}
                                        </div>
                                        {f.status === 'Ready' && (
                                            <button onClick={() => handleProcess(f.name)} style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 0 15px rgba(99,102,241,0.4)' }}>ANALYZE →</button>
                                        )}
                                        {f.status === 'Done' && f.result && (
                                            <button onClick={() => setSelectedResult(selectedResult === f.result ? null : f.result!)} style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '8px', padding: '8px 16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>VIEW RESULT</button>
                                        )}
                                    </div>

                                    {/* AI Result Panel */}
                                    {f.status === 'Done' && f.result && selectedResult === f.result && (
                                        <div style={{ margin: '0 0 16px 0', background: 'rgba(2,2,8,0.95)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(30px)' }}>

                                            {/* Header */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                                <div style={{ fontSize: '14px', fontWeight: '800', color: '#fff', letterSpacing: '1px' }}><span style={{ color: '#6366f1' }}>◈</span> AI ANALYSIS RESULT</div>
                                                <span style={{ fontSize: '11px', background: riskColor(f.result.riskLevel) + '20', color: riskColor(f.result.riskLevel), padding: '5px 14px', borderRadius: '8px', fontWeight: '800', border: '1px solid ' + riskColor(f.result.riskLevel) + '50', letterSpacing: '1px' }}>{f.result.riskLevel?.toUpperCase()} RISK</span>
                                            </div>

                                            {/* Doc Type */}
                                            <div style={{ marginBottom: '16px', padding: '12px 16px', background: 'rgba(99,102,241,0.08)', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.2)' }}>
                                                <div style={{ fontSize: '10px', color: '#334155', letterSpacing: '1.5px', fontWeight: '700', marginBottom: '4px' }}>DOCUMENT TYPE</div>
                                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#6366f1' }}>{f.result.documentType}</div>
                                            </div>

                                            {/* Entities */}
                                            <div style={{ marginBottom: '16px' }}>
                                                <div style={{ fontSize: '10px', color: '#334155', letterSpacing: '1.5px', fontWeight: '700', marginBottom: '10px' }}>EXTRACTED ENTITIES</div>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                                                    {Object.entries(f.result.entities).map(([key, val]) => val && (
                                                        <div key={key} style={{ padding: '10px 14px', background: 'rgba(99,102,241,0.05)', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.1)' }}>
                                                            <div style={{ fontSize: '10px', color: '#334155', fontWeight: '600', marginBottom: '3px', textTransform: 'uppercase' }}>{key.replace(/([A-Z])/g, ' $1')}</div>
                                                            <div style={{ fontSize: '12px', color: '#e2e8f0', fontWeight: '500' }}>{val}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Risk Reasons */}
                                            {f.result.riskReasons.length > 0 && (
                                                <div style={{ marginBottom: '16px' }}>
                                                    <div style={{ fontSize: '10px', color: '#334155', letterSpacing: '1.5px', fontWeight: '700', marginBottom: '10px' }}>RISK FACTORS</div>
                                                    {f.result.riskReasons.map((r, i) => (
                                                        <div key={i} style={{ padding: '8px 14px', marginBottom: '6px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', fontSize: '12px', color: '#fca5a5' }}>⚠ {r}</div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Legal Observations */}
                                            {f.result.legalObservations.length > 0 && (
                                                <div style={{ marginBottom: '16px' }}>
                                                    <div style={{ fontSize: '10px', color: '#334155', letterSpacing: '1.5px', fontWeight: '700', marginBottom: '10px' }}>LEGAL OBSERVATIONS</div>
                                                    {f.result.legalObservations.map((o, i) => (
                                                        <div key={i} style={{ padding: '8px 14px', marginBottom: '6px', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '8px', fontSize: '12px', color: '#a5b4fc' }}>◈ {o}</div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Mortgage */}
                                            <div style={{ padding: '14px 16px', background: f.result.mortgageReady ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: '1px solid ' + (f.result.mortgageReady ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'), borderRadius: '10px', marginBottom: '16px' }}>
                                                <div style={{ fontSize: '10px', color: '#334155', letterSpacing: '1.5px', fontWeight: '700', marginBottom: '6px' }}>MORTGAGE READINESS</div>
                                                <div style={{ fontSize: '14px', fontWeight: '800', color: f.result.mortgageReady ? '#10b981' : '#ef4444' }}>{f.result.mortgageReady ? '✓ MORTGAGE READY' : '✗ NOT MORTGAGE READY'}</div>
                                            </div>

                                            {/* Summary */}
                                            <div style={{ padding: '14px 16px', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px' }}>
                                                <div style={{ fontSize: '10px', color: '#334155', letterSpacing: '1.5px', fontWeight: '700', marginBottom: '6px' }}>AI SUMMARY</div>
                                                <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>{f.result.summary}</div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            ))}

                            {files.some(f => f.status === 'Ready') && (
                                <button onClick={() => files.filter(f => f.status === 'Ready').forEach(f => handleProcess(f.name))} style={{ width: '100%', marginTop: '12px', background: 'linear-gradient(135deg, #6366f1, #3b82f6)', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 30px rgba(99,102,241,0.5)', letterSpacing: '1px' }}>
                                    ⚡ ANALYZE ALL WITH AI
                                </button>
                            )}
                        </div>
                    )}

                    {/* Steps */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                        {[
                            { step: '01', title: 'Upload', desc: 'Drop property documents', color: '#6366f1' },
                            { step: '02', title: 'OCR', desc: 'AI extracts text', color: '#3b82f6' },
                            { step: '03', title: 'Classify', desc: 'Document type identified', color: '#8b5cf6' },
                            { step: '04', title: 'Report', desc: 'Legal report generated', color: '#10b981' },
                        ].map(s => (
                            <div key={s.step} style={{ background: 'rgba(2,2,8,0.85)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '14px', padding: '20px', textAlign: 'center', backdropFilter: 'blur(20px)' }}>
                                <div style={{ fontSize: '22px', fontWeight: '900', color: s.color, marginBottom: '8px', textShadow: '0 0 15px ' + s.color, fontFamily: 'monospace' }}>{s.step}</div>
                                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>{s.title}</div>
                                <div style={{ fontSize: '11px', color: '#334155' }}>{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}