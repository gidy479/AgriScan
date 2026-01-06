import React, { useState } from 'react';
import UploadDropzone from '../components/UploadDropzone';
import DiagnosisResult from '../components/DiagnosisResult';
import { simulateDiagnosis } from '../services/mockApi';

const Diagnose = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleDiagnose = async () => {
        if (!file) return;

        setLoading(true);
        setResult(null);

        try {
            // In production, this would be: const response = await fetch('/api/diagnose', ...);
            const data = await simulateDiagnosis(file);
            setResult(data);
        } catch (error) {
            console.error("Diagnosis failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>AI Disease Diagnosis</h1>

            <div style={{ marginBottom: '2rem' }}>
                <UploadDropzone onFileSelect={(f) => {
                    setFile(f);
                    setResult(null); // Reset result on new file
                }} />
            </div>

            {file && !result && !loading && (
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <button
                        className="btn btn-primary"
                        onClick={handleDiagnose}
                        style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}
                    >
                        Analyze Crop
                    </button>
                </div>
            )}

            {(loading || result) && (
                <DiagnosisResult result={result} loading={loading} />
            )}
        </div>
    );
};

export default Diagnose;
