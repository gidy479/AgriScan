import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main className="container" style={{ flex: 1, paddingBottom: '2rem' }}>
                {children}
            </main>
            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem'
            }}>
                © 2026 AgriScan AI. Empowering Farmers.
            </footer>
        </div>
    );
};

export default Layout;
