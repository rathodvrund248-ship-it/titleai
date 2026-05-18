"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSignup = async () => {
        setLoading(true)
        setError('')
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name } }
        })
        if (error) setError(error.message)
        else setSuccess(true)
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

                    {success ? (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📧</div>
                            <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Check your email!</h2>
                            <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6' }}>
                                We sent a verification link to <span style={{ color: '#6366f1' }}>{email}</span>. Click it to activate your account.
                            </p>
                        </div>
                    ) : (
                        <>
                            <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '600', marginBottom: '24px', textAlign: 'center' }}>
                                Create your account
                            </h2>

                            {error && (
                                <div style={{ background: '#ef444420', border: '1px solid #ef4444', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#ef4444', fontSize: '13px' }}>
                                    {error}
                                </div>
                            )}

                            {/* Name */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', color: '#9ca3af', fontSize: '13px', marginBottom: '6px' }}>Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Rahul Shah"
                                    style={{ width: '100%', background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>

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
                                    placeholder="Min 6 characters"
                                    style={{ width: '100%', background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>

                            {/* Button */}
                            <button
                                onClick={handleSignup}
                                disabled={loading}
                                style={{ width: '100%', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
                            >
                                {loading ? 'Creating account...' : 'Create Account →'}
                            </button>

                            <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280', fontSize: '13px' }}>
                                Already have an account?{' '}
                                <a href="/login" style={{ color: '#6366f1', textDecoration: 'none' }}>Sign in</a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}