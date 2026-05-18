"use client"
import { useRouter, usePathname } from 'next/navigation'

const navItems = [
    { icon: '⬡', label: 'Dashboard', href: '/dashboard' },
    { icon: '◈', label: 'Cases', href: '/cases' },
    { icon: '⬆', label: 'Upload Docs', href: '/upload' },
    { icon: '⛓', label: 'Title Flow', href: '/title-flow' },
    { icon: '◉', label: 'Risk Engine', href: '/risk' },
    { icon: '◈', label: 'Mortgage', href: '/mortgage' },
    { icon: '▤', label: 'Reports', href: '/reports' },
]

export default function Sidebar() {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <div style={{ width: '225px', background: 'rgba(2,2,8,0.95)', borderRight: '1px solid rgba(99,102,241,0.25)', padding: '24px 0', display: 'flex', flexDirection: 'column', flexShrink: 0, zIndex: 10, backdropFilter: 'blur(30px)', minHeight: '100vh' }}>

            {/* Logo */}
            <div style={{ padding: '0 20px 22px', borderBottom: '1px solid rgba(99,102,241,0.15)', cursor: 'pointer' }} onClick={() => router.push('/dashboard')}>
                <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '-1px' }}>
                    <span style={{ color: '#fff' }}>Title</span>
                    <span style={{ color: '#6366f1', textShadow: '0 0 20px #6366f1' }}>AI</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px #10b981' }}></div>
                    <div style={{ fontSize: '9px', color: '#10b981', letterSpacing: '2.5px', fontWeight: '700' }}>SYSTEM ONLINE</div>
                </div>
            </div>

            {/* Nav Items */}
            <div style={{ padding: '20px 12px', flex: 1 }}>
                <div style={{ fontSize: '9px', color: '#1e293b', letterSpacing: '2px', padding: '0 8px', marginBottom: '10px', fontWeight: '700' }}>NAVIGATION</div>
                {navItems.map(item => {
                    const isActive = pathname === item.href
                    return (
                        <div key={item.label}
                            onClick={() => router.push(item.href)}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', marginBottom: '3px', background: isActive ? 'rgba(99,102,241,0.18)' : 'transparent', border: isActive ? '1px solid rgba(99,102,241,0.5)' : '1px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                            <span style={{ fontSize: '15px', color: isActive ? '#6366f1' : '#1e293b' }}>{item.icon}</span>
                            <span style={{ fontSize: '13px', color: isActive ? '#fff' : '#475569', fontWeight: isActive ? '700' : '400' }}>{item.label}</span>
                            {isActive && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 10px #6366f1' }}></div>}
                        </div>
                    )
                })}
            </div>

            {/* User */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(99,102,241,0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '900', color: '#fff', boxShadow: '0 0 20px rgba(99,102,241,0.6)' }}>R</div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Rahul Shah</div>
                        <div style={{ fontSize: '10px', color: '#6366f1', fontWeight: '600' }}>SR. ADVOCATE</div>
                    </div>
                </div>
            </div>
        </div>
    )
}