"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async () => {
        setLoading(true)
        setError('')
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) setError(error.message)
        setLoading(false)
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px' }}>

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                        Title<span style={{ color: '#6366f1' }}>AI</span>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>AI-Powered Property Legal Intelligence</p>
                </div>

                {/* Card */}
                <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '32px' }}>
                    <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '600', marginBottom: '24px', textAlign: 'center' }}>
                        Welcome back
                    </h2>

                    {/* Error */}
                    {error && (
                        <div style={{ background: '#ef444420', border: '1px solid #ef4444', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#ef4444', fontSize: '13px' }}>
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', color: '#9ca3af', fontSize: '13px', marginBottom: '6px' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            style={{ width: '100%', background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', color: '#9ca3af', fontSize: '13px', marginBottom: '6px' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ width: '100%', background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        style={{ width: '100%', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
                    >
                        {loading ? 'Signing in...' : 'Sign In →'}
                    </button>

                    {/* Signup link */}
                    <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280', fontSize: '13px' }}>
                        No account?{' '}
                        <span style={{ color: '#6366f1', cursor: 'pointer' }}>Sign up free</span>
                    </p>
                </div>

            </div>
        </div>
    )
}