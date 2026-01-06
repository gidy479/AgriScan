import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, models, transforms
import os

# Configuration
DATA_DIR = '../data/dataset' # User must create this folder Structure: dataset/class_name/image.jpg
MODEL_SAVE_PATH = '../ai/model.pth'
NUM_EPOCHS = 10
BATCH_SIZE = 32

def train_model():
    # Transforms
    data_transforms = {
        'train': transforms.Compose([
            transforms.RandomResizedCrop(224),
            transforms.RandomHorizontalFlip(),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
        'val': transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
    }

    # Check directory structure
    train_dir = os.path.join(DATA_DIR, 'train')
    val_dir = os.path.join(DATA_DIR, 'val')

    if not os.path.exists(train_dir):
        print(f"Error: Training directory '{train_dir}' not found.")
        return

    # Load Training Data
    try:
        full_dataset = datasets.ImageFolder(train_dir, data_transforms['train'])
    except Exception as e:
        print(f"Error loading images from {train_dir}: {e}")
        print("Ensure you have at least one image in your class folders.")
        return

    # Check if user populated the 'val' folder
    has_val_data = False
    if os.path.exists(val_dir):
        # Quick check if there are any files
        for root, dirs, files in os.walk(val_dir):
            if len(files) > 0:
                has_val_data = True
                break
    
    if has_val_data:
        print("Found manual validation set. Loading...")
        train_dataset = full_dataset
        val_dataset = datasets.ImageFolder(val_dir, data_transforms['val'])
    else:
        print("No manual validation data found in 'val/' folder.")
        print("Automatically splitting 'train/' data into 80% Train / 20% Validation...")
        train_size = int(0.8 * len(full_dataset))
        val_size = len(full_dataset) - train_size
        train_dataset, val_dataset = torch.utils.data.random_split(full_dataset, [train_size, val_size])

    image_datasets = {'train': train_dataset, 'val': val_dataset}
    
    dataloaders = {x: torch.utils.data.DataLoader(image_datasets[x], batch_size=BATCH_SIZE, shuffle=True, num_workers=0)
                   for x in ['train', 'val']}
    
    dataset_sizes = {x: len(image_datasets[x]) for x in ['train', 'val']}
    # For random_split, getting classes is different
    if has_val_data:
        class_names = train_dataset.classes
    else:
        class_names = full_dataset.classes
    
    print(f"Classes detected: {class_names}")
    
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

    # Load Model (ResNet18)
    model = models.resnet18(pretrained=True)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, len(class_names))
    model = model.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(model.parameters(), lr=0.001, momentum=0.9)
    # Decay LR by a factor of 0.1 every 7 epochs
    exp_lr_scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=7, gamma=0.1)

    print(f"Starting training on {device} for {NUM_EPOCHS} epochs...")

    for epoch in range(NUM_EPOCHS):
        print(f'Epoch {epoch}/{NUM_EPOCHS - 1}')
        print('-' * 10)

        for phase in ['train', 'val']:
            if phase == 'train':
                model.train()
            else:
                model.eval()

            running_loss = 0.0
            running_corrects = 0

            for inputs, labels in dataloaders[phase]:
                inputs = inputs.to(device)
                labels = labels.to(device)

                optimizer.zero_grad()

                with torch.set_grad_enabled(phase == 'train'):
                    outputs = model(inputs)
                    _, preds = torch.max(outputs, 1)
                    loss = criterion(outputs, labels)

                    if phase == 'train':
                        loss.backward()
                        optimizer.step()

                running_loss += loss.item() * inputs.size(0)
                running_corrects += torch.sum(preds == labels.data)

            if phase == 'train':
                exp_lr_scheduler.step()

            epoch_loss = running_loss / dataset_sizes[phase]
            epoch_acc = running_corrects.double() / dataset_sizes[phase]

            print(f'{phase} Loss: {epoch_loss:.4f} Acc: {epoch_acc:.4f}')

    print('Training complete. Saving model...')
    torch.save(model.state_dict(), MODEL_SAVE_PATH)
    print(f"Model saved to {MODEL_SAVE_PATH}")

if __name__ == '__main__':
    train_model()
