import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

const History = () => {
    const mockHistory = [
        { id: 1, date: '2026-01-05', disease: 'Leaf Blight', confidence: 0.92, status: 'treated' },
        { id: 2, date: '2026-01-04', disease: 'Healthy', confidence: 0.98, status: 'stable' },
        { id: 3, date: '2026-01-02', disease: 'Rust', confidence: 0.88, status: 'treated' },
        { id: 4, date: '2025-12-28', disease: 'Healthy', confidence: 0.95, status: 'stable' },
    ];

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Diagnosis History</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {mockHistory.map((item) => (
                    <div key={item.id} className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                    }}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{
                                background: 'var(--bg-main)',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                <Calendar size={24} color="var(--text-secondary)" />
                            </div>
                            <div>
                                <h3 style={{ margin: '0 0 0.25rem 0' }}>{item.disease}</h3>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                    {item.date} • Confidence: {Math.round(item.confidence * 100)}%
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.875rem',
                                background: item.status === 'stable' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                color: item.status === 'stable' ? 'var(--status-success)' : 'var(--status-warning)',
                                fontWeight: 500
                            }}>
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                            <ChevronRight color="var(--text-secondary)" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
