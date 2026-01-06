export const simulateDiagnosis = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Call the real backend endpoint.
        // The relative URL '/api/diagnose' works because we will configure a Proxy in vite.config.js
        const response = await fetch('/api/diagnose', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Diagnosis failed:", error);
        // Fallback for demo if backend is offline, or rethrow
        throw error;
    }
};
