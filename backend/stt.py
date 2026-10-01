import os
import tempfile
from typing import Optional

try:
    from faster_whisper import WhisperModel
    WHISPER_INSTALLED = True
except ImportError:
    WHISPER_INSTALLED = False
    WhisperModel = None


# Tamil Prompt Priming to enforce accurate Tamil Unicode script output & vocabulary
TAMIL_INITIAL_PROMPT = (
    "வணக்கம், தமிழ் சொற்கள், தமிழ் வாக்கியம், எழுத்தாணி, திருக்குறள், உரை நடை."
)

ENGLISH_INITIAL_PROMPT = (
    "Hello, speaking in clear English words and sentences for language practice."
)


class WhisperSTTService:
    def __init__(self):
        self.model: Optional[WhisperModel] = None
        self.available: bool = False
        # Default to 'tiny' model for cloud / Render 512MB RAM compatibility
        self.model_size: str = os.environ.get("WHISPER_MODEL_SIZE", "tiny")
        self.error_message: Optional[str] = None

    def load_model(self) -> bool:
        if not WHISPER_INSTALLED:
            self.error_message = "faster-whisper package is not installed."
            self.available = False
            print(f"[WhisperSTT] {self.error_message}")
            return False

        try:
            print(f"[WhisperSTT] Loading Whisper model '{self.model_size}' (CPU, int8)...")
            self.model = WhisperModel(self.model_size, device="cpu", compute_type="int8")
            self.available = True
            self.error_message = None
            print(f"[WhisperSTT] Whisper STT model '{self.model_size}' loaded successfully!")
            return True
        except Exception as e:
            self.error_message = f"Failed to load Whisper model: {e}"
            self.available = False
            print(f"[WhisperSTT] ERROR: {self.error_message}")
            return False

    def transcribe_bytes(self, audio_bytes: bytes, language: Optional[str] = None) -> dict:
        if not self.available or not self.model:
            # Attempt lazy load
            if not self.load_model():
                raise RuntimeError(self.error_message or "Whisper STT service is unavailable")

        # Save audio bytes to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".audio") as temp_file:
            temp_file.write(audio_bytes)
            temp_path = temp_file.name

        try:
            # Map lang tags like 'ta-IN' -> 'ta', 'en-US' / 'en-IN' -> 'en'
            lang_code = None
            initial_prompt = None

            if language:
                clean_lang = language.split("-")[0].lower()
                if clean_lang == "ta":
                    lang_code = "ta"
                    initial_prompt = TAMIL_INITIAL_PROMPT
                elif clean_lang == "en":
                    lang_code = "en"
                    initial_prompt = ENGLISH_INITIAL_PROMPT

            segments, info = self.model.transcribe(
                temp_path,
                language=lang_code,
                initial_prompt=initial_prompt,
                beam_size=5,
                best_of=5,
                condition_on_previous_text=False,
                temperature=[0.0, 0.2, 0.4],
                vad_filter=True,
                vad_parameters=dict(min_silence_duration_ms=250),
            )

            transcribed_text = " ".join([segment.text.strip() for segment in segments if segment.text]).strip()

            return {
                "text": transcribed_text,
                "detected_language": info.language,
                "language_probability": round(info.language_probability, 3),
                "duration": round(info.duration, 2)
            }
        finally:
            if os.path.exists(temp_path):
                try:
                    os.remove(temp_path)
                except Exception:
                    pass


whisper_stt_service = WhisperSTTService()
