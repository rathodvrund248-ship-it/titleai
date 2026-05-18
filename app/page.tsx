"use client"
import { useEffect, useRef } from 'react'

export default function Home() {
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
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)
    const draw = () => {
      ctx.fillStyle = 'rgba(2,2,8,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(99,102,241,0.35)'
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
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={{ background: '#020208', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, opacity: 0.6 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <nav style={{ borderBottom: '1px solid rgba(99,102,241,0.2)', padding: '0 48px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'rgba(2,2,8,0.95)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>
            Title<span style={{ color: '#6366f1', textShadow: '0 0 20px rgba(99,102,241,0.8)' }}>AI</span>
          </div>
          <div style={{ display: 'flex', gap: '32px', fontSize: '14px', color: '#6b7280' }}>
            <span style={{ cursor: 'pointer' }}>Features</span>
            <span style={{ cursor: 'pointer' }}>Pricing</span>
            <span style={{ cursor: 'pointer' }}>About</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => window.location.href = '/login'} style={{ fontSize: '14px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px' }}>Login</button>
            <button onClick={() => window.location.href = '/signup'} style={{ fontSize: '14px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer', fontWeight: '500', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>Get Started →</button>
          </div>
        </nav>
        <div style={{ textAlign: 'center', padding: '100px 48px 80px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '32px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
            <span style={{ fontSize: '12px', color: '#8b8bff', fontWeight: '500' }}>NOW LIVE — AI PROPERTY INTELLIGENCE PLATFORM</span>
          </div>
          <h1 style={{ fontSize: '68px', fontWeight: '800', color: '#fff', lineHeight: '1.05', letterSpacing: '-2px', marginBottom: '24px', textShadow: '0 0 60px rgba(99,102,241,0.3)' }}>
            Property Legal<br />
            <span style={{ color: '#6366f1', textShadow: '0 0 40px rgba(99,102,241,0.6)' }}>Scrutiny Automated</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: '1.7', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
            Upload property documents. TitleAI instantly extracts, verifies title chains, detects risks, and generates professional legal reports.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '48px' }}>
            <button onClick={() => window.location.href = '/signup'} style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}>
              Start Free Trial →
            </button>
            <button style={{ background: 'rgba(17,17,24,0.8)', color: '#9ca3af', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', cursor: 'pointer' }}>
              Watch Demo
            </button>
          </div>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center' }}>
            {['Trusted by 500+ Advocates', '10,000+ Documents Processed', 'Bank Grade Security'].map(badge => (
              <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#4b5563' }}>
                <span style={{ color: '#10b981' }}>✓</span> {badge}
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'rgba(17,17,24,0.8)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '16px', margin: '0 48px 80px', padding: '32px 48px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center', backdropFilter: 'blur(20px)' }}>
          {[
            { value: '10,000+', label: 'Documents Analyzed' },
            { value: '500+', label: 'Advocates & Banks' },
            { value: '98%', label: 'Accuracy Rate' },
            { value: '5 min', label: 'Avg. Report Time' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#fff', letterSpacing: '-1px' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '0 48px 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: '700', color: '#fff', letterSpacing: '-1px', marginBottom: '12px' }}>
              Everything for property<br />
              <span style={{ color: '#6366f1' }}>legal intelligence</span>
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>10 powerful AI modules working together</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '1100px', margin: '0 auto' }}>
            {[
              { icon: '🔍', title: 'OCR Processing', desc: 'Extract text from scanned PDFs and Gujarati property documents automatically', tag: 'Core' },
              { icon: '🗂️', title: 'Document Classification', desc: 'AI identifies Sale Deed, EC, NA Order, 7/12 and 10+ document types instantly', tag: 'Core' },
              { icon: '⛓️', title: 'Title Flow Generation', desc: 'Automatic ownership chain from 1960s to present — visualized as a timeline', tag: 'Intelligence' },
              { icon: '🛡️', title: 'Risk Engine', desc: 'Detects area mismatch, boundary conflict, missing docs, unregistered deeds', tag: 'Critical' },
              { icon: '🏦', title: 'Mortgage Intelligence', desc: 'Mortgage readiness score, equitable mortgage check, bank suitability analysis', tag: 'Banking' },
              { icon: '📋', title: 'AI Legal Reports', desc: 'Professional title verification reports with legal opinion in one click', tag: 'Output' },
            ].map(f => (
              <div key={f.title} style={{ background: 'rgba(17,17,24,0.8)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '14px', padding: '28px', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>{f.icon}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', margin: 0 }}>{f.title}</h3>
                  <span style={{ fontSize: '10px', background: 'rgba(99,102,241,0.15)', color: '#6366f1', padding: '2px 8px', borderRadius: '100px', border: '1px solid rgba(99,102,241,0.3)' }}>{f.tag}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ margin: '0 48px 80px', background: 'rgba(19,19,31,0.9)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '20px', padding: '64px', textAlign: 'center', backdropFilter: 'blur(20px)' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '700', color: '#fff', letterSpacing: '-1px', marginBottom: '16px' }}>
            Ready to transform your<br />legal scrutiny workflow?
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '32px' }}>Join 500+ advocates and banks already using TitleAI</p>
          <button onClick={() => window.location.href = '/signup'} style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '10px', padding: '16px 40px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 0 40px rgba(99,102,241,0.5)' }}>
            Start Free Trial — No Credit Card Required
          </button>
        </div>
        <div style={{ borderTop: '1px solid rgba(99,102,241,0.15)', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>Title<span style={{ color: '#6366f1' }}>AI</span></div>
          <div style={{ fontSize: '13px', color: '#4b5563' }}>© 2025 TitleAI. All rights reserved.</div>
        </div>
      </div>
    </div>
  )
}