import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Activity, History, Menu } from 'lucide-react';
import '../index.css';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', label: 'Home', icon: Sprout },
        { path: '/diagnose', label: 'Diagnose', icon: Activity },
        { path: '/history', label: 'History', icon: History },
    ];

    return (
        <nav className="glass-panel" style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            padding: '1rem 0',
            marginBottom: '2rem'
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        background: 'var(--color-primary)',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        display: 'flex'
                    }}>
                        <Sprout size={24} />
                    </div>
                    <span style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--text-main)',
                        letterSpacing: '-0.025em'
                    }}>
                        AgriScan
                    </span>
                </div>

                <div className="nav-menu" style={{ display: 'flex', gap: '2rem' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                textDecoration: 'none',
                                color: isActive(item.path) ? 'var(--color-primary)' : 'var(--text-secondary)',
                                fontWeight: isActive(item.path) ? 600 : 500,
                                transition: 'color 0.2s ease'
                            }}
                        >
                            <item.icon size={18} />
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
