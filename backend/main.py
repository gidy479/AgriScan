from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AgriScan Backend API"}

@app.post("/api/diagnose")
async def diagnose(file: UploadFile = File(...)):
    # Mock diagnosis logic
    # In a real app, this would process the image with a CNN
    
    # Simulate processing delay if needed
    
    # Mock response
    diseases = ["Healthy", "Leaf Blight", "Rust", "Powdery Mildew"]
    detected_disease = random.choice(diseases)
    confidence = round(random.uniform(0.75, 0.99), 2)
    
    return {
        "diagnosis": detected_disease,
        "confidence": confidence,
        "explanation": f"The AI model detected patterns consistent with {detected_disease}. (Mock explanation)",
        "treatment": "Recommended fungicide application and regular monitoring." 
    }
