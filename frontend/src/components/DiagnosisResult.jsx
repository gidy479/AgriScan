import React from 'react';
import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

const DiagnosisResult = ({ result, loading }) => {
    if (loading) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <div className="spinner" style={{ marginBottom: '1rem' }}>
                    {/* Simple CSS spinner would go here, using text for now */}
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid var(--color-earth-light)',
                        borderTop: '4px solid var(--color-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto'
                    }}></div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
                <h3>Analyzing Crop Health...</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Our AI is examining the leaves for patterns.</p>
            </div>
        );
    }

    if (!result) return null;

    const isHealthy = result.diagnosis === 'Healthy';
    const confidencePercent = Math.round(result.confidence * 100);

    return (
        <div className="card" style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid var(--bg-main)'
            }}>
                {isHealthy ? (
                    <CheckCircle2 size={40} color="var(--status-success)" />
                ) : (
                    <AlertCircle size={40} color="var(--status-warning)" />
                )}
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{result.diagnosis}</h2>
                    <span style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        background: 'var(--bg-main)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: 'var(--radius-sm)'
                    }}>
                        Confidence: {confidencePercent}%
                    </span>
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <HelpCircle size={18} /> AI Explanation
                </h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {result.explanation}
                </p>
            </div>

            {!isHealthy && (
                <div style={{
                    background: 'rgba(239, 68, 68, 0.05)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '4px solid var(--status-error)'
                }}>
                    <h4 style={{ color: 'var(--status-error)', margin: '0 0 0.5rem' }}>Recommendation</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{result.treatment}</p>
                </div>
            )}
        </div>
    );
};

export default DiagnosisResult;
