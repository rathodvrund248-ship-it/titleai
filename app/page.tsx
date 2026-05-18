"use client"

export default function Home() {
  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>

      <nav style={{ borderBottom: '1px solid #1a1a2e', padding: '0 48px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'rgba(10,10,15,0.95)', zIndex: 100 }}>
        <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>
          Title<span style={{ color: '#6366f1' }}>AI</span>
        </div>
        <div style={{ display: 'flex', gap: '32px', fontSize: '14px', color: '#6b7280' }}>
          <span>Features</span>
          <span>Pricing</span>
          <span>About</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ fontSize: '14px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px' }}>Login</button>
          <button style={{ fontSize: '14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer', fontWeight: '500' }}>Get Started →</button>
        </div>
      </nav>

      <div style={{ textAlign: 'center', padding: '100px 48px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#13131f', border: '1px solid #2d2d4e', borderRadius: '100px', padding: '6px 16px', marginBottom: '32px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
          <span style={{ fontSize: '12px', color: '#8b8bff', fontWeight: '500' }}>NOW LIVE — AI PROPERTY INTELLIGENCE PLATFORM</span>
        </div>
        <h1 style={{ fontSize: '68px', fontWeight: '800', color: '#fff', lineHeight: '1.05', letterSpacing: '-2px', marginBottom: '24px' }}>
          Property Legal<br />
          <span style={{ color: '#6366f1' }}>Scrutiny Automated</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: '1.7', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
          Upload property documents. TitleAI instantly extracts, verifies title chains, detects risks, and generates professional legal reports.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '48px' }}>
          <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
            Start Free Trial →
          </button>
          <button style={{ background: '#111118', color: '#9ca3af', border: '1px solid #1e1e2e', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', cursor: 'pointer' }}>
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

      <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '16px', margin: '0 48px 80px', padding: '32px 48px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center' }}>
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
            <div key={f.title} style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '14px', padding: '28px' }}>
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{f.icon}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', margin: 0 }}>{f.title}</h3>
                <span style={{ fontSize: '10px', background: '#1e1e2e', color: '#6366f1', padding: '2px 8px', borderRadius: '100px' }}>{f.tag}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: '0 48px 80px', background: '#13131f', border: '1px solid #2d2d4e', borderRadius: '20px', padding: '64px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '40px', fontWeight: '700', color: '#fff', letterSpacing: '-1px', marginBottom: '16px' }}>
          Ready to transform your<br />legal scrutiny workflow?
        </h2>
        <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '32px' }}>Join 500+ advocates and banks already using TitleAI</p>
        <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', padding: '16px 40px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
          Start Free Trial — No Credit Card Required
        </button>
      </div>

      <div style={{ borderTop: '1px solid #1e1e2e', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>Title<span style={{ color: '#6366f1' }}>AI</span></div>
        <div style={{ fontSize: '13px', color: '#4b5563' }}>© 2025 TitleAI. All rights reserved.</div>
      </div>

    </div>
  )
}