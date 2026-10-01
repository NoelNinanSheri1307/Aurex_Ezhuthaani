import io
import hashlib
import hmac
import json
import os
import secrets
from contextlib import asynccontextmanager
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Optional
import urllib.request

import jwt
from fastapi import Depends, FastAPI, HTTPException, Header, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy import (
    Boolean, Column, Date, DateTime, Float, ForeignKey, Integer, String,
    UniqueConstraint, create_engine, func, select, text,
)
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

# ---------------------------------------------------------------- curriculum
CURRICULUM = json.loads((Path(__file__).parent / "curriculum.json").read_text(encoding="utf-8"))
STAGES_BY_ID = {s["id"]: s for s in CURRICULUM["stages"]}
STAGES_ORDERED = sorted(CURRICULUM["stages"], key=lambda s: s["order"])
LESSON_XP = {l["id"]: l["xp"] for s in CURRICULUM["stages"] for l in s["lessons"]}
LESSON_STAGE = {l["id"]: s["id"] for s in CURRICULUM["stages"] for l in s["lessons"]}

# ---------------------------------------------------------------- db
env_file = Path(__file__).parent / ".env"
if env_file.exists():
    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, val = line.split("=", 1)
            os.environ.setdefault(key.strip(), val.strip())

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./ezhuthaani.db")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg://", 1)
elif DATABASE_URL.startswith("postgresql://") and not DATABASE_URL.startswith("postgresql+psycopg://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    pw_hash = Column(String, nullable=False)
    xp = Column(Integer, default=0, nullable=False)
    streak = Column(Integer, default=0, nullable=False)
    best_streak = Column(Integer, default=0, nullable=False)
    last_active = Column(Date, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)


class Progress(Base):
    __tablename__ = "progress"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    item_id = Column(String, nullable=False)
    score = Column(Integer, nullable=False, default=0)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    __table_args__ = (UniqueConstraint("user_id", "item_id", name="uq_user_item"),)


class SavedWord(Base):
    __tablename__ = "saved_words"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    word_id = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    __table_args__ = (UniqueConstraint("user_id", "word_id", name="uq_user_word"),)


class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    content_type = Column(String, nullable=False, default="dictionary")
    content_id = Column(String, nullable=False)
    title = Column(String, nullable=True)
    body = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))


class CulturalItem(Base):
    __tablename__ = "cultural_items"
    id = Column(Integer, primary_key=True)
    slug = Column(String, unique=True, nullable=False, index=True)
    content_type = Column(String, nullable=False, default="culture", index=True)
    title_ta = Column(String, nullable=False)
    title_en = Column(String, nullable=False)
    category = Column(String, nullable=False, index=True)
    summary_ta = Column(String, nullable=False)
    summary_en = Column(String, nullable=False)
    content_ta = Column(String, nullable=False)
    content_en = Column(String, nullable=False)
    author = Column(String, nullable=True)
    region = Column(String, nullable=True)
    period = Column(String, nullable=True)
    date_order = Column(Integer, nullable=True, index=True)
    date_label = Column(String, nullable=True)
    era = Column(String, nullable=True, index=True)
    genre = Column(String, nullable=True)
    literary_tradition = Column(String, nullable=True)
    copyright_status = Column(String, nullable=True)
    external_link = Column(String, nullable=True)
    script = Column(String, nullable=True)
    script_language = Column(String, nullable=True)
    historical_significance = Column(String, nullable=True)
    location_name = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    image_url = Column(String, nullable=True)
    image_caption = Column(String, nullable=True)
    source_type = Column(String, nullable=False, default="curated")
    source_name = Column(String, nullable=False)
    source_url = Column(String, nullable=True)
    license = Column(String, nullable=True)
    tags = Column(String, nullable=True)
    related_slugs = Column(String, nullable=True)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))


class SavedCulture(Base):
    __tablename__ = "saved_culture"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    culture_slug = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    __table_args__ = (UniqueConstraint("user_id", "culture_slug", name="uq_user_saved_culture"),)


class SavedHistory(Base):
    __tablename__ = "saved_history"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    history_slug = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    __table_args__ = (UniqueConstraint("user_id", "history_slug", name="uq_user_saved_history"),)


class SavedLiterature(Base):
    __tablename__ = "saved_literature"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    literature_slug = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    __table_args__ = (UniqueConstraint("user_id", "literature_slug", name="uq_user_saved_literature"),)


class SavedKnowledge(Base):
    __tablename__ = "saved_knowledge"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    knowledge_slug = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    __table_args__ = (UniqueConstraint("user_id", "knowledge_slug", name="uq_user_saved_knowledge"),)


class SavedInscription(Base):
    __tablename__ = "saved_inscriptions"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    inscription_slug = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    __table_args__ = (UniqueConstraint("user_id", "inscription_slug", name="uq_user_saved_inscription"),)


class SavedScriptHistory(Base):
    __tablename__ = "saved_script_history"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    script_history_slug = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    __table_args__ = (UniqueConstraint("user_id", "script_history_slug", name="uq_user_saved_script_history"),)


class DailyMission(Base):
    __tablename__ = "daily_missions"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    mission_date = Column(Date, nullable=False, index=True)
    mission_type = Column(String, nullable=False)
    target_id = Column(String, nullable=False)
    target_value = Column(Integer, nullable=False, default=1)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    xp_reward = Column(Integer, nullable=False, default=15)
    progress = Column(Integer, nullable=False, default=0)
    completed = Column(Boolean, nullable=False, default=False)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    __table_args__ = (UniqueConstraint("user_id", "mission_date", "mission_type", "target_id", name="uq_user_daily_mission"),)


class AIConversation(Base):
    __tablename__ = "ai_conversations"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    title = Column(String, nullable=False, default="Tamil Learning Chat")
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))


class AIMessage(Base):
    __tablename__ = "ai_messages"
    id = Column(Integer, primary_key=True)
    conversation_id = Column(Integer, ForeignKey("ai_conversations.id"), nullable=False, index=True)
    role = Column(String, nullable=False)  # "user" or "assistant"
    content = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))


Base.metadata.create_all(engine)


def ensure_schema_migrations(engine) -> None:
    """Ensure newly added columns exist in pre-existing database tables without data loss."""
    migrations = [
        ("cultural_items", "content_type", "VARCHAR DEFAULT 'culture'"),
        ("cultural_items", "date_order", "INTEGER"),
        ("cultural_items", "date_label", "VARCHAR"),
        ("cultural_items", "era", "VARCHAR"),
        ("cultural_items", "related_slugs", "VARCHAR"),
        ("cultural_items", "author", "VARCHAR"),
        ("cultural_items", "genre", "VARCHAR"),
        ("cultural_items", "literary_tradition", "VARCHAR"),
        ("cultural_items", "copyright_status", "VARCHAR"),
        ("cultural_items", "external_link", "VARCHAR"),
        ("cultural_items", "script", "VARCHAR"),
        ("cultural_items", "script_language", "VARCHAR"),
        ("cultural_items", "historical_significance", "VARCHAR"),
        ("cultural_items", "location_name", "VARCHAR"),
        ("cultural_items", "latitude", "DOUBLE PRECISION"),
        ("cultural_items", "longitude", "DOUBLE PRECISION"),
    ]
    with engine.begin() as conn:
        for table, col, col_def in migrations:
            try:
                conn.execute(text(f"ALTER TABLE {table} ADD COLUMN IF NOT EXISTS {col} {col_def};"))
                if col == "content_type":
                    conn.execute(text(f"UPDATE {table} SET content_type = 'culture' WHERE content_type IS NULL;"))
            except Exception as e:
                print(f"Migration note ({table}.{col}): {e}")


ensure_schema_migrations(engine)


def seed_cultural_items_if_needed(db: Session) -> None:
    try:
        try:
            from content.culture_data import CULTURE_DATA as C_DATA
        except ImportError:
            from content.seed_data import SEED_CULTURAL_ITEMS as C_DATA

        for item in C_DATA:
            row = db.execute(select(CulturalItem).where(CulturalItem.slug == item["slug"])).scalar_one_or_none()
            if not row:
                item_copy = dict(item)
                item_copy["content_type"] = "culture"
                db.add(CulturalItem(**item_copy))
            else:
                row.title_ta = item.get("title_ta", row.title_ta)
                row.title_en = item.get("title_en", row.title_en)
                row.category = item.get("category", row.category)
                row.summary_ta = item.get("summary_ta", row.summary_ta)
                row.summary_en = item.get("summary_en", row.summary_en)
                row.content_ta = item.get("content_ta", row.content_ta)
                row.content_en = item.get("content_en", row.content_en)
                row.region = item.get("region", row.region)
                row.period = item.get("period", row.period)
                row.era = item.get("era", row.era)
                row.location_name = item.get("location_name", row.location_name)
                row.latitude = item.get("latitude", row.latitude)
                row.longitude = item.get("longitude", row.longitude)
                row.tags = item.get("tags", row.tags)
                row.related_slugs = item.get("related_slugs", row.related_slugs)
                if item.get("image_url"):
                    row.image_url = item.get("image_url")
                if item.get("image_caption"):
                    row.image_caption = item.get("image_caption")
                if item.get("source_name"):
                    row.source_name = item.get("source_name")
                if item.get("source_url"):
                    row.source_url = item.get("source_url")
                if item.get("license"):
                    row.license = item.get("license")
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Warning: Failed to auto-seed/update cultural items: {e}")


def seed_history_items_if_needed(db: Session) -> None:
    try:
        from content.history_seed_data import SEED_HISTORY_ITEMS
        for item in SEED_HISTORY_ITEMS:
            item_copy = dict(item)
            item_copy["content_type"] = "history"
            row = db.execute(select(CulturalItem).where(CulturalItem.slug == item_copy["slug"])).scalar_one_or_none()
            if not row:
                db.add(CulturalItem(**item_copy))
            else:
                for k, v in item_copy.items():
                    setattr(row, k, v)
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Warning: Failed to auto-seed history items: {e}")




def seed_literature_items_if_needed(db: Session) -> None:
    try:
        from content.literature_seed_data import SEED_LITERATURE_ITEMS
        count = db.execute(select(func.count(CulturalItem.id)).where(CulturalItem.content_type == "literature")).scalar() or 0
        if count == 0:
            for item in SEED_LITERATURE_ITEMS:
                item["content_type"] = "literature"
                db.add(CulturalItem(**item))
            db.commit()
    except Exception as e:
        db.rollback()
        print(f"Warning: Failed to auto-seed literature items: {e}")


def seed_knowledge_items_if_needed(db: Session) -> None:
    try:
        from content.knowledge_seed_data import SEED_KNOWLEDGE_ITEMS
        count = db.execute(select(func.count(CulturalItem.id)).where(CulturalItem.content_type == "article")).scalar() or 0
        if count == 0:
            for item in SEED_KNOWLEDGE_ITEMS:
                item["content_type"] = "article"
                db.add(CulturalItem(**item))
            db.commit()
    except Exception as e:
        db.rollback()
        print(f"Warning: Failed to auto-seed knowledge items: {e}")


def seed_script_history_items_if_needed(db: Session) -> None:
    try:
        from content.script_history_seed_data import SEED_SCRIPT_HISTORY_ITEMS
        count = db.execute(select(func.count(CulturalItem.id)).where(CulturalItem.content_type == "script_history")).scalar() or 0
        if count == 0:
            for item in SEED_SCRIPT_HISTORY_ITEMS:
                item["content_type"] = "script_history"
                db.add(CulturalItem(**item))
            db.commit()
    except Exception as e:
        db.rollback()
        print(f"Warning: Failed to auto-seed script history items: {e}")


def seed_inscription_items_if_needed(db: Session) -> None:
    try:
        from content.inscriptions_seed_data import SEED_INSCRIPTION_ITEMS
        count = db.execute(select(func.count(CulturalItem.id)).where(CulturalItem.content_type == "inscription")).scalar() or 0
        if count == 0:
            for item in SEED_INSCRIPTION_ITEMS:
                item["content_type"] = "inscription"
                db.add(CulturalItem(**item))
            db.commit()
    except Exception as e:
        db.rollback()
        print(f"Warning: Failed to auto-seed inscription items: {e}")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------------------------------------------------------- auth
JWT_SECRET = os.environ.get("JWT_SECRET", "dev-secret-change-me-please-32-bytes-min")
JWT_ALG = "HS256"
JWT_TTL_DAYS = 30


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    h = hashlib.scrypt(password.encode(), salt=salt, n=16384, r=8, p=1)
    return f"scrypt${salt.hex()}${h.hex()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        _, salt_hex, hash_hex = stored.split("$")
    except ValueError:
        return False
    salt = bytes.fromhex(salt_hex)
    expected = bytes.fromhex(hash_hex)
    candidate = hashlib.scrypt(password.encode(), salt=salt, n=16384, r=8, p=1)
    return hmac.compare_digest(candidate, expected)


def make_token(user_id: int) -> str:
    payload = {
        "sub": str(user_id),
        "exp": datetime.now(timezone.utc) + timedelta(days=JWT_TTL_DAYS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


def get_current_user(authorization: str = Header(default=""), db: Session = Depends(get_db)) -> User:
    if not authorization.startswith("Bearer "):
        raise HTTPException(401, "Missing or invalid Authorization header")
    token = authorization.removeprefix("Bearer ")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except jwt.PyJWTError:
        raise HTTPException(401, "Invalid or expired token")
    user = db.get(User, int(payload["sub"]))
    if not user:
        raise HTTPException(401, "User not found")
    return user


# ---------------------------------------------------------------- domain logic

def apply_streak(user: User) -> None:
    """Update streak based on today's activity. Mutates user in place."""
    today = date.today()
    if user.last_active == today:
        pass
    elif user.last_active == today - timedelta(days=1):
        user.streak += 1
    else:
        user.streak = 1
    user.last_active = today
    user.best_streak = max(user.best_streak, user.streak)


def level_for_xp(xp: int) -> int:
    return int((xp / 100) ** 0.5) + 1


def passed_stage_ids(db: Session, user_id: int) -> set[str]:
    rows = db.execute(
        select(Progress.item_id).where(
            Progress.user_id == user_id,
            Progress.item_id.like("quiz:%"),
            Progress.score >= 70,
        )
    ).scalars().all()
    return {item_id.removeprefix("quiz:") for item_id in rows}


def unlocked_stage_ids(passed: set[str]) -> set[str]:
    unlocked = {STAGES_ORDERED[0]["id"]}
    for prev, nxt in zip(STAGES_ORDERED, STAGES_ORDERED[1:]):
        if prev["id"] in passed:
            unlocked.add(nxt["id"])
    return unlocked


def user_public(db: Session, user: User) -> dict:
    progress_rows = db.execute(select(Progress).where(Progress.user_id == user.id)).scalars().all()
    passed = passed_stage_ids(db, user.id)
    unlocked = unlocked_stage_ids(passed)
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "xp": user.xp,
        "level": level_for_xp(user.xp),
        "streak": user.streak,
        "best_streak": user.best_streak,
        "progress": {p.item_id: p.score for p in progress_rows},
        "unlocked_stages": sorted(unlocked, key=lambda sid: STAGES_BY_ID[sid]["order"]),
        "completed_stages": sorted(passed, key=lambda sid: STAGES_BY_ID[sid]["order"]),
    }


# ---------------------------------------------------------------- app
@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        from tts import piper_tts_service
        piper_tts_service.load_model()
    except Exception as e:
        print(f"Warning: Failed to load Piper TTS model during startup: {e}")
    try:
        from stt import whisper_stt_service
        whisper_stt_service.load_model()
    except Exception as e:
        print(f"Warning: Failed to load Whisper STT model during startup: {e}")
    yield


app = FastAPI(title="Ezhuthaani API", lifespan=lifespan)

cors_origins_raw = os.environ.get("CORS_ORIGINS", "")
if cors_origins_raw and cors_origins_raw.strip() != "*":
    cors_origins = [o.strip() for o in cors_origins_raw.split(",") if o.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_origin_regex=r"https://.*\.vercel\.app|http://localhost:\d+|http://127\.0\.0\.1:\d+",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origin_regex=r".*",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


class RegisterIn(BaseModel):
    name: str
    email: str
    password: str


class LoginIn(BaseModel):
    email: str
    password: str


class LessonCompleteIn(BaseModel):
    score: int | None = None


class QuizSubmitIn(BaseModel):
    answers: list[int]


class SavedWordIn(BaseModel):
    word_id: str


class NoteCreateIn(BaseModel):
    content_type: str = "dictionary"
    content_id: str
    title: str | None = None
    body: str


class NoteUpdateIn(BaseModel):
    title: str | None = None
    body: str


class SavedCultureIn(BaseModel):
    slug: str


class SavedHistoryIn(BaseModel):
    slug: str


class SavedLiteratureIn(BaseModel):
    slug: str


class SavedKnowledgeIn(BaseModel):
    slug: str


class SavedInscriptionIn(BaseModel):
    slug: str


class SavedScriptHistoryIn(BaseModel):
    slug: str


class AIMessageCreateIn(BaseModel):
    content: str


class TTSSynthesizeIn(BaseModel):
    text: str


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/api/tts/status")
def tts_status():
    from tts import piper_tts_service
    return {
        "available": piper_tts_service.available,
        "model_path": str(piper_tts_service.model_path) if piper_tts_service.model_path else None,
        "sample_rate": piper_tts_service.sample_rate if piper_tts_service.available else None,
    }


@app.post("/api/tts/synthesize")
def tts_synthesize(body: TTSSynthesizeIn):
    from tts import piper_tts_service
    if not piper_tts_service.available:
        raise HTTPException(status_code=503, detail="Piper TTS service unavailable")

    text = (body.text or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    if len(text) > 2000:
        raise HTTPException(status_code=400, detail="Text exceeds maximum allowed length")

    try:
        wav_bytes = piper_tts_service.synthesize(text)
        return StreamingResponse(
            io.BytesIO(wav_bytes),
            media_type="audio/wav",
            headers={
                "Content-Length": str(len(wav_bytes)),
                "Cache-Control": "no-cache",
            },
        )
    except Exception as e:
        print(f"Error synthesizing audio with Piper TTS: {e}")
        raise HTTPException(status_code=500, detail="Audio synthesis failed")


@app.get("/api/stt/status")
def stt_status():
    from stt import whisper_stt_service
    return {
        "available": whisper_stt_service.available,
        "model_size": whisper_stt_service.model_size,
        "error": whisper_stt_service.error_message,
    }


@app.post("/api/stt/transcribe")
async def stt_transcribe(
    file: UploadFile = File(...),
    language: Optional[str] = Form(None)
):
    from stt import whisper_stt_service
    if not whisper_stt_service.available:
        whisper_stt_service.load_model()
        if not whisper_stt_service.available:
            raise HTTPException(status_code=503, detail="Whisper STT service unavailable")

    try:
        audio_bytes = await file.read()
        if not audio_bytes or len(audio_bytes) < 100:
            raise HTTPException(status_code=400, detail="Audio content empty or too short")

        result = whisper_stt_service.transcribe_bytes(audio_bytes, language=language)
        return result
    except Exception as e:
        print(f"Error transcribing audio with Whisper STT: {e}")
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")


@app.get("/api/curriculum")
def get_curriculum():
    return CURRICULUM


@app.post("/api/auth/register")
def register(body: RegisterIn, db: Session = Depends(get_db)):
    existing = db.execute(select(User).where(User.email == body.email)).scalar_one_or_none()
    if existing:
        raise HTTPException(400, "Email already registered")
    user = User(name=body.name, email=body.email, pw_hash=hash_password(body.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"token": make_token(user.id), "user": user_public(db, user)}


@app.post("/api/auth/login")
def login(body: LoginIn, db: Session = Depends(get_db)):
    user = db.execute(select(User).where(User.email == body.email)).scalar_one_or_none()
    if not user or not verify_password(body.password, user.pw_hash):
        raise HTTPException(401, "Invalid email or password")
    return {"token": make_token(user.id), "user": user_public(db, user)}


@app.get("/api/me")
def me(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return user_public(db, user)


@app.post("/api/lessons/{lesson_id}/complete")
def complete_lesson(
    lesson_id: str,
    body: LessonCompleteIn,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if lesson_id not in LESSON_XP:
        raise HTTPException(404, "Unknown lesson")
    existing = db.execute(
        select(Progress).where(Progress.user_id == user.id, Progress.item_id == lesson_id)
    ).scalar_one_or_none()

    xp_gained = 0
    score = body.score if body.score is not None else 100
    if existing is None:
        db.add(Progress(user_id=user.id, item_id=lesson_id, score=score))
        xp_gained = LESSON_XP[lesson_id]
        user.xp += xp_gained
    elif score > existing.score:
        existing.score = score
        existing.updated_at = datetime.now(timezone.utc)

    apply_streak(user)
    db.commit()
    db.refresh(user)
    return {"xp_gained": xp_gained, "xp": user.xp, "streak": user.streak, "level": level_for_xp(user.xp)}


@app.post("/api/quiz/{stage_id}/submit")
def submit_quiz(
    stage_id: str,
    body: QuizSubmitIn,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    stage = STAGES_BY_ID.get(stage_id)
    if not stage:
        raise HTTPException(404, "Unknown stage")

    passed_before = passed_stage_ids(db, user.id)
    if stage_id not in unlocked_stage_ids(passed_before):
        raise HTTPException(403, "Stage is locked")

    questions = stage["quiz"]["questions"]
    correct = sum(
        1
        for i, q in enumerate(questions)
        if i < len(body.answers) and body.answers[i] == q["answer"]
    )
    score = round(100 * correct / len(questions)) if questions else 0
    passed = score >= stage["quiz"]["pass_score"]

    item_id = f"quiz:{stage_id}"
    existing = db.execute(
        select(Progress).where(Progress.user_id == user.id, Progress.item_id == item_id)
    ).scalar_one_or_none()

    xp_gained = 0
    is_first_pass = passed and (existing is None or existing.score < stage["quiz"]["pass_score"])
    if existing is None:
        db.add(Progress(user_id=user.id, item_id=item_id, score=score))
        if is_first_pass:
            xp_gained = 50
            user.xp += xp_gained
    elif score > existing.score:
        if is_first_pass:
            xp_gained = 50
            user.xp += xp_gained
        existing.score = score
        existing.updated_at = datetime.now(timezone.utc)

    apply_streak(user)
    db.commit()
    db.refresh(user)

    passed_after = passed_stage_ids(db, user.id)
    unlocked_after = unlocked_stage_ids(passed_after)
    newly_unlocked = sorted(unlocked_after - unlocked_stage_ids(passed_before), key=lambda sid: STAGES_BY_ID[sid]["order"])

    return {
        "score": score,
        "passed": passed,
        "xp_gained": xp_gained,
        "badge": stage["milestone"]["badge"] if is_first_pass else None,
        "unlocked_next": newly_unlocked,
    }


class HangmanCompleteIn(BaseModel):
    total_questions: int
    correct_count: int


@app.post("/api/hangman/complete")
def complete_hangman_session(
    body: HangmanCompleteIn,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if body.total_questions <= 0:
        raise HTTPException(400, "Invalid question count")

    win_percentage = round((body.correct_count / body.total_questions) * 100)
    xp_gained = 0
    earned_bonus = False

    if win_percentage >= 80:
        earned_bonus = True
        if body.total_questions >= 50:
            xp_gained = 250
        elif body.total_questions >= 20:
            xp_gained = 100
        elif body.total_questions >= 15:
            xp_gained = 75
        elif body.total_questions >= 10:
            xp_gained = 50
        else:
            xp_gained = 25

        user.xp += xp_gained
        apply_streak(user)
        db.commit()
        db.refresh(user)

    return {
        "ok": True,
        "win_percentage": win_percentage,
        "earned_bonus": earned_bonus,
        "xp_gained": xp_gained,
        "total_xp": user.xp,
        "level": level_for_xp(user.xp),
    }


@app.get("/api/leaderboard")
def leaderboard(db: Session = Depends(get_db)):
    rows = db.execute(select(User).order_by(User.xp.desc()).limit(20)).scalars().all()
    return [
        {"name": u.name, "xp": u.xp, "level": level_for_xp(u.xp), "streak": u.streak}
        for u in rows
    ]


# ---------------------------------------------------------------- saved words
@app.get("/api/saved")
def get_saved_words(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.execute(
        select(SavedWord).where(SavedWord.user_id == user.id).order_by(SavedWord.created_at.desc())
    ).scalars().all()
    return [
        {
            "id": r.id,
            "word_id": r.word_id,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in rows
    ]


@app.post("/api/saved")
def save_word(body: SavedWordIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not body.word_id or not isinstance(body.word_id, str):
        raise HTTPException(400, "word_id is required")
    existing = db.execute(
        select(SavedWord).where(SavedWord.user_id == user.id, SavedWord.word_id == body.word_id)
    ).scalar_one_or_none()
    if existing:
        return {"ok": True, "id": existing.id, "word_id": existing.word_id, "already_saved": True}
    record = SavedWord(user_id=user.id, word_id=body.word_id)
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"ok": True, "id": record.id, "word_id": record.word_id, "already_saved": False}


@app.delete("/api/saved/{word_id}")
def unsave_word(word_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.execute(
        select(SavedWord).where(SavedWord.user_id == user.id, SavedWord.word_id == word_id)
    ).scalar_one_or_none()
    if existing:
        db.delete(existing)
        db.commit()
    return {"ok": True, "removed": word_id}


# ---------------------------------------------------------------- notes
@app.get("/api/notes")
def get_notes(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.execute(
        select(Note).where(Note.user_id == user.id).order_by(Note.updated_at.desc())
    ).scalars().all()
    return [
        {
            "id": r.id,
            "content_type": r.content_type,
            "content_id": r.content_id,
            "title": r.title,
            "body": r.body,
            "created_at": r.created_at.isoformat() if r.created_at else None,
            "updated_at": r.updated_at.isoformat() if r.updated_at else None,
        }
        for r in rows
    ]


@app.post("/api/notes")
def create_note(body: NoteCreateIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not body.body or not body.body.strip():
        raise HTTPException(400, "Note body cannot be empty")
    if not body.content_id or not body.content_id.strip():
        raise HTTPException(400, "content_id is required")
    note = Note(
        user_id=user.id,
        content_type=body.content_type.strip() or "dictionary",
        content_id=body.content_id.strip(),
        title=body.title.strip() if body.title else None,
        body=body.body.strip(),
    )
    db.add(note)
    db.commit()
    db.refresh(note)
    return {
        "id": note.id,
        "content_type": note.content_type,
        "content_id": note.content_id,
        "title": note.title,
        "body": note.body,
        "created_at": note.created_at.isoformat() if note.created_at else None,
        "updated_at": note.updated_at.isoformat() if note.updated_at else None,
    }


@app.put("/api/notes/{note_id}")
def update_note(
    note_id: int,
    body: NoteUpdateIn,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    note = db.execute(
        select(Note).where(Note.id == note_id, Note.user_id == user.id)
    ).scalar_one_or_none()
    if not note:
        raise HTTPException(404, "Note not found or unauthorized")
    if not body.body or not body.body.strip():
        raise HTTPException(400, "Note body cannot be empty")
    note.title = body.title.strip() if body.title else None
    note.body = body.body.strip()
    note.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(note)
    return {
        "id": note.id,
        "content_type": note.content_type,
        "content_id": note.content_id,
        "title": note.title,
        "body": note.body,
        "created_at": note.created_at.isoformat() if note.created_at else None,
        "updated_at": note.updated_at.isoformat() if note.updated_at else None,
    }


@app.delete("/api/notes/{note_id}")
def delete_note(
    note_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    note = db.execute(
        select(Note).where(Note.id == note_id, Note.user_id == user.id)
    ).scalar_one_or_none()
    if not note:
        raise HTTPException(404, "Note not found or unauthorized")
    db.delete(note)
    db.commit()
    return {"ok": True, "deleted_id": note_id}


# ---------------------------------------------------------------- culture
@app.get("/api/culture/categories")
def get_culture_categories(db: Session = Depends(get_db)):
    try:
        seed_cultural_items_if_needed(db)
        rows = db.execute(
            select(CulturalItem.category)
            .where(CulturalItem.content_type == "culture", CulturalItem.category.isnot(None))
            .distinct()
        ).scalars().all()
        db_cats = sorted([r for r in rows if r])
        if db_cats:
            return db_cats
        try:
            from content.culture_data import CULTURE_DATA
            return sorted(list({item["category"] for item in CULTURE_DATA if item.get("category")}))
        except ImportError:
            from content.seed_data import SEED_CULTURAL_ITEMS
            return sorted(list({item["category"] for item in SEED_CULTURAL_ITEMS if item.get("category")}))
    except Exception as e:
        print(f"DB offline fallback for categories: {e}")
        try:
            from content.culture_data import CULTURE_DATA
            return sorted(list({item["category"] for item in CULTURE_DATA if item.get("category")}))
        except ImportError:
            from content.seed_data import SEED_CULTURAL_ITEMS
            return sorted(list({item["category"] for item in SEED_CULTURAL_ITEMS if item.get("category")}))


@app.get("/api/culture/quiz")
def get_culture_quiz(slug: str | None = None, category: str | None = None):
    try:
        from content.culture_quiz_data import CULTURE_QUIZ_DATA
        if slug:
            questions = CULTURE_QUIZ_DATA.get(slug, [])
            return {"slug": slug, "questions": questions}

        if category and category.lower() != "all":
            try:
                from content.culture_data import CULTURE_DATA
                cat_slugs = {item["slug"] for item in CULTURE_DATA if item.get("category", "").lower() == category.lower()}
                filtered = {s: q for s, q in CULTURE_QUIZ_DATA.items() if s in cat_slugs}
                return filtered
            except Exception:
                pass

        return CULTURE_QUIZ_DATA
    except Exception as e:
        print(f"Error fetching culture quiz data: {e}")
        return {}


@app.get("/api/culture/quiz/{slug}")
def get_culture_quiz_by_slug(slug: str):
    try:
        from content.culture_quiz_data import CULTURE_QUIZ_DATA
        questions = CULTURE_QUIZ_DATA.get(slug, [])
        return {"slug": slug, "questions": questions}
    except Exception as e:
        print(f"Error fetching culture quiz by slug: {e}")
        return {"slug": slug, "questions": []}


@app.get("/api/culture")
def get_culture_items(category: str | None = None, q: str | None = None, db: Session = Depends(get_db)):
    try:
        seed_cultural_items_if_needed(db)
        stmt = select(CulturalItem).where(CulturalItem.content_type == "culture")
        if category and category.lower() != "all":
            stmt = stmt.where(CulturalItem.category == category)
        if q and q.strip():
            term = f"%{q.strip().lower()}%"
            stmt = stmt.where(
                func.lower(CulturalItem.title_ta).like(term)
                | func.lower(CulturalItem.title_en).like(term)
                | func.lower(CulturalItem.summary_en).like(term)
                | func.lower(CulturalItem.summary_ta).like(term)
                | func.lower(CulturalItem.tags).like(term)
            )
        rows = db.execute(stmt.order_by(CulturalItem.category, CulturalItem.title_en)).scalars().all()
        return [
            {
                "id": r.id,
                "slug": r.slug,
                "title_ta": r.title_ta,
                "title_en": r.title_en,
                "category": r.category,
                "summary_ta": r.summary_ta,
                "summary_en": r.summary_en,
                "region": r.region,
                "period": r.period,
                "era": r.era,
                "location_name": r.location_name,
                "latitude": r.latitude,
                "longitude": r.longitude,
                "tags": r.tags,
                "image_url": r.image_url,
                "image_caption": r.image_caption,
                "source_type": r.source_type,
                "source_name": r.source_name,
                "source_url": r.source_url,
                "license": r.license,
            }
            for r in rows
        ]
    except Exception as e:
        print(f"DB offline fallback for /api/culture: {e}")
        try:
            from content.culture_data import CULTURE_DATA as items
        except ImportError:
            from content.seed_data import SEED_CULTURAL_ITEMS as items
        if category and category.lower() != "all":
            items = [i for i in items if i.get("category", "").lower() == category.lower()]
        if q and q.strip():
            t = q.strip().lower()
            items = [
                i for i in items
                if t in i.get("title_ta", "").lower()
                or t in i.get("title_en", "").lower()
                or t in i.get("summary_en", "").lower()
                or t in i.get("summary_ta", "").lower()
                or t in i.get("tags", "").lower()
            ]
        return [
            {
                "id": idx + 1,
                "slug": item["slug"],
                "title_ta": item["title_ta"],
                "title_en": item["title_en"],
                "category": item["category"],
                "summary_ta": item["summary_ta"],
                "summary_en": item["summary_en"],
                "region": item.get("region"),
                "period": item.get("period"),
                "era": item.get("era"),
                "location_name": item.get("location_name"),
                "latitude": item.get("latitude"),
                "longitude": item.get("longitude"),
                "tags": item.get("tags"),
                "image_url": item.get("image_url"),
                "image_caption": item.get("image_caption"),
                "source_type": item.get("source_type", "curated"),
                "source_name": item.get("source_name", "Ezhuthaani Editorial"),
                "source_url": item.get("source_url"),
                "license": item.get("license", "CC BY-SA 4.0"),
            }
            for idx, item in enumerate(items)
        ]


@app.get("/api/culture/{slug}")
def get_culture_detail(slug: str, db: Session = Depends(get_db)):
    try:
        seed_cultural_items_if_needed(db)
        item = db.execute(select(CulturalItem).where(CulturalItem.slug == slug)).scalar_one_or_none()
        if not item:
            raise HTTPException(404, "Cultural item not found")

        related_rows = db.execute(
            select(CulturalItem)
            .where(CulturalItem.category == item.category, CulturalItem.slug != slug)
            .limit(4)
        ).scalars().all()

        return {
            "id": item.id,
            "slug": item.slug,
            "title_ta": item.title_ta,
            "title_en": item.title_en,
            "category": item.category,
            "summary_ta": item.summary_ta,
            "summary_en": item.summary_en,
            "content_ta": item.content_ta,
            "content_en": item.content_en,
            "region": item.region,
            "period": item.period,
            "era": item.era,
            "location_name": item.location_name,
            "latitude": item.latitude,
            "longitude": item.longitude,
            "image_url": item.image_url,
            "image_caption": item.image_caption,
            "source_type": item.source_type,
            "source_name": item.source_name,
            "source_url": item.source_url,
            "license": item.license,
            "tags": item.tags,
            "related_slugs": item.related_slugs,
            "related": [
                {
                    "slug": r.slug,
                    "title_ta": r.title_ta,
                    "title_en": r.title_en,
                    "category": r.category,
                    "image_url": r.image_url,
                }
                for r in related_rows
            ],
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"DB offline fallback for /api/culture/{slug}: {e}")
        try:
            from content.culture_data import CULTURE_DATA
            items = CULTURE_DATA
        except ImportError:
            from content.seed_data import SEED_CULTURAL_ITEMS
            items = SEED_CULTURAL_ITEMS
        match = next((i for i in items if i["slug"] == slug), None)
        if not match:
            raise HTTPException(404, "Cultural item not found")
        siblings = [i for i in items if i.get("category") == match.get("category") and i["slug"] != slug][:4]
        return {
            "id": 1,
            "slug": match["slug"],
            "title_ta": match["title_ta"],
            "title_en": match["title_en"],
            "category": match["category"],
            "summary_ta": match["summary_ta"],
            "summary_en": match["summary_en"],
            "content_ta": match["content_ta"],
            "content_en": match["content_en"],
            "subtitle_ta": match.get("subtitle_ta"),
            "subtitle_en": match.get("subtitle_en"),
            "region": match.get("region"),
            "period": match.get("period"),
            "era": match.get("era"),
            "location_name": match.get("location_name"),
            "latitude": match.get("latitude"),
            "longitude": match.get("longitude"),
            "image_url": match.get("image_url"),
            "image_caption": match.get("image_caption"),
            "source_type": match.get("source_type", "curated"),
            "source_name": match.get("source_name", "Ezhuthaani Editorial"),
            "source_url": match.get("source_url"),
            "license": match.get("license", "CC BY-SA 4.0"),
            "tags": match.get("tags"),
            "related_slugs": match.get("related_slugs"),
            "related": [
                {
                    "slug": r["slug"],
                    "title_ta": r["title_ta"],
                    "title_en": r["title_en"],
                    "category": r["category"],
                    "image_url": r.get("image_url"),
                }
                for r in siblings
            ],
        }


# ---------------------------------------------------------------- saved culture
@app.get("/api/saved/culture")
def get_saved_culture(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.execute(
        select(SavedCulture).where(SavedCulture.user_id == user.id).order_by(SavedCulture.created_at.desc())
    ).scalars().all()
    return [
        {
            "id": r.id,
            "slug": r.culture_slug,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in rows
    ]


@app.post("/api/saved/culture")
def save_culture(body: SavedCultureIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not body.slug or not isinstance(body.slug, str):
        raise HTTPException(400, "slug is required")
    existing = db.execute(
        select(SavedCulture).where(SavedCulture.user_id == user.id, SavedCulture.culture_slug == body.slug)
    ).scalar_one_or_none()
    if existing:
        return {"ok": True, "id": existing.id, "slug": existing.culture_slug, "already_saved": True}
    record = SavedCulture(user_id=user.id, culture_slug=body.slug)
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"ok": True, "id": record.id, "slug": record.culture_slug, "already_saved": False}


@app.delete("/api/saved/culture/{slug}")
def unsave_culture(slug: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.execute(
        select(SavedCulture).where(SavedCulture.user_id == user.id, SavedCulture.culture_slug == slug)
    ).scalar_one_or_none()
    if existing:
        db.delete(existing)
        db.commit()
    return {"ok": True, "removed": slug}


# ---------------------------------------------------------------- history
@app.get("/api/history/eras")
def get_history_eras(db: Session = Depends(get_db)):
    default_eras = [
        "Sangam Era",
        "Classical Era",
        "Pallava Period",
        "Chola Empire",
        "Pandya Kingdom",
        "Colonial Era",
        "Modern Era",
    ]
    try:
        seed_history_items_if_needed(db)
        rows = db.execute(
            select(CulturalItem.era)
            .where(CulturalItem.content_type == "history", CulturalItem.era.isnot(None))
            .distinct()
        ).scalars().all()
        db_eras = [r for r in rows if r]
        return list(dict.fromkeys(default_eras + sorted(db_eras)))
    except Exception as e:
        print(f"DB offline fallback for /api/history/eras: {e}")
        return default_eras


@app.get("/api/history")
def get_history_items(era: str | None = None, q: str | None = None, db: Session = Depends(get_db)):
    try:
        seed_history_items_if_needed(db)
        stmt = select(CulturalItem).where(CulturalItem.content_type == "history")
        if era and era.lower() != "all":
            stmt = stmt.where(CulturalItem.era == era)
        if q and q.strip():
            term = f"%{q.strip().lower()}%"
            stmt = stmt.where(
                func.lower(CulturalItem.title_ta).like(term)
                | func.lower(CulturalItem.title_en).like(term)
                | func.lower(CulturalItem.summary_en).like(term)
                | func.lower(CulturalItem.summary_ta).like(term)
                | func.lower(CulturalItem.tags).like(term)
            )
        rows = db.execute(stmt.order_by(CulturalItem.date_order.asc().nulls_last())).scalars().all()
        return [
            {
                "id": r.id,
                "slug": r.slug,
                "content_type": r.content_type,
                "title_ta": r.title_ta,
                "title_en": r.title_en,
                "category": r.category,
                "summary_ta": r.summary_ta,
                "summary_en": r.summary_en,
                "region": r.region,
                "period": r.period,
                "date_order": r.date_order,
                "date_label": r.date_label,
                "era": r.era,
                "image_url": r.image_url,
                "image_caption": r.image_caption,
                "source_type": r.source_type,
                "source_name": r.source_name,
                "source_url": r.source_url,
                "license": r.license,
                "related_slugs": r.related_slugs,
            }
            for r in rows
        ]
    except Exception as e:
        print(f"DB offline fallback for /api/history: {e}")
        from content.history_seed_data import SEED_HISTORY_ITEMS
        items = SEED_HISTORY_ITEMS
        if era and era.lower() != "all":
            items = [i for i in items if i.get("era", "").lower() == era.lower()]
        if q and q.strip():
            t = q.strip().lower()
            items = [
                i for i in items
                if t in i.get("title_ta", "").lower()
                or t in i.get("title_en", "").lower()
                or t in i.get("summary_en", "").lower()
                or t in i.get("summary_ta", "").lower()
                or t in i.get("tags", "").lower()
            ]
        items = sorted(items, key=lambda x: x.get("date_order", 0))
        return [
            {
                "id": idx + 1,
                "slug": item["slug"],
                "content_type": "history",
                "title_ta": item["title_ta"],
                "title_en": item["title_en"],
                "category": item.get("category", "History"),
                "summary_ta": item["summary_ta"],
                "summary_en": item["summary_en"],
                "region": item.get("region"),
                "period": item.get("period"),
                "date_order": item.get("date_order"),
                "date_label": item.get("date_label"),
                "era": item.get("era"),
                "image_url": item.get("image_url"),
                "image_caption": item.get("image_caption"),
                "source_type": item.get("source_type", "wikidata"),
                "source_name": item.get("source_name", "Ezhuthaani Editorial"),
                "source_url": item.get("source_url"),
                "license": item.get("license", "CC BY-SA 4.0"),
                "related_slugs": item.get("related_slugs"),
            }
            for idx, item in enumerate(items)
        ]


@app.get("/api/history/{slug}")
def get_history_detail(slug: str, db: Session = Depends(get_db)):
    try:
        seed_history_items_if_needed(db)
        item = db.execute(
            select(CulturalItem).where(CulturalItem.slug == slug)
        ).scalar_one_or_none()
        if not item:
            raise HTTPException(404, "Historical entry not found")

        related_list = []
        if item.related_slugs:
            slug_keys = [s.strip() for s in item.related_slugs.split(",") if s.strip()]
            if slug_keys:
                related_rows = db.execute(
                    select(CulturalItem).where(CulturalItem.slug.in_(slug_keys))
                ).scalars().all()
                related_list = [
                    {
                        "slug": r.slug,
                        "content_type": r.content_type,
                        "title_ta": r.title_ta,
                        "title_en": r.title_en,
                        "category": r.category,
                        "image_url": r.image_url,
                    }
                    for r in related_rows
                ]

        if not related_list:
            sibling_rows = db.execute(
                select(CulturalItem)
                .where(CulturalItem.era == item.era, CulturalItem.slug != slug)
                .limit(4)
            ).scalars().all()
            related_list = [
                {
                    "slug": r.slug,
                    "content_type": r.content_type,
                    "title_ta": r.title_ta,
                    "title_en": r.title_en,
                    "category": r.category,
                    "image_url": r.image_url,
                }
                for r in sibling_rows
            ]

        return {
            "id": item.id,
            "slug": item.slug,
            "content_type": item.content_type,
            "title_ta": item.title_ta,
            "title_en": item.title_en,
            "category": item.category,
            "summary_ta": item.summary_ta,
            "summary_en": item.summary_en,
            "content_ta": item.content_ta,
            "content_en": item.content_en,
            "region": item.region,
            "period": item.period,
            "date_order": item.date_order,
            "date_label": item.date_label,
            "era": item.era,
            "image_url": item.image_url,
            "image_caption": item.image_caption,
            "source_type": item.source_type,
            "source_name": item.source_name,
            "source_url": item.source_url,
            "license": item.license,
            "tags": item.tags,
            "related": related_list,
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"DB offline fallback for /api/history/{slug}: {e}")
        from content.history_seed_data import SEED_HISTORY_ITEMS
        from content.seed_data import SEED_CULTURAL_ITEMS
        all_seed = SEED_HISTORY_ITEMS + SEED_CULTURAL_ITEMS
        match = next((i for i in all_seed if i["slug"] == slug), None)
        if not match:
            raise HTTPException(404, "Historical entry not found")
        siblings = [i for i in SEED_HISTORY_ITEMS if i.get("era") == match.get("era") and i["slug"] != slug][:4]
        return {
            "id": 1,
            "slug": match["slug"],
            "content_type": "history",
            "title_ta": match["title_ta"],
            "title_en": match["title_en"],
            "category": match.get("category", "History"),
            "summary_ta": match["summary_ta"],
            "summary_en": match["summary_en"],
            "content_ta": match["content_ta"],
            "content_en": match["content_en"],
            "region": match.get("region"),
            "period": match.get("period"),
            "date_order": match.get("date_order"),
            "date_label": match.get("date_label"),
            "era": match.get("era"),
            "image_url": match.get("image_url"),
            "image_caption": match.get("image_caption"),
            "source_type": match.get("source_type", "wikidata"),
            "source_name": match.get("source_name", "Ezhuthaani Editorial"),
            "source_url": match.get("source_url"),
            "license": match.get("license", "CC BY-SA 4.0"),
            "tags": match.get("tags"),
            "related": [
                {
                    "slug": r["slug"],
                    "content_type": r.get("content_type", "history"),
                    "title_ta": r["title_ta"],
                    "title_en": r["title_en"],
                    "category": r.get("category", "History"),
                    "image_url": r.get("image_url"),
                }
                for r in siblings
            ],
        }


# ---------------------------------------------------------------- saved history
@app.get("/api/saved/history")
def get_saved_history(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.execute(
        select(SavedHistory).where(SavedHistory.user_id == user.id).order_by(SavedHistory.created_at.desc())
    ).scalars().all()
    return [
        {
            "id": r.id,
            "slug": r.history_slug,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in rows
    ]


@app.post("/api/saved/history")
def save_history(body: SavedHistoryIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not body.slug or not isinstance(body.slug, str):
        raise HTTPException(400, "slug is required")
    existing = db.execute(
        select(SavedHistory).where(SavedHistory.user_id == user.id, SavedHistory.history_slug == body.slug)
    ).scalar_one_or_none()
    if existing:
        return {"ok": True, "id": existing.id, "slug": existing.history_slug, "already_saved": True}
    record = SavedHistory(user_id=user.id, history_slug=body.slug)
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"ok": True, "id": record.id, "slug": record.history_slug, "already_saved": False}


@app.delete("/api/saved/history/{slug}")
def unsave_history(slug: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.execute(
        select(SavedHistory).where(SavedHistory.user_id == user.id, SavedHistory.history_slug == slug)
    ).scalar_one_or_none()
    if existing:
        db.delete(existing)
        db.commit()
    return {"ok": True, "removed": slug}


# ---------------------------------------------------------------- literature
@app.get("/api/literature/categories")
def get_literature_categories(db: Session = Depends(get_db)):
    default_cats = ["Classical", "Epic", "Bhakti", "Ethical literature", "Medieval", "Modern", "Contemporary"]
    try:
        seed_literature_items_if_needed(db)
        rows = db.execute(
            select(CulturalItem.category)
            .where(CulturalItem.content_type == "literature", CulturalItem.category.isnot(None))
            .distinct()
        ).scalars().all()
        db_cats = [r for r in rows if r]
        return list(dict.fromkeys(default_cats + sorted(db_cats)))
    except Exception as e:
        print(f"DB offline fallback for /api/literature/categories: {e}")
        return default_cats


@app.get("/api/literature")
def get_literature_items(
    category: str | None = None,
    period: str | None = None,
    genre: str | None = None,
    q: str | None = None,
    db: Session = Depends(get_db),
):
    try:
        seed_literature_items_if_needed(db)
        stmt = select(CulturalItem).where(CulturalItem.content_type == "literature")
        if category and category.lower() != "all":
            stmt = stmt.where(CulturalItem.category == category)
        if period and period.lower() != "all":
            stmt = stmt.where(CulturalItem.period == period)
        if genre and genre.lower() != "all":
            stmt = stmt.where(CulturalItem.genre == genre)
        if q and q.strip():
            term = f"%{q.strip().lower()}%"
            stmt = stmt.where(
                func.lower(CulturalItem.title_ta).like(term)
                | func.lower(CulturalItem.title_en).like(term)
                | func.lower(CulturalItem.summary_en).like(term)
                | func.lower(CulturalItem.summary_ta).like(term)
                | func.lower(CulturalItem.author).like(term)
                | func.lower(CulturalItem.tags).like(term)
            )
        rows = db.execute(stmt.order_by(CulturalItem.title_en.asc())).scalars().all()
        return [
            {
                "id": r.id,
                "slug": r.slug,
                "content_type": r.content_type,
                "title_ta": r.title_ta,
                "title_en": r.title_en,
                "category": r.category,
                "summary_ta": r.summary_ta,
                "summary_en": r.summary_en,
                "author": r.author,
                "period": r.period,
                "era": r.era,
                "genre": r.genre,
                "literary_tradition": r.literary_tradition,
                "copyright_status": r.copyright_status,
                "external_link": r.external_link,
                "image_url": r.image_url,
                "image_caption": r.image_caption,
                "source_type": r.source_type,
                "source_name": r.source_name,
                "source_url": r.source_url,
                "license": r.license,
            }
            for r in rows
        ]
    except Exception as e:
        print(f"DB offline fallback for /api/literature: {e}")
        from content.literature_seed_data import SEED_LITERATURE_ITEMS
        items = SEED_LITERATURE_ITEMS
        if category and category.lower() != "all":
            items = [i for i in items if i.get("category", "").lower() == category.lower()]
        if period and period.lower() != "all":
            items = [i for i in items if i.get("period", "").lower() == period.lower()]
        if genre and genre.lower() != "all":
            items = [i for i in items if i.get("genre", "").lower() == genre.lower()]
        if q and q.strip():
            t = q.strip().lower()
            items = [
                i for i in items
                if t in i.get("title_ta", "").lower()
                or t in i.get("title_en", "").lower()
                or t in i.get("summary_en", "").lower()
                or t in i.get("summary_ta", "").lower()
                or t in i.get("author", "").lower()
                or t in i.get("tags", "").lower()
            ]
        return [
            {
                "id": idx + 1,
                "slug": item["slug"],
                "content_type": "literature",
                "title_ta": item["title_ta"],
                "title_en": item["title_en"],
                "category": item.get("category", "Classical"),
                "summary_ta": item["summary_ta"],
                "summary_en": item["summary_en"],
                "author": item.get("author"),
                "period": item.get("period"),
                "era": item.get("era"),
                "genre": item.get("genre"),
                "literary_tradition": item.get("literary_tradition"),
                "copyright_status": item.get("copyright_status", "Public Domain"),
                "external_link": item.get("external_link"),
                "image_url": item.get("image_url"),
                "image_caption": item.get("image_caption"),
                "source_type": item.get("source_type", "wikidata"),
                "source_name": item.get("source_name", "Ezhuthaani Editorial"),
                "source_url": item.get("source_url"),
                "license": item.get("license", "Public Domain / CC0"),
            }
            for idx, item in enumerate(items)
        ]


@app.get("/api/literature/{slug}")
def get_literature_detail(slug: str, db: Session = Depends(get_db)):
    try:
        seed_literature_items_if_needed(db)
        item = db.execute(
            select(CulturalItem).where(CulturalItem.slug == slug)
        ).scalar_one_or_none()
        if not item:
            raise HTTPException(404, "Literature item not found")

        related_list = []
        if item.related_slugs:
            slug_keys = [s.strip() for s in item.related_slugs.split(",") if s.strip()]
            if slug_keys:
                related_rows = db.execute(
                    select(CulturalItem).where(CulturalItem.slug.in_(slug_keys))
                ).scalars().all()
                related_list = [
                    {
                        "slug": r.slug,
                        "content_type": r.content_type,
                        "title_ta": r.title_ta,
                        "title_en": r.title_en,
                        "category": r.category,
                        "image_url": r.image_url,
                    }
                    for r in related_rows
                ]

        if not related_list:
            sibling_rows = db.execute(
                select(CulturalItem)
                .where(CulturalItem.category == item.category, CulturalItem.slug != slug)
                .limit(4)
            ).scalars().all()
            related_list = [
                {
                    "slug": r.slug,
                    "content_type": r.content_type,
                    "title_ta": r.title_ta,
                    "title_en": r.title_en,
                    "category": r.category,
                    "image_url": r.image_url,
                }
                for r in sibling_rows
            ]

        return {
            "id": item.id,
            "slug": item.slug,
            "content_type": item.content_type,
            "title_ta": item.title_ta,
            "title_en": item.title_en,
            "category": item.category,
            "summary_ta": item.summary_ta,
            "summary_en": item.summary_en,
            "content_ta": item.content_ta,
            "content_en": item.content_en,
            "author": item.author,
            "region": item.region,
            "period": item.period,
            "era": item.era,
            "genre": item.genre,
            "literary_tradition": item.literary_tradition,
            "copyright_status": item.copyright_status,
            "external_link": item.external_link,
            "image_url": item.image_url,
            "image_caption": item.image_caption,
            "source_type": item.source_type,
            "source_name": item.source_name,
            "source_url": item.source_url,
            "license": item.license,
            "tags": item.tags,
            "related": related_list,
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"DB offline fallback for /api/literature/{slug}: {e}")
        from content.literature_seed_data import SEED_LITERATURE_ITEMS
        from content.history_seed_data import SEED_HISTORY_ITEMS
        from content.knowledge_seed_data import SEED_KNOWLEDGE_ITEMS
        from content.seed_data import SEED_CULTURAL_ITEMS
        all_seed = SEED_LITERATURE_ITEMS + SEED_HISTORY_ITEMS + SEED_KNOWLEDGE_ITEMS + SEED_CULTURAL_ITEMS
        match = next((i for i in all_seed if i["slug"] == slug), None)
        if not match:
            raise HTTPException(404, "Literature item not found")
        siblings = [i for i in SEED_LITERATURE_ITEMS if i.get("category") == match.get("category") and i["slug"] != slug][:4]
        return {
            "id": 1,
            "slug": match["slug"],
            "content_type": "literature",
            "title_ta": match["title_ta"],
            "title_en": match["title_en"],
            "category": match.get("category", "Classical"),
            "summary_ta": match["summary_ta"],
            "summary_en": match["summary_en"],
            "content_ta": match["content_ta"],
            "content_en": match["content_en"],
            "author": match.get("author"),
            "region": match.get("region"),
            "period": match.get("period"),
            "era": match.get("era"),
            "genre": match.get("genre"),
            "literary_tradition": match.get("literary_tradition"),
            "copyright_status": match.get("copyright_status", "Public Domain"),
            "external_link": match.get("external_link"),
            "image_url": match.get("image_url"),
            "image_caption": match.get("image_caption"),
            "source_type": match.get("source_type", "wikidata"),
            "source_name": match.get("source_name", "Ezhuthaani Editorial"),
            "source_url": match.get("source_url"),
            "license": match.get("license", "Public Domain / CC0"),
            "tags": match.get("tags"),
            "related": [
                {
                    "slug": r["slug"],
                    "content_type": r.get("content_type", "literature"),
                    "title_ta": r["title_ta"],
                    "title_en": r["title_en"],
                    "category": r.get("category", "Classical"),
                    "image_url": r.get("image_url"),
                }
                for r in siblings
            ],
        }


# ---------------------------------------------------------------- saved literature
@app.get("/api/saved/literature")
def get_saved_literature(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.execute(
        select(SavedLiterature).where(SavedLiterature.user_id == user.id).order_by(SavedLiterature.created_at.desc())
    ).scalars().all()
    return [
        {
            "id": r.id,
            "slug": r.literature_slug,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in rows
    ]


@app.post("/api/saved/literature")
def save_literature(body: SavedLiteratureIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not body.slug or not isinstance(body.slug, str):
        raise HTTPException(400, "slug is required")
    existing = db.execute(
        select(SavedLiterature).where(SavedLiterature.user_id == user.id, SavedLiterature.literature_slug == body.slug)
    ).scalar_one_or_none()
    if existing:
        return {"ok": True, "id": existing.id, "slug": existing.literature_slug, "already_saved": True}
    record = SavedLiterature(user_id=user.id, literature_slug=body.slug)
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"ok": True, "id": record.id, "slug": record.literature_slug, "already_saved": False}


@app.delete("/api/saved/literature/{slug}")
def unsave_literature(slug: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.execute(
        select(SavedLiterature).where(SavedLiterature.user_id == user.id, SavedLiterature.literature_slug == slug)
    ).scalar_one_or_none()
    if existing:
        db.delete(existing)
        db.commit()
    return {"ok": True, "removed": slug}


# ---------------------------------------------------------------- knowledge
@app.get("/api/knowledge/categories")
def get_knowledge_categories(db: Session = Depends(get_db)):
    default_cats = [
        "Language",
        "Grammar",
        "Literature",
        "History",
        "Culture",
        "Food",
        "Festivals",
        "Architecture",
        "Traditions",
        "People",
        "Places",
        "Regional Practices",
    ]
    try:
        seed_knowledge_items_if_needed(db)
        rows = db.execute(
            select(CulturalItem.category)
            .where(CulturalItem.content_type == "article", CulturalItem.category.isnot(None))
            .distinct()
        ).scalars().all()
        db_cats = [r for r in rows if r]
        return list(dict.fromkeys(default_cats + sorted(db_cats)))
    except Exception as e:
        print(f"DB offline fallback for /api/knowledge/categories: {e}")
        return default_cats


@app.get("/api/knowledge")
def get_knowledge_items(category: str | None = None, q: str | None = None, db: Session = Depends(get_db)):
    try:
        seed_knowledge_items_if_needed(db)
        stmt = select(CulturalItem).where(CulturalItem.content_type == "article")
        if category and category.lower() != "all":
            stmt = stmt.where(CulturalItem.category == category)
        if q and q.strip():
            term = f"%{q.strip().lower()}%"
            stmt = stmt.where(
                func.lower(CulturalItem.title_ta).like(term)
                | func.lower(CulturalItem.title_en).like(term)
                | func.lower(CulturalItem.summary_en).like(term)
                | func.lower(CulturalItem.summary_ta).like(term)
                | func.lower(CulturalItem.tags).like(term)
            )
        rows = db.execute(stmt.order_by(CulturalItem.title_en.asc())).scalars().all()
        return [
            {
                "id": r.id,
                "slug": r.slug,
                "content_type": r.content_type,
                "title_ta": r.title_ta,
                "title_en": r.title_en,
                "category": r.category,
                "summary_ta": r.summary_ta,
                "summary_en": r.summary_en,
                "period": r.period,
                "era": r.era,
                "image_url": r.image_url,
                "image_caption": r.image_caption,
                "source_type": r.source_type,
                "source_name": r.source_name,
                "source_url": r.source_url,
                "license": r.license,
            }
            for r in rows
        ]
    except Exception as e:
        print(f"DB offline fallback for /api/knowledge: {e}")
        from content.knowledge_seed_data import SEED_KNOWLEDGE_ITEMS
        items = SEED_KNOWLEDGE_ITEMS
        if category and category.lower() != "all":
            items = [i for i in items if i.get("category", "").lower() == category.lower()]
        if q and q.strip():
            t = q.strip().lower()
            items = [
                i for i in items
                if t in i.get("title_ta", "").lower()
                or t in i.get("title_en", "").lower()
                or t in i.get("summary_en", "").lower()
                or t in i.get("summary_ta", "").lower()
                or t in i.get("tags", "").lower()
            ]
        return [
            {
                "id": idx + 1,
                "slug": item["slug"],
                "content_type": "article",
                "title_ta": item["title_ta"],
                "title_en": item["title_en"],
                "category": item.get("category", "Language"),
                "summary_ta": item["summary_ta"],
                "summary_en": item["summary_en"],
                "period": item.get("period"),
                "era": item.get("era"),
                "image_url": item.get("image_url"),
                "image_caption": item.get("image_caption"),
                "source_type": item.get("source_type", "wikidata"),
                "source_name": item.get("source_name", "Ezhuthaani Editorial"),
                "source_url": item.get("source_url"),
                "license": item.get("license", "CC BY-SA 4.0"),
            }
            for idx, item in enumerate(items)
        ]


@app.get("/api/knowledge/{slug}")
def get_knowledge_detail(slug: str, db: Session = Depends(get_db)):
    try:
        seed_knowledge_items_if_needed(db)
        item = db.execute(
            select(CulturalItem).where(CulturalItem.slug == slug)
        ).scalar_one_or_none()
        if not item:
            raise HTTPException(404, "Knowledge article not found")

        related_list = []
        if item.related_slugs:
            slug_keys = [s.strip() for s in item.related_slugs.split(",") if s.strip()]
            if slug_keys:
                related_rows = db.execute(
                    select(CulturalItem).where(CulturalItem.slug.in_(slug_keys))
                ).scalars().all()
                related_list = [
                    {
                        "slug": r.slug,
                        "content_type": r.content_type,
                        "title_ta": r.title_ta,
                        "title_en": r.title_en,
                        "category": r.category,
                        "image_url": r.image_url,
                    }
                    for r in related_rows
                ]

        if not related_list:
            sibling_rows = db.execute(
                select(CulturalItem)
                .where(CulturalItem.category == item.category, CulturalItem.slug != slug)
                .limit(4)
            ).scalars().all()
            related_list = [
                {
                    "slug": r.slug,
                    "content_type": r.content_type,
                    "title_ta": r.title_ta,
                    "title_en": r.title_en,
                    "category": r.category,
                    "image_url": r.image_url,
                }
                for r in sibling_rows
            ]

        return {
            "id": item.id,
            "slug": item.slug,
            "content_type": item.content_type,
            "title_ta": item.title_ta,
            "title_en": item.title_en,
            "category": item.category,
            "summary_ta": item.summary_ta,
            "summary_en": item.summary_en,
            "content_ta": item.content_ta,
            "content_en": item.content_en,
            "region": item.region,
            "period": item.period,
            "era": item.era,
            "image_url": item.image_url,
            "image_caption": item.image_caption,
            "source_type": item.source_type,
            "source_name": item.source_name,
            "source_url": item.source_url,
            "license": item.license,
            "tags": item.tags,
            "related": related_list,
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"DB offline fallback for /api/knowledge/{slug}: {e}")
        from content.knowledge_seed_data import SEED_KNOWLEDGE_ITEMS
        from content.literature_seed_data import SEED_LITERATURE_ITEMS
        from content.history_seed_data import SEED_HISTORY_ITEMS
        from content.seed_data import SEED_CULTURAL_ITEMS
        all_seed = SEED_KNOWLEDGE_ITEMS + SEED_LITERATURE_ITEMS + SEED_HISTORY_ITEMS + SEED_CULTURAL_ITEMS
        match = next((i for i in all_seed if i["slug"] == slug), None)
        if not match:
            raise HTTPException(404, "Knowledge article not found")
        siblings = [i for i in SEED_KNOWLEDGE_ITEMS if i.get("category") == match.get("category") and i["slug"] != slug][:4]
        return {
            "id": 1,
            "slug": match["slug"],
            "content_type": "article",
            "title_ta": match["title_ta"],
            "title_en": match["title_en"],
            "category": match.get("category", "Language"),
            "summary_ta": match["summary_ta"],
            "summary_en": match["summary_en"],
            "content_ta": match["content_ta"],
            "content_en": match["content_en"],
            "region": match.get("region"),
            "period": match.get("period"),
            "era": match.get("era"),
            "image_url": match.get("image_url"),
            "image_caption": match.get("image_caption"),
            "source_type": match.get("source_type", "wikidata"),
            "source_name": match.get("source_name", "Ezhuthaani Editorial"),
            "source_url": match.get("source_url"),
            "license": match.get("license", "CC BY-SA 4.0"),
            "tags": match.get("tags"),
            "related": [
                {
                    "slug": r["slug"],
                    "content_type": r.get("content_type", "article"),
                    "title_ta": r["title_ta"],
                    "title_en": r["title_en"],
                    "category": r.get("category", "Language"),
                    "image_url": r.get("image_url"),
                }
                for r in siblings
            ],
        }


# ---------------------------------------------------------------- saved knowledge
@app.get("/api/saved/knowledge")
def get_saved_knowledge(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.execute(
        select(SavedKnowledge).where(SavedKnowledge.user_id == user.id).order_by(SavedKnowledge.created_at.desc())
    ).scalars().all()
    return [
        {
            "id": r.id,
            "slug": r.knowledge_slug,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in rows
    ]


@app.post("/api/saved/knowledge")
def save_knowledge(body: SavedKnowledgeIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not body.slug or not isinstance(body.slug, str):
        raise HTTPException(400, "slug is required")
    existing = db.execute(
        select(SavedKnowledge).where(SavedKnowledge.user_id == user.id, SavedKnowledge.knowledge_slug == body.slug)
    ).scalar_one_or_none()
    if existing:
        return {"ok": True, "id": existing.id, "slug": existing.knowledge_slug, "already_saved": True}
    record = SavedKnowledge(user_id=user.id, knowledge_slug=body.slug)
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"ok": True, "id": record.id, "slug": record.knowledge_slug, "already_saved": False}


@app.delete("/api/saved/knowledge/{slug}")
def unsave_knowledge(slug: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.execute(
        select(SavedKnowledge).where(SavedKnowledge.user_id == user.id, SavedKnowledge.knowledge_slug == slug)
    ).scalar_one_or_none()
    if existing:
        db.delete(existing)
        db.commit()
    return {"ok": True, "removed": slug}


# ---------------------------------------------------------------- script history
@app.get("/api/script-history")
def get_script_history_items(db: Session = Depends(get_db)):
    try:
        from content.script_history_enriched_data import SCRIPT_HISTORY_PHASES
        return [
            {
                "id": idx + 1,
                "slug": phase["slug"],
                "phase_number": phase.get("phase_number", idx + 1),
                "content_type": "script_history",
                "title_ta": phase["title_ta"],
                "title_en": phase["title_en"],
                "category": "Script History",
                "summary_ta": phase.get("short_intro_ta", ""),
                "summary_en": phase.get("short_intro_en", ""),
                "period": phase.get("period_en", ""),
                "era": phase.get("script_name_en", ""),
                "region": phase.get("where_used_en", ""),
                "script": phase.get("script_name_en", ""),
                "script_language": "Tamil",
                "historical_significance": phase.get("historical_significance_en", ""),
                "image_url": phase.get("image", {}).get("url") if isinstance(phase.get("image"), dict) else None,
            }
            for idx, phase in enumerate(SCRIPT_HISTORY_PHASES)
        ]
    except Exception as e:
        print(f"Fallback for /api/script-history: {e}")
        from content.script_history_seed_data import SEED_SCRIPT_HISTORY_ITEMS
        return [
            {
                "id": idx + 1,
                "slug": item["slug"],
                "content_type": "script_history",
                "title_ta": item["title_ta"],
                "title_en": item["title_en"],
                "category": item.get("category", "Script History"),
                "summary_ta": item["summary_ta"],
                "summary_en": item["summary_en"],
                "period": item.get("period"),
                "era": item.get("era"),
                "region": item.get("region"),
                "script": item.get("script"),
                "script_language": item.get("script_language"),
                "historical_significance": item.get("historical_significance"),
                "image_url": item.get("image_url"),
            }
            for idx, item in enumerate(SEED_SCRIPT_HISTORY_ITEMS)
        ]


@app.get("/api/script-history/quiz")
def get_script_history_quiz():
    from content.script_history_quiz_data import SCRIPT_HISTORY_QUIZ
    return SCRIPT_HISTORY_QUIZ


@app.get("/api/script-history/{slug}")
def get_script_history_detail(slug: str, db: Session = Depends(get_db)):
    from content.script_history_enriched_data import SCRIPT_HISTORY_PHASES
    from content.script_history_seed_data import SEED_SCRIPT_HISTORY_ITEMS

    # Standardize slug lookup across both enriched and seed data
    clean_slug = slug.replace("-phase", "")
    match_enriched = next(
        (p for p in SCRIPT_HISTORY_PHASES if p["slug"] == clean_slug or p["slug"] == slug), None
    )
    match_seed = next(
        (i for i in SEED_SCRIPT_HISTORY_ITEMS if i["slug"] == slug or i["slug"].replace("-phase", "") == clean_slug), None
    )

    if match_enriched:
        res = dict(match_enriched)
        res["content_type"] = "script_history"
        res["category"] = "Script History"
        res["content_en"] = match_enriched.get("overview_en", "") + "\n\n" + match_enriched.get("historical_context_en", "")
        res["content_ta"] = match_enriched.get("overview_ta", "") + "\n\n" + match_enriched.get("historical_context_ta", "")
        res["summary_en"] = match_enriched.get("short_intro_en", "")
        res["summary_ta"] = match_enriched.get("short_intro_ta", "")
        res["period"] = match_enriched.get("period_en", "")
        res["image_url"] = match_enriched.get("image", {}).get("url") if isinstance(match_enriched.get("image"), dict) else None
        res["related"] = []
        return res

    if match_seed:
        res = dict(match_seed)
        res["related"] = []
        return res

    raise HTTPException(404, "Script history phase not found")


@app.get("/api/saved/script-history")
def get_saved_script_history(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.execute(
        select(SavedScriptHistory).where(SavedScriptHistory.user_id == user.id).order_by(SavedScriptHistory.created_at.desc())
    ).scalars().all()
    return [
        {
            "id": r.id,
            "slug": r.script_history_slug,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in rows
    ]


@app.post("/api/saved/script-history")
def save_script_history(body: SavedScriptHistoryIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not body.slug or not isinstance(body.slug, str):
        raise HTTPException(400, "slug is required")
    existing = db.execute(
        select(SavedScriptHistory).where(SavedScriptHistory.user_id == user.id, SavedScriptHistory.script_history_slug == body.slug)
    ).scalar_one_or_none()
    if existing:
        return {"ok": True, "id": existing.id, "slug": existing.script_history_slug, "already_saved": True}
    record = SavedScriptHistory(user_id=user.id, script_history_slug=body.slug)
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"ok": True, "id": record.id, "slug": record.script_history_slug, "already_saved": False}


@app.delete("/api/saved/script-history/{slug}")
def unsave_script_history(slug: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.execute(
        select(SavedScriptHistory).where(SavedScriptHistory.user_id == user.id, SavedScriptHistory.script_history_slug == slug)
    ).scalar_one_or_none()
    if existing:
        db.delete(existing)
        db.commit()
    return {"ok": True, "removed": slug}


# ---------------------------------------------------------------- inscriptions
@app.get("/api/inscriptions/periods")
def get_inscription_periods(db: Session = Depends(get_db)):
    try:
        seed_inscription_items_if_needed(db)
        rows = db.execute(
            select(CulturalItem.era)
            .where(CulturalItem.content_type == "inscription", CulturalItem.era.isnot(None))
            .distinct()
        ).scalars().all()
        db_eras = sorted([r for r in rows if r])
        if db_eras:
            return db_eras
        from content.inscriptions_seed_data import SEED_INSCRIPTION_ITEMS
        return sorted(list({item["era"] for item in SEED_INSCRIPTION_ITEMS if item.get("era")}))
    except Exception as e:
        print(f"DB offline fallback for /api/inscriptions/periods: {e}")
        from content.inscriptions_seed_data import SEED_INSCRIPTION_ITEMS
        return sorted(list({item["era"] for item in SEED_INSCRIPTION_ITEMS if item.get("era")}))


@app.get("/api/inscriptions")
def get_inscription_items(period: str | None = None, script: str | None = None, q: str | None = None, db: Session = Depends(get_db)):
    try:
        seed_inscription_items_if_needed(db)
        stmt = select(CulturalItem).where(CulturalItem.content_type == "inscription")
        if period and period.lower() != "all":
            stmt = stmt.where(CulturalItem.era == period)
        if script and script.lower() != "all":
            stmt = stmt.where(CulturalItem.script == script)
        if q and q.strip():
            term = f"%{q.strip().lower()}%"
            stmt = stmt.where(
                func.lower(CulturalItem.title_ta).like(term)
                | func.lower(CulturalItem.title_en).like(term)
                | func.lower(CulturalItem.summary_en).like(term)
                | func.lower(CulturalItem.summary_ta).like(term)
                | func.lower(CulturalItem.location_name).like(term)
                | func.lower(CulturalItem.tags).like(term)
            )
        rows = db.execute(stmt.order_by(CulturalItem.title_en.asc())).scalars().all()
        return [
            {
                "id": r.id,
                "slug": r.slug,
                "content_type": r.content_type,
                "title_ta": r.title_ta,
                "title_en": r.title_en,
                "category": r.category,
                "summary_ta": r.summary_ta,
                "summary_en": r.summary_en,
                "period": r.period,
                "era": r.era,
                "region": r.region,
                "location_name": r.location_name,
                "latitude": r.latitude,
                "longitude": r.longitude,
                "script": r.script,
                "script_language": r.script_language,
                "historical_significance": r.historical_significance,
                "image_url": r.image_url,
                "image_caption": r.image_caption,
                "source_type": r.source_type,
                "source_name": r.source_name,
                "source_url": r.source_url,
                "license": r.license,
            }
            for r in rows
        ]
    except Exception as e:
        print(f"DB offline fallback for /api/inscriptions: {e}")
        from content.inscriptions_seed_data import SEED_INSCRIPTION_ITEMS
        items = SEED_INSCRIPTION_ITEMS
        if period and period.lower() != "all":
            items = [i for i in items if i.get("era", "").lower() == period.lower()]
        if script and script.lower() != "all":
            items = [i for i in items if i.get("script", "").lower() == script.lower()]
        if q and q.strip():
            t = q.strip().lower()
            items = [
                i for i in items
                if t in i.get("title_ta", "").lower()
                or t in i.get("title_en", "").lower()
                or t in i.get("summary_en", "").lower()
                or t in i.get("summary_ta", "").lower()
                or t in i.get("location_name", "").lower()
                or t in i.get("tags", "").lower()
            ]
        return [
            {
                "id": idx + 1,
                "slug": item["slug"],
                "content_type": "inscription",
                "title_ta": item["title_ta"],
                "title_en": item["title_en"],
                "category": item.get("category", "Inscriptions"),
                "summary_ta": item["summary_ta"],
                "summary_en": item["summary_en"],
                "period": item.get("period"),
                "era": item.get("era"),
                "region": item.get("region"),
                "location_name": item.get("location_name"),
                "latitude": item.get("latitude"),
                "longitude": item.get("longitude"),
                "script": item.get("script"),
                "script_language": item.get("script_language"),
                "historical_significance": item.get("historical_significance"),
                "image_url": item.get("image_url"),
                "image_caption": item.get("image_caption"),
                "source_type": item.get("source_type", "wikidata"),
                "source_name": item.get("source_name", "Ezhuthaani Editorial"),
                "source_url": item.get("source_url"),
                "license": item.get("license", "CC BY-SA 4.0"),
            }
            for idx, item in enumerate(items)
        ]


@app.get("/api/inscriptions/{slug}")
def get_inscription_detail(slug: str, db: Session = Depends(get_db)):
    try:
        seed_inscription_items_if_needed(db)
        item = db.execute(
            select(CulturalItem).where(CulturalItem.slug == slug)
        ).scalar_one_or_none()
        if not item:
            raise HTTPException(404, "Inscription not found")

        related_list = []
        if item.related_slugs:
            slug_keys = [s.strip() for s in item.related_slugs.split(",") if s.strip()]
            if slug_keys:
                related_rows = db.execute(
                    select(CulturalItem).where(CulturalItem.slug.in_(slug_keys))
                ).scalars().all()
                related_list = [
                    {
                        "slug": r.slug,
                        "content_type": r.content_type,
                        "title_ta": r.title_ta,
                        "title_en": r.title_en,
                        "category": r.category,
                        "image_url": r.image_url,
                    }
                    for r in related_rows
                ]

        if not related_list:
            sibling_rows = db.execute(
                select(CulturalItem)
                .where(CulturalItem.category == item.category, CulturalItem.slug != slug)
                .limit(4)
            ).scalars().all()
            related_list = [
                {
                    "slug": r.slug,
                    "content_type": r.content_type,
                    "title_ta": r.title_ta,
                    "title_en": r.title_en,
                    "category": r.category,
                    "image_url": r.image_url,
                }
                for r in sibling_rows
            ]

        return {
            "id": item.id,
            "slug": item.slug,
            "content_type": item.content_type,
            "title_ta": item.title_ta,
            "title_en": item.title_en,
            "category": item.category,
            "summary_ta": item.summary_ta,
            "summary_en": item.summary_en,
            "content_ta": item.content_ta,
            "content_en": item.content_en,
            "period": item.period,
            "era": item.era,
            "region": item.region,
            "location_name": item.location_name,
            "latitude": item.latitude,
            "longitude": item.longitude,
            "script": item.script,
            "script_language": item.script_language,
            "historical_significance": item.historical_significance,
            "image_url": item.image_url,
            "image_caption": item.image_caption,
            "source_type": item.source_type,
            "source_name": item.source_name,
            "source_url": item.source_url,
            "license": item.license,
            "tags": item.tags,
            "related": related_list,
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"DB offline fallback for /api/inscriptions/{slug}: {e}")
        from content.inscriptions_seed_data import SEED_INSCRIPTION_ITEMS
        match = next((i for i in SEED_INSCRIPTION_ITEMS if i["slug"] == slug), None)
        if not match:
            raise HTTPException(404, "Inscription not found")
        siblings = [i for i in SEED_INSCRIPTION_ITEMS if i["slug"] != slug][:4]
        return {
            "id": 1,
            "slug": match["slug"],
            "content_type": "inscription",
            "title_ta": match["title_ta"],
            "title_en": match["title_en"],
            "category": match.get("category", "Inscriptions"),
            "summary_ta": match["summary_ta"],
            "summary_en": match["summary_en"],
            "content_ta": match["content_ta"],
            "content_en": match["content_en"],
            "period": match.get("period"),
            "era": match.get("era"),
            "region": match.get("region"),
            "location_name": match.get("location_name"),
            "latitude": match.get("latitude"),
            "longitude": match.get("longitude"),
            "script": match.get("script"),
            "script_language": match.get("script_language"),
            "historical_significance": match.get("historical_significance"),
            "image_url": match.get("image_url"),
            "image_caption": match.get("image_caption"),
            "source_type": match.get("source_type", "wikidata"),
            "source_name": match.get("source_name", "Ezhuthaani Editorial"),
            "source_url": match.get("source_url"),
            "license": match.get("license", "CC BY-SA 4.0"),
            "tags": match.get("tags"),
            "related": [
                {
                    "slug": r["slug"],
                    "content_type": r.get("content_type", "inscription"),
                    "title_ta": r["title_ta"],
                    "title_en": r["title_en"],
                    "category": r.get("category", "Inscriptions"),
                    "image_url": r.get("image_url"),
                }
                for r in siblings
            ],
        }


@app.get("/api/saved/inscriptions")
def get_saved_inscriptions(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.execute(
        select(SavedInscription).where(SavedInscription.user_id == user.id).order_by(SavedInscription.created_at.desc())
    ).scalars().all()
    return [
        {
            "id": r.id,
            "slug": r.inscription_slug,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in rows
    ]


@app.post("/api/saved/inscriptions")
def save_inscription(body: SavedInscriptionIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not body.slug or not isinstance(body.slug, str):
        raise HTTPException(400, "slug is required")
    existing = db.execute(
        select(SavedInscription).where(SavedInscription.user_id == user.id, SavedInscription.inscription_slug == body.slug)
    ).scalar_one_or_none()
    if existing:
        return {"ok": True, "id": existing.id, "slug": existing.inscription_slug, "already_saved": True}
    record = SavedInscription(user_id=user.id, inscription_slug=body.slug)
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"ok": True, "id": record.id, "slug": record.inscription_slug, "already_saved": False}


@app.delete("/api/saved/inscriptions/{slug}")
def unsave_inscription(slug: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.execute(
        select(SavedInscription).where(SavedInscription.user_id == user.id, SavedInscription.inscription_slug == slug)
    ).scalar_one_or_none()
    if existing:
        db.delete(existing)
        db.commit()
    return {"ok": True, "removed": slug}


# ---------------------------------------------------------------- map explorer
@app.get("/api/map/locations")
def get_map_locations(content_type: str | None = None, db: Session = Depends(get_db)):
    try:
        seed_inscription_items_if_needed(db)
        seed_script_history_items_if_needed(db)
        seed_cultural_items_if_needed(db)
        seed_history_items_if_needed(db)
        stmt = select(CulturalItem).where(
            CulturalItem.latitude.isnot(None),
            CulturalItem.longitude.isnot(None)
        )
        if content_type and content_type.lower() != "all":
            stmt = stmt.where(CulturalItem.content_type == content_type)
        rows = db.execute(stmt.order_by(CulturalItem.title_en.asc())).scalars().all()
        return [
            {
                "id": r.id,
                "slug": r.slug,
                "content_type": r.content_type,
                "title_ta": r.title_ta,
                "title_en": r.title_en,
                "category": r.category,
                "summary_ta": r.summary_ta,
                "summary_en": r.summary_en,
                "period": r.period,
                "era": r.era,
                "script": r.script,
                "region": r.region,
                "location_name": r.location_name,
                "latitude": r.latitude,
                "longitude": r.longitude,
                "image_url": r.image_url,
                "source_name": r.source_name,
            }
            for r in rows
        ]
    except Exception as e:
        print(f"DB offline fallback for /api/map/locations: {e}")
        from content.inscriptions_seed_data import SEED_INSCRIPTION_ITEMS
        from content.history_seed_data import SEED_HISTORY_ITEMS
        from content.seed_data import SEED_CULTURAL_ITEMS
        all_items = SEED_INSCRIPTION_ITEMS + SEED_HISTORY_ITEMS + SEED_CULTURAL_ITEMS
        with_coords = [i for i in all_items if i.get("latitude") is not None and i.get("longitude") is not None]
        if content_type and content_type.lower() != "all":
            with_coords = [i for i in with_coords if i.get("content_type") == content_type]
        return [
            {
                "id": idx + 1,
                "slug": item["slug"],
                "content_type": item.get("content_type", "inscription"),
                "title_ta": item["title_ta"],
                "title_en": item["title_en"],
                "category": item.get("category", "Inscriptions"),
                "summary_ta": item["summary_ta"],
                "summary_en": item["summary_en"],
                "period": item.get("period"),
                "era": item.get("era"),
                "script": item.get("script"),
                "region": item.get("region"),
                "location_name": item.get("location_name"),
                "latitude": item.get("latitude"),
                "longitude": item.get("longitude"),
                "image_url": item.get("image_url"),
                "source_name": item.get("source_name", "Ezhuthaani Editorial"),
            }
            for idx, item in enumerate(with_coords)
        ]


# ---------------------------------------------------------------- Thirukkural Engine
THIRUKKURAL_PATH = Path(__file__).parent / "content" / "thirukkural.json"
THIRUKKURAL_ITEMS: list[dict] = []
if THIRUKKURAL_PATH.exists():
    try:
        raw_kural_data = json.loads(THIRUKKURAL_PATH.read_text(encoding="utf-8"))
        THIRUKKURAL_ITEMS = raw_kural_data.get("kural", [])
        print(f"[Thirukkural] Successfully loaded {len(THIRUKKURAL_ITEMS)} Kurals.")
    except Exception as e:
        print(f"[Thirukkural] Warning: Could not parse thirukkural.json: {e}")


def get_kural_of_the_day(today_date: date) -> dict | None:
    if not THIRUKKURAL_ITEMS:
        return None
    idx = (today_date.toordinal()) % len(THIRUKKURAL_ITEMS)
    return THIRUKKURAL_ITEMS[idx]


def build_daily_kural_response(db: Session, user: User, today_date: date) -> dict | None:
    kural = get_kural_of_the_day(today_date)
    if not kural:
        return None

    kural_num = kural.get("Number", 1)

    read_key = f"daily_kural_read:{today_date.isoformat()}"
    read_progress = db.execute(
        select(Progress).where(Progress.user_id == user.id, Progress.item_id == read_key)
    ).scalar_one_or_none()
    is_read = read_progress is not None and read_progress.score >= 100

    reflection_note = db.execute(
        select(Note).where(
            Note.user_id == user.id,
            Note.content_type == "thirukkural_reflection",
            Note.content_id == f"kural:{kural_num}",
        )
    ).scalar_one_or_none()

    reflection_data = None
    if reflection_note:
        reflection_data = {
            "id": reflection_note.id,
            "body": reflection_note.body,
            "updated_at": reflection_note.updated_at.isoformat() if reflection_note.updated_at else None,
        }

    return {
        "number": kural_num,
        "line1": kural.get("Line1", ""),
        "line2": kural.get("Line2", ""),
        "translation": kural.get("Translation", ""),
        "couplet": kural.get("couplet", ""),
        "explanation": kural.get("explanation", ""),
        "mv": kural.get("mv", ""),
        "sp": kural.get("sp", ""),
        "mk": kural.get("mk", ""),
        "transliteration1": kural.get("transliteration1", ""),
        "transliteration2": kural.get("transliteration2", ""),
        "read": is_read,
        "reflection": reflection_data,
    }


# ---------------------------------------------------------------- Daily Missions Engine

def generate_daily_missions_if_needed(db: Session, user: User, today_date: date) -> list[DailyMission]:
    """Generate deterministic set of 4 daily missions for (user.id, today_date) if not already created."""
    existing = db.execute(
        select(DailyMission).where(DailyMission.user_id == user.id, DailyMission.mission_date == today_date)
    ).scalars().all()
    
    if existing and len(existing) >= 4:
        return existing

    mission_templates = [
        {
            "mission_type": "lesson",
            "target_id": "any_lesson",
            "target_value": 1,
            "title": "Complete a Tamil Lesson",
            "description": "Finish 1 lesson from your current stage in Journey.",
            "xp_reward": 20,
        },
        {
            "mission_type": "vocabulary",
            "target_id": "word_practice",
            "target_value": 3,
            "title": "Practice 3 Vocabulary Words",
            "description": "Construct or guess 3 words in Word Builder or Hangman.",
            "xp_reward": 15,
        },
        {
            "mission_type": "writing",
            "target_id": "writing_reading",
            "target_value": 1,
            "title": "Complete Writing or Reading Activity",
            "description": "Practice character tracing or complete a reading passage.",
            "xp_reward": 20,
        },
        {
            "mission_type": "quiz",
            "target_id": "stage_quiz",
            "target_value": 1,
            "title": "Pass a Stage Milestone Quiz",
            "description": "Score 70%+ on any stage quiz to test your mastery.",
            "xp_reward": 30,
        },
    ]

    for tmpl in mission_templates:
        existing_m = db.execute(
            select(DailyMission).where(
                DailyMission.user_id == user.id,
                DailyMission.mission_date == today_date,
                DailyMission.mission_type == tmpl["mission_type"],
                DailyMission.target_id == tmpl["target_id"],
            )
        ).scalar_one_or_none()

        if not existing_m:
            m = DailyMission(
                user_id=user.id,
                mission_date=today_date,
                mission_type=tmpl["mission_type"],
                target_id=tmpl["target_id"],
                target_value=tmpl["target_value"],
                title=tmpl["title"],
                description=tmpl["description"],
                xp_reward=tmpl["xp_reward"],
                progress=0,
                completed=False,
            )
            db.add(m)

    db.commit()

    return db.execute(
        select(DailyMission)
        .where(DailyMission.user_id == user.id, DailyMission.mission_date == today_date)
        .order_by(DailyMission.id)
    ).scalars().all()


def evaluate_daily_missions(db: Session, user: User, today_date: date) -> dict:
    """Evaluates mission progress, awards mission XP atomically once, awards daily bonus + streak if complete."""
    missions = generate_daily_missions_if_needed(db, user, today_date)

    progress_rows = db.execute(select(Progress).where(Progress.user_id == user.id)).scalars().all()
    lesson_progress = [p for p in progress_rows if not p.item_id.startswith("quiz:")]
    quiz_progress = [p for p in progress_rows if p.item_id.startswith("quiz:") and p.score >= 70]
    saved_words_count = db.execute(select(func.count(SavedWord.id)).where(SavedWord.user_id == user.id)).scalar() or 0

    xp_gained_now = 0

    for m in missions:
        if m.completed:
            continue

        if m.mission_type == "lesson":
            m.progress = min(len(lesson_progress), m.target_value)
        elif m.mission_type == "quiz":
            m.progress = min(len(quiz_progress), m.target_value)
        elif m.mission_type == "writing":
            m.progress = min(len(lesson_progress), m.target_value)
        elif m.mission_type == "vocabulary":
            if saved_words_count > 0 and m.progress < m.target_value:
                m.progress = min(max(m.progress, saved_words_count), m.target_value)

        # Transition to completed & award XP exactly ONCE
        if m.progress >= m.target_value and not m.completed:
            m.completed = True
            m.completed_at = datetime.now(timezone.utc)
            user.xp += m.xp_reward
            xp_gained_now += m.xp_reward

    # Check if all 4 missions are completed for Daily Bonus + Streak advancement
    all_completed = all(m.completed for m in missions)
    daily_bonus_key = f"daily_bonus:{today_date.isoformat()}"
    existing_bonus = db.execute(
        select(Progress).where(Progress.user_id == user.id, Progress.item_id == daily_bonus_key)
    ).scalar_one_or_none()

    daily_bonus_claimed = existing_bonus is not None and existing_bonus.score >= 100

    if all_completed and not daily_bonus_claimed:
        bonus_progress = Progress(user_id=user.id, item_id=daily_bonus_key, score=100)
        db.add(bonus_progress)
        user.xp += 20
        xp_gained_now += 20
        apply_streak(user)
        daily_bonus_claimed = True

    db.commit()
    db.refresh(user)

    completed_count = sum(1 for m in missions if m.completed)
    total_xp_earned = sum(m.xp_reward for m in missions if m.completed) + (20 if daily_bonus_claimed else 0)

    action_urls = {
        "lesson": "/journey",
        "vocabulary": "/word-builder",
        "writing": "/script",
        "quiz": "/journey",
    }

    return {
        "date": today_date.isoformat(),
        "progress": {
            "completed": completed_count,
            "total": len(missions),
            "xp_earned": total_xp_earned,
            "xp_gained_now": xp_gained_now,
        },
        "streak": {
            "current": user.streak,
            "best": user.best_streak,
        },
        "missions": [
            {
                "id": m.id,
                "type": m.mission_type,
                "title": m.title,
                "description": m.description,
                "target_id": m.target_id,
                "progress": m.progress,
                "target": m.target_value,
                "completed": m.completed,
                "completed_at": m.completed_at.isoformat() if m.completed_at else None,
                "xp_reward": m.xp_reward,
                "action_url": action_urls.get(m.mission_type, "/journey"),
            }
            for m in missions
        ],
        "daily_bonus": {
            "xp_reward": 20,
            "completed": daily_bonus_claimed,
        },
        "daily_kural": build_daily_kural_response(db, user, today_date),
    }


class DailyProgressIn(BaseModel):
    mission_type: str = "vocabulary"
    increment: int = 1


@app.get("/api/daily")
def get_daily_dashboard(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    today_date = date.today()
    return evaluate_daily_missions(db, user, today_date)


@app.post("/api/daily/progress")
def update_daily_progress(
    body: DailyProgressIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    today_date = date.today()
    missions = generate_daily_missions_if_needed(db, user, today_date)

    target_m = next((m for m in missions if m.mission_type == body.mission_type and not m.completed), None)
    if target_m:
        target_m.progress = min(target_m.target_value, target_m.progress + max(1, body.increment))
        db.commit()

    return evaluate_daily_missions(db, user, today_date)


class KuralReflectionIn(BaseModel):
    kural_number: int
    body: str


@app.post("/api/daily/kural/read")
def toggle_daily_kural_read(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    today_date = date.today()
    read_key = f"daily_kural_read:{today_date.isoformat()}"
    existing = db.execute(
        select(Progress).where(Progress.user_id == user.id, Progress.item_id == read_key)
    ).scalar_one_or_none()

    if existing:
        if existing.score >= 100:
            existing.score = 0  # toggle off
        else:
            existing.score = 100  # toggle on
    else:
        db.add(Progress(user_id=user.id, item_id=read_key, score=100))
        user.xp += 5  # Award +5 XP bonus for reading today's Kural

    db.commit()
    return evaluate_daily_missions(db, user, today_date)


@app.post("/api/daily/kural/reflection")
def save_daily_kural_reflection(
    body: KuralReflectionIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    if not body.body or not body.body.strip():
        raise HTTPException(400, "Reflection text cannot be empty")

    today_date = date.today()
    content_id = f"kural:{body.kural_number}"

    # Save or update reflection note
    note = db.execute(
        select(Note).where(
            Note.user_id == user.id,
            Note.content_type == "thirukkural_reflection",
            Note.content_id == content_id,
        )
    ).scalar_one_or_none()

    if note:
        note.body = body.body.strip()
        note.updated_at = datetime.now(timezone.utc)
    else:
        note = Note(
            user_id=user.id,
            content_type="thirukkural_reflection",
            content_id=content_id,
            title=f"Thirukkural #{body.kural_number} Reflection",
            body=body.body.strip(),
        )
        db.add(note)

    # Auto-mark today's Kural as read
    read_key = f"daily_kural_read:{today_date.isoformat()}"
    existing_read = db.execute(
        select(Progress).where(Progress.user_id == user.id, Progress.item_id == read_key)
    ).scalar_one_or_none()

    if not existing_read:
        db.add(Progress(user_id=user.id, item_id=read_key, score=100))
        user.xp += 5
    elif existing_read.score < 100:
        existing_read.score = 100

    db.commit()
    return evaluate_daily_missions(db, user, today_date)


# ---------------------------------------------------------------- AI Chatbot (Feature 11)
def call_openrouter_api(messages_history: list[dict[str, str]]) -> str:
    api_key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if not api_key:
        return (
            "வணக்கம்! OpenRouter API Key is missing. Please check your OPENROUTER_API_KEY setting in backend/.env."
        )

    system_prompt = (
        "You are Ezhuthaani AI (எழுத்தாணி AI), an expert, encouraging, and highly knowledgeable Tamil language tutor and cultural assistant.\n"
        "Your mission is to help learners master the Tamil language, Tamil alphabet/script, vocabulary, grammar, literature (Thirukkural, Sangam literature, etc.), history, culture, and their Ezhuthaani learning journey.\n\n"
        "CRITICAL BOUNDARY RULES:\n"
        "1. You MUST ONLY answer questions directly related to Tamil language, script, grammar, vocabulary, pronunciation, Tamil literature, Tamil history, Tamil culture, Tamil inscriptions, or the Ezhuthaani application.\n"
        "2. If the user asks a question about ANY topic unrelated to Tamil language/culture/learning (for example: programming in Python/C++, general math, non-Tamil history, cooking recipes, stock trading, general politics, gaming, physics, etc.), YOU MUST POLITELY DECLINE in both Tamil and English:\n"
        "'வணக்கம்! நான் உங்கள் எழுத்தாணி AI உதவியாளர். தமிழ் மொழி, எழுத்துக்கள், இலக்கணம், இலக்கியம், மற்றும் கலாச்சாரம் தொடர்பான கேள்விகளுக்கு மட்டுமே என்னால் பதிலளிக்க முடியும். தயவுசெய்து தமிழ் கற்றல் தொடர்பான கேள்விகளைக் கேட்கவும்!\n\n"
        "Greetings! I am your Ezhuthaani AI Assistant. I am specialized strictly in Tamil language, scripts, literature, history, and culture. Please ask questions related to learning Tamil!'\n"
        "3. Provide helpful, clear, structured responses with Tamil script, transliterations, and English meanings."
    )

    payload = {
        "model": "google/gemini-2.5-flash",
        "messages": [{"role": "system", "content": system_prompt}] + messages_history,
        "max_tokens": 1000,
        "temperature": 0.7,
    }

    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Ezhuthaani AI Assistant",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"OpenRouter API error: {e}")
        return f"வணக்கம்! Ezhuthaani AI connection error: {str(e)}"


@app.get("/api/ai/conversations")
def list_ai_conversations(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = (
        db.execute(
            select(AIConversation)
            .where(AIConversation.user_id == user.id)
            .order_by(AIConversation.updated_at.desc())
        )
        .scalars()
        .all()
    )
    return [
        {
            "id": c.id,
            "title": c.title,
            "created_at": c.created_at.isoformat(),
            "updated_at": c.updated_at.isoformat(),
        }
        for c in rows
    ]


@app.post("/api/ai/conversations")
def create_ai_conversation(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conv = AIConversation(user_id=user.id, title="New Tamil Chat")
    db.add(conv)
    db.commit()
    db.refresh(conv)
    return {
        "id": conv.id,
        "title": conv.title,
        "created_at": conv.created_at.isoformat(),
        "updated_at": conv.updated_at.isoformat(),
    }


@app.delete("/api/ai/conversations/{conv_id}")
def delete_ai_conversation(conv_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conv = db.execute(
        select(AIConversation).where(AIConversation.id == conv_id, AIConversation.user_id == user.id)
    ).scalar_one_or_none()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    db.execute(text("DELETE FROM ai_messages WHERE conversation_id = :cid"), {"cid": conv.id})
    db.delete(conv)
    db.commit()
    return {"ok": True}


@app.get("/api/ai/conversations/{conv_id}/messages")
def list_ai_messages(conv_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conv = db.execute(
        select(AIConversation).where(AIConversation.id == conv_id, AIConversation.user_id == user.id)
    ).scalar_one_or_none()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    msgs = (
        db.execute(
            select(AIMessage)
            .where(AIMessage.conversation_id == conv.id)
            .order_by(AIMessage.created_at.asc())
        )
        .scalars()
        .all()
    )
    return [
        {
            "id": m.id,
            "role": m.role,
            "content": m.content,
            "created_at": m.created_at.isoformat(),
        }
        for m in msgs
    ]


@app.post("/api/ai/conversations/{conv_id}/messages")
def send_ai_message(
    conv_id: int,
    body: AIMessageCreateIn,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conv = db.execute(
        select(AIConversation).where(AIConversation.id == conv_id, AIConversation.user_id == user.id)
    ).scalar_one_or_none()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    user_text = body.content.strip()
    if not user_text:
        raise HTTPException(status_code=400, detail="Message content cannot be empty")

    # 1. Store user message
    user_msg = AIMessage(conversation_id=conv.id, role="user", content=user_text)
    db.add(user_msg)
    db.commit()

    # 2. Fetch history (up to last 12 messages for prompt context window)
    prev_msgs = (
        db.execute(
            select(AIMessage)
            .where(AIMessage.conversation_id == conv.id)
            .order_by(AIMessage.created_at.desc())
            .limit(12)
        )
        .scalars()
        .all()
    )
    prev_msgs.reverse()

    history_payload = [{"role": m.role, "content": m.content} for m in prev_msgs]

    # 3. Call OpenRouter API
    assistant_reply = call_openrouter_api(history_payload)

    # 4. Store assistant message
    asst_msg = AIMessage(conversation_id=conv.id, role="assistant", content=assistant_reply)
    db.add(asst_msg)

    # Update conversation title if default
    if conv.title in ("New Tamil Chat", "Tamil Learning Chat", "Tamil Chat"):
        words = user_text.split()[:5]
        conv.title = " ".join(words) if words else "Tamil Chat"

    conv.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(user_msg)
    db.refresh(asst_msg)

    return {
        "user_message": {
            "id": user_msg.id,
            "role": user_msg.role,
            "content": user_msg.content,
            "created_at": user_msg.created_at.isoformat(),
        },
        "assistant_message": {
            "id": asst_msg.id,
            "role": asst_msg.role,
            "content": asst_msg.content,
            "created_at": asst_msg.created_at.isoformat(),
        },
    }


# ---------------------------------------------------------------- Dictionary Engine
DICTIONARY_JSON_PATH = Path(__file__).parent / "content" / "ezhuthaani_expanded_tamil_dictionary_core.json"
DICTIONARY_ITEMS: list[dict] = []
if DICTIONARY_JSON_PATH.exists():
    try:
        raw_dict_data = json.loads(DICTIONARY_JSON_PATH.read_text(encoding="utf-8"))
        DICTIONARY_ITEMS = raw_dict_data.get("entries", [])
        print(f"[Dictionary] Successfully loaded {len(DICTIONARY_ITEMS)} expanded dictionary items.")
    except Exception as e:
        print(f"[Dictionary] Warning: Could not parse ezhuthaani_expanded_tamil_dictionary_core.json: {e}")


@app.get("/api/dictionary/search")
def api_dictionary_search(q: str = "", category: str = "All"):
    query = q.strip().lower()
    raw_query = q.strip()
    
    results = DICTIONARY_ITEMS
    if category and category.lower() != "all":
        cat_lower = category.lower()
        results = [
            e for e in results
            if any(c.lower() == cat_lower for c in e.get("categories", []))
        ]
        
    if not query:
        return results[:50]
        
    matched = []
    for entry in results:
        tamil = entry.get("tamil", "")
        english = entry.get("english", "")
        aliases = entry.get("search_aliases", [])
        examples = entry.get("examples", [])
        
        match_ta = raw_query in tamil
        match_en = query in english.lower()
        match_alias = any(query in a.lower() for a in aliases)
        match_ex = any(raw_query in ex.get("tamil", "") or query in ex.get("english", "").lower() for ex in examples)
        
        if match_ta or match_en or match_alias or match_ex:
            matched.append(entry)
            
    return matched


# ---------------------------------------------------------------- self-check
def _self_check():
    u = User(id=1, name="t", email="t@t.com", pw_hash="x", xp=0, streak=0, best_streak=0, last_active=None)

    apply_streak(u)
    assert u.streak == 1, "first-ever activity should start streak at 1"

    u.last_active = date.today()
    apply_streak(u)
    assert u.streak == 1, "same-day activity should not increment streak"

    u.last_active = date.today() - timedelta(days=1)
    apply_streak(u)
    assert u.streak == 2, "consecutive-day activity should increment streak"

    u.last_active = date.today() - timedelta(days=5)
    apply_streak(u)
    assert u.streak == 1, "gap of >1 day should reset streak to 1"

    assert level_for_xp(0) == 1
    assert level_for_xp(100) == 2
    assert level_for_xp(400) == 3

    ids = [s["id"] for s in STAGES_ORDERED]
    unlocked = unlocked_stage_ids(set())
    assert unlocked == {ids[0]}, "only stage 1 unlocked with no quizzes passed"
    unlocked = unlocked_stage_ids({ids[0]})
    assert unlocked == {ids[0], ids[1]}, "passing stage 1 unlocks stage 2"
    unlocked = unlocked_stage_ids({ids[0], ids[2]})
    assert unlocked == {ids[0], ids[1], ids[3]}, "each passed stage independently unlocks its successor"

    assert hash_password.__call__
    h = hash_password("hunter2")
    assert verify_password("hunter2", h)
    assert not verify_password("wrong", h)

    print("self-check ok")


if __name__ == "__main__":
    _self_check()
