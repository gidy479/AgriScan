import torch
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import io
import os

# Define Classes (Must match the training data and diseases.json keys order)
# Note: The order here MUST match the alphabetical order of the folders in backend/data/dataset/train
CLASS_NAMES = [
    "pepper_bacterial_spot", "pepper_healthy",
    "potato_early_blight", "potato_healthy", "potato_late_blight",
    "tomato_bacterial_spot", "tomato_early_blight", "tomato_healthy", "tomato_late_blight", "tomato_leaf_mold"
]

class DiseaseClassifier:
    def __init__(self, model_path=None):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = self._load_model(model_path)
        self.transform = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])

    def _load_model(self, model_path):
        # Use ResNet18 as the base model
        model = models.resnet18(pretrained=True)
        
        # Modify the final layer to match our number of classes
        num_ftrs = model.fc.in_features
        model.fc = torch.nn.Linear(num_ftrs, len(CLASS_NAMES))
        
        if model_path and os.path.exists(model_path):
            print(f"Loading model weights from {model_path}...")
            try:
                model.load_state_dict(torch.load(model_path, map_location=self.device))
            except Exception as e:
                print(f"Failed to load weights: {e}. Using pre-trained ResNet base.")
        else:
            print("No custom model weights found. Using base ResNet18 (untrained on crops).")

        model = model.to(self.device)
        model.eval()
        return model

    def predict(self, image_bytes):
        try:
            image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            input_tensor = self.transform(image).unsqueeze(0).to(self.device)
            
            with torch.no_grad():
                outputs = self.model(input_tensor)
                probabilities = torch.nn.functional.softmax(outputs, dim=1)
                
            confidence, predicted = torch.max(probabilities, 1)
            class_idx = predicted.item()
            conf_score = confidence.item()
            
            return {
                "class_key": CLASS_NAMES[class_idx],
                "confidence": conf_score
            }
        except Exception as e:
            print(f"Prediction Error: {e}")
            return None
