from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import json
import os
from ai.inference import DiseaseClassifier

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Knowledge Base
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "diseases.json")
MODEL_PATH = os.path.join(BASE_DIR, "ai", "model.pth")

with open(DATA_FILE, "r") as f:
    KNOWLEDGE_BASE = json.load(f)["diseases"]

# Initialize AI Model
classifier = DiseaseClassifier(model_path=MODEL_PATH)

@app.get("/")
def read_root():
    return {"message": "AgriScan Knowledge Base API Active"}

@app.post("/api/diagnose")
async def diagnose(file: UploadFile = File(...)):
    # 1. Read Image Bytes
    image_bytes = await file.read()
    
    # 2. AI Inference
    prediction = classifier.predict(image_bytes)
    
    if prediction:
        detected_key = prediction["class_key"]
        confidence = prediction["confidence"]
    else:
        # Fallback if AI fails (e.g. image error)
        detected_key = "healthy"
        confidence = 0.0

    # Ensure key exists in KB
    if detected_key not in KNOWLEDGE_BASE:
        detected_key = "healthy" # Safety fallback
    
    # 3. Retrieve Detailed Info from Knowledge Base
    disease_info = KNOWLEDGE_BASE[detected_key]
    
    # 4. Format Explanation
    symptoms_text = "; ".join(disease_info["symptoms"])
    explanation = f"The AI model identified patterns consistent with {disease_info['name']} (Confidence: {int(confidence*100)}%). Key indicators include: {symptoms_text}."

    return {
        "diagnosis": disease_info["name"],
        "confidence": round(confidence, 2),
        "explanation": explanation,
        "treatment": " | ".join(disease_info["treatment"]),
        "details": disease_info
    }
