export const simulateDiagnosis = async (file) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock random result
            const diseases = [
                {
                    name: "Leaf Blight",
                    explanation: "The AI detected irregular brown lesions with yellow halos on the leaf surface, which is characteristic of Leaf Blight fungal infection.",
                    treatment: "Apply a copper-based fungicide and ensure proper spacing between plants to reduce humidity."
                },
                {
                    name: "Healthy",
                    explanation: "No visible signs of disease or nutrient deficiency were detected.",
                    treatment: "Continue regular watering and monitoring."
                },
                {
                    name: "Rust",
                    explanation: "Orange-brown pustules were identified on the undersides of the leaves.",
                    treatment: "Remove infected leaves immediately and apply sulfur-based fungicides."
                }
            ];

            const randomStart = Math.floor(Math.random() * diseases.length);
            const diagnosis = diseases[randomStart];

            resolve({
                diagnosis: diagnosis.name,
                confidence: 0.85 + (Math.random() * 0.14),
                explanation: diagnosis.explanation,
                treatment: diagnosis.treatment
            });
        }, 2000); // 2 second delay
    });
};
