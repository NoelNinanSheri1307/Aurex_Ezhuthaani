# Piper Tamil Neural TTS Model Setup Instructions

This directory (`tts-models/valluva/`) contains the local **Piper Neural Text-to-Speech (TTS)** voice model for authentic, high-quality offline Tamil speech synthesis in Ezhuthaani.

---

## 📥 Model Download Instructions

The ONNX model files are excluded from git version control due to their large file size. Follow these steps to download and set up the model locally:

1. **Download Location**:
   Visit the HuggingFace repository:
   👉 **[HuggingFace: Piper Tamil Voices - Valluvar Neural Medium](https://huggingface.co/Jeyaram-K/piper-tamil-voices/tree/main/ta_IN-ValluvarNeural-medium)**

2. **Required Files to Download**:
   Download both of the following files:
   - `ta_IN-ValluvarNeural-medium.onnx` (Model weights file, ~63.5 MB)
   - `ta_IN-ValluvarNeural-medium.onnx.json` (Model configuration file)

3. **File Placement**:
   Place both downloaded files directly inside this directory:
   ```text
   ezhuthaani/
   └── tts-models/
       └── valluva/
           ├── ttsinstructions.md
           ├── ta_IN-ValluvarNeural-medium.onnx
           └── ta_IN-ValluvarNeural-medium.onnx.json
   ```

---

## 🎙️ Model Overview

- **Voice Name**: `ta_IN-ValluvarNeural-medium`
- **Language**: Tamil (`ta_IN`)
- **Format**: ONNX Runtime
- **Purpose**: Provides realistic, native offline Tamil speech synthesis for Ezhuthaani learning modules (Read-Aloud practice, Dictionary pronunciations, and AI Assistant voice responses).
