"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async () => {
        setLoading(true)
        setError('')
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <div style={{ minHeight: '100vh', background: '#020208', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                        Title<span style={{ color: '#6366f1', textShadow: '0 0 20px rgba(99,102,241,0.8)' }}>AI</span>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>AI-Powered Property Legal Intelligence</p>
                </div>
                <div style={{ background: 'rgba(10,10,20,0.9)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '16px', padding: '32px', backdropFilter: 'blur(20px)', boxShadow: '0 0 40px rgba(99,102,241,0.1)' }}>
                    <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '600', marginBottom: '24px', textAlign: 'center' }}>Welcome back</h2>
                    {error && (
                        <div style={{ background: '#ef444420', border: '1px solid #ef4444', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#ef4444', fontSize: '13px' }}>
                            {error}
                        </div>
                    )}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', color: '#9ca3af', fontSize: '13px', marginBottom: '6px' }}>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="you@example.com" style={{ width: '100%', background: '#020208', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', color: '#9ca3af', fontSize: '13px', marginBottom: '6px' }}>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="••••••••" style={{ width: '100%', background: '#020208', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <button onClick={handleLogin} disabled={loading} style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
                        {loading ? 'Signing in...' : 'Sign In →'}
                    </button>
                    <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280', fontSize: '13px' }}>
                        No account?{' '}<span onClick={() => router.push('/signup')} style={{ color: '#6366f1', cursor: 'pointer' }}>Sign up free</span>
                    </p>
                </div>
            </div>
        </div>
    )
}