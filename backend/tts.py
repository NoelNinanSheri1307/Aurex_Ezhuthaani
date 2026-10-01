import io
import os
import struct
import wave
from pathlib import Path
from typing import Optional

try:
    from piper import PiperVoice
    PIPER_INSTALLED = True
except ImportError:
    PIPER_INSTALLED = False
    PiperVoice = None


class PiperTTSService:
    def __init__(self):
        self.voice: Optional[PiperVoice] = None
        self.available: bool = False
        self.model_path: Optional[Path] = None
        self.error_message: Optional[str] = None

    @property
    def sample_rate(self) -> Optional[int]:
        if self.voice and hasattr(self.voice, "config") and hasattr(self.voice.config, "sample_rate"):
            return self.voice.config.sample_rate
        return None

    def resolve_model_path(self) -> Path:
        env_path = os.environ.get("PIPER_MODEL_PATH")
        if env_path:
            return Path(env_path)

        # Default project structure: ezhuthaani/tts-models/valluva/ta_IN-ValluvarNeural-medium.onnx
        base_dir = Path(__file__).parent.parent
        return base_dir / "tts-models" / "valluva" / "ta_IN-ValluvarNeural-medium.onnx"

    def load_model(self) -> bool:
        if not PIPER_INSTALLED:
            self.error_message = "piper-tts package is not installed."
            self.available = False
            print(f"[PiperTTS] {self.error_message}")
            return False

        config_path = Path(str(target_path) + ".json")

        if not target_path.exists() or not config_path.exists():
            print(f"[PiperTTS] ONNX model missing at {target_path}. Attempting auto-download from HuggingFace...")
            try:
                target_path.parent.mkdir(parents=True, exist_ok=True)
                import urllib.request
                onnx_url = "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/ta/ta_IN/valluvar/medium/ta_IN-valluvar-medium.onnx"
                json_url = "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/ta/ta_IN/valluvar/medium/ta_IN-valluvar-medium.onnx.json"
                if not target_path.exists():
                    urllib.request.urlretrieve(onnx_url, target_path)
                if not config_path.exists():
                    urllib.request.urlretrieve(json_url, config_path)
                print(f"[PiperTTS] ONNX model auto-downloaded successfully!")
            except Exception as dl_err:
                print(f"[PiperTTS] Model auto-download failed: {dl_err}")

        if not target_path.exists():
            self.error_message = f"Piper model file not found at {target_path}"
            self.available = False
            print(f"[PiperTTS] {self.error_message}")
            return False

        if not config_path.exists():
            self.error_message = f"Piper model config JSON not found at {config_path}"
            self.available = False
            print(f"[PiperTTS] {self.error_message}")
            return False

        try:
            print(f"[PiperTTS] Loading ONNX voice model from {target_path}...")
            self.voice = PiperVoice.load(str(target_path))
            self.available = True
            self.error_message = None
            print(f"[PiperTTS] Model loaded successfully! (Sample rate: {self.voice.config.sample_rate} Hz)")
            return True
        except Exception as e:
            self.error_message = f"Failed to load Piper voice model: {e}"
            self.available = False
            print(f"[PiperTTS] ERROR: {self.error_message}")
            return False

    def synthesize(self, text: str) -> bytes:
        return self.synthesize_to_bytes(text)

    def synthesize_to_bytes(self, text: str) -> bytes:
        if not self.available or not self.voice:
            raise RuntimeError(self.error_message or "Piper TTS service is unavailable")

        # 1. Synthesize raw WAV using Piper
        raw_buffer = io.BytesIO()
        with wave.open(raw_buffer, "wb") as wav_file:
            self.voice.synthesize_wav(text, wav_file)

        raw_buffer.seek(0)

        # 2. Add 250ms lead-in silence so initial phonemes on single words are crystal clear
        try:
            with wave.open(raw_buffer, "rb") as in_wav:
                params = in_wav.getparams()
                nchannels, sampwidth, framerate, nframes, comptype, compname = params
                pcm_data = in_wav.readframes(nframes)

            # Calculate silence frames for 250ms (0.25s)
            silence_duration_sec = 0.25
            silence_frames = int(framerate * silence_duration_sec)
            silence_bytes = b"\x00" * (silence_frames * nchannels * sampwidth)

            out_buffer = io.BytesIO()
            with wave.open(out_buffer, "wb") as out_wav:
                out_wav.setparams((nchannels, sampwidth, framerate, 0, comptype, compname))
                out_wav.writeframes(silence_bytes + pcm_data)

            out_buffer.seek(0)
            return out_buffer.read()
        except Exception as e:
            # Fallback to direct raw synthesis buffer if silence prepending fails
            print(f"[PiperTTS] Lead-in silence padding skipped: {e}")
            raw_buffer.seek(0)
            return raw_buffer.read()


# Global Singleton Service Instance
piper_tts_service = PiperTTSService()
