import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';

const UploadDropzone = ({ onFileSelect }) => {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(null);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            onFileSelect(file);
        }
    };

    const clearFile = () => {
        setPreview(null);
        onFileSelect(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    if (preview) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
                    <img
                        src={preview}
                        alt="Upload preview"
                        style={{
                            maxHeight: '400px',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-md)',
                            maxWidth: '100%'
                        }}
                    />
                    <button
                        onClick={clearFile}
                        style={{
                            position: 'absolute',
                            top: '-12px',
                            right: '-12px',
                            background: 'var(--color-secondary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            padding: '0.5rem',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                    Image selected. Ready to diagnose.
                </p>
            </div>
        );
    }

    return (
        <div
            className="card"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{
                border: `2px dashed ${dragActive ? 'var(--color-primary)' : 'var(--text-secondary)'}`,
                backgroundColor: dragActive ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)',
                textAlign: 'center',
                padding: '3rem 1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
            }}
            onClick={() => inputRef.current.click()}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }}
            />

            <div style={{
                background: 'var(--bg-main)',
                padding: '1rem',
                borderRadius: '50%',
                display: 'inline-flex',
                marginBottom: '1rem'
            }}>
                <UploadCloud size={48} color={dragActive ? 'var(--color-primary)' : 'var(--text-secondary)'} />
            </div>

            <h3 style={{ marginBottom: '0.5rem' }}>
                {dragActive ? "Drop image here" : "Click to upload or drag & drop"}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Supports JPG, PNG (Max 5MB)
            </p>
        </div>
    );
};

export default UploadDropzone;
