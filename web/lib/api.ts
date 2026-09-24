import type {
  DailyDashboardResponse,
  MapLocationItem,
  InscriptionItemSummary,
  InscriptionItemDetail,
  ScriptHistoryItemSummary,
  ScriptHistoryItemDetail,
  ScriptHistoryQuizQuestion,
  LiteratureItemSummary,
  LiteratureItemDetail,
  KnowledgeItemSummary,
  KnowledgeItemDetail,
  CulturalItemSummary,
  CulturalItemDetail,
  CultureQuizQuestion,
} from "./types";

// Default fallback URL if NEXT_PUBLIC_API_URL is not set
const FALLBACK_API_URL = "http://localhost:8000";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || FALLBACK_API_URL;

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(path: string, opts: RequestInit & { token?: string } = {}): Promise<T> {
  const { token, headers, ...rest } = opts;
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });
  } catch (err) {
    throw new ApiError(503, "Backend service unavailable. Please check backend connection.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, data.detail || "Something went wrong");
  }
  return data as T;
}

// ---------------------------------------------------------------- saved words API
export async function getSavedWords(token: string) {
  return api<{ id: number; word_id: string; created_at: string | null }[]>("/api/saved", { token });
}

export async function saveWordApi(token: string, wordId: string) {
  return api<{ ok: boolean; id: number; word_id: string; already_saved: boolean }>("/api/saved", {
    method: "POST",
    token,
    body: JSON.stringify({ word_id: wordId }),
  });
}

export async function unsaveWordApi(token: string, wordId: string) {
  return api<{ ok: boolean; removed: string }>(`/api/saved/${encodeURIComponent(wordId)}`, {
    method: "DELETE",
    token,
  });
}

// ---------------------------------------------------------------- notes API
export async function getNotes(token: string) {
  return api<
    {
      id: number;
      content_type: string;
      content_id: string;
      title: string | null;
      body: string;
      created_at: string | null;
      updated_at: string | null;
    }[]
  >("/api/notes", { token });
}

export async function createNoteApi(
  token: string,
  params: { content_type?: string; content_id: string; title?: string; body: string }
) {
  return api<{
    id: number;
    content_type: string;
    content_id: string;
    title: string | null;
    body: string;
    created_at: string | null;
    updated_at: string | null;
  }>("/api/notes", {
    method: "POST",
    token,
    body: JSON.stringify(params),
  });
}

export async function updateNoteApi(token: string, noteId: number, params: { title?: string; body: string }) {
  return api<{
    id: number;
    content_type: string;
    content_id: string;
    title: string | null;
    body: string;
    created_at: string | null;
    updated_at: string | null;
  }>(`/api/notes/${noteId}`, {
    method: "PUT",
    token,
    body: JSON.stringify(params),
  });
}

export async function deleteNoteApi(token: string, noteId: number) {
  return api<{ ok: boolean; deleted_id: number }>(`/api/notes/${noteId}`, {
    method: "DELETE",
    token,
  });
}

// ---------------------------------------------------------------- culture API

export async function getCultureCategories() {
  return api<string[]>("/api/culture/categories");
}

export async function getCultureItems(params: { category?: string; q?: string } = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "All") query.set("category", params.category);
  if (params.q && params.q.trim()) query.set("q", params.q.trim());
  const queryString = query.toString() ? `?${query.toString()}` : "";
  return api<CulturalItemSummary[]>(`/api/culture${queryString}`);
}

export async function getCultureDetail(slug: string) {
  return api<CulturalItemDetail>(`/api/culture/${encodeURIComponent(slug)}`);
}

export async function getCultureQuiz(slug?: string) {
  const query = slug ? `?slug=${encodeURIComponent(slug)}` : "";
  return api<{ slug?: string; questions?: CultureQuizQuestion[]; [key: string]: any }>(`/api/culture/quiz${query}`);
}

export async function getSavedCulture(token: string) {
  return api<{ id: number; slug: string; created_at: string | null }[]>("/api/saved/culture", { token });
}

export async function saveCultureApi(token: string, slug: string) {
  return api<{ ok: boolean; id: number; slug: string; already_saved: boolean }>("/api/saved/culture", {
    method: "POST",
    token,
    body: JSON.stringify({ slug }),
  });
}

export async function unsaveCultureApi(token: string, slug: string) {
  return api<{ ok: boolean; removed: string }>(`/api/saved/culture/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    token,
  });
}

// ---------------------------------------------------------------- history API
import { HistoryItemSummary, HistoryItemDetail } from "./types";

export async function getHistoryEras() {
  return api<string[]>("/api/history/eras");
}

export async function getHistoryItems(params: { era?: string; q?: string } = {}) {
  const query = new URLSearchParams();
  if (params.era && params.era !== "All") query.set("era", params.era);
  if (params.q && params.q.trim()) query.set("q", params.q.trim());
  const queryString = query.toString() ? `?${query.toString()}` : "";
  return api<HistoryItemSummary[]>(`/api/history${queryString}`);
}

export async function getHistoryDetail(slug: string) {
  return api<HistoryItemDetail>(`/api/history/${encodeURIComponent(slug)}`);
}

export async function getSavedHistory(token: string) {
  return api<{ id: number; slug: string; created_at: string | null }[]>("/api/saved/history", { token });
}

export async function saveHistoryApi(token: string, slug: string) {
  return api<{ ok: boolean; id: number; slug: string; already_saved: boolean }>("/api/saved/history", {
    method: "POST",
    token,
    body: JSON.stringify({ slug }),
  });
}

export async function unsaveHistoryApi(token: string, slug: string) {
  return api<{ ok: boolean; removed: string }>(`/api/saved/history/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    token,
  });
}

// ---------------------------------------------------------------- literature API

export async function getLiteratureCategories() {
  return api<string[]>("/api/literature/categories");
}

export async function getLiteratureItems(params: { category?: string; period?: string; genre?: string; q?: string } = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "All") query.set("category", params.category);
  if (params.period && params.period !== "All") query.set("period", params.period);
  if (params.genre && params.genre !== "All") query.set("genre", params.genre);
  if (params.q && params.q.trim()) query.set("q", params.q.trim());
  const queryString = query.toString() ? `?${query.toString()}` : "";
  return api<LiteratureItemSummary[]>(`/api/literature${queryString}`);
}

export async function getLiteratureDetail(slug: string) {
  return api<LiteratureItemDetail>(`/api/literature/${encodeURIComponent(slug)}`);
}

export async function getSavedLiterature(token: string) {
  return api<{ id: number; slug: string; created_at: string | null }[]>("/api/saved/literature", { token });
}

export async function saveLiteratureApi(token: string, slug: string) {
  return api<{ ok: boolean; id: number; slug: string; already_saved: boolean }>("/api/saved/literature", {
    method: "POST",
    token,
    body: JSON.stringify({ slug }),
  });
}

export async function unsaveLiteratureApi(token: string, slug: string) {
  return api<{ ok: boolean; removed: string }>(`/api/saved/literature/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    token,
  });
}

// ---------------------------------------------------------------- knowledge API
export async function getKnowledgeCategories() {
  return api<string[]>("/api/knowledge/categories");
}

export async function getKnowledgeItems(params: { category?: string; q?: string } = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "All") query.set("category", params.category);
  if (params.q && params.q.trim()) query.set("q", params.q.trim());
  const queryString = query.toString() ? `?${query.toString()}` : "";
  return api<KnowledgeItemSummary[]>(`/api/knowledge${queryString}`);
}

export async function getKnowledgeDetail(slug: string) {
  return api<KnowledgeItemDetail>(`/api/knowledge/${encodeURIComponent(slug)}`);
}

export async function getSavedKnowledge(token: string) {
  return api<{ id: number; slug: string; created_at: string | null }[]>("/api/saved/knowledge", { token });
}

export async function saveKnowledgeApi(token: string, slug: string) {
  return api<{ ok: boolean; id: number; slug: string; already_saved: boolean }>("/api/saved/knowledge", {
    method: "POST",
    token,
    body: JSON.stringify({ slug }),
  });
}

export async function unsaveKnowledgeApi(token: string, slug: string) {
  return api<{ ok: boolean; removed: string }>(`/api/saved/knowledge/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    token,
  });
}

// ---------------------------------------------------------------- script history API

export async function getScriptHistoryItems() {
  return api<ScriptHistoryItemSummary[]>("/api/script-history");
}

export async function getScriptHistoryDetail(slug: string) {
  return api<ScriptHistoryItemDetail>(`/api/script-history/${encodeURIComponent(slug)}`);
}

export async function getScriptHistoryQuiz() {
  return api<ScriptHistoryQuizQuestion[]>("/api/script-history/quiz");
}

export async function getSavedScriptHistory(token: string) {
  return api<{ id: number; slug: string; created_at: string | null }[]>("/api/saved/script-history", { token });
}

export async function saveScriptHistoryApi(token: string, slug: string) {
  return api<{ ok: boolean; id: number; slug: string; already_saved: boolean }>("/api/saved/script-history", {
    method: "POST",
    token,
    body: JSON.stringify({ slug }),
  });
}

export async function unsaveScriptHistoryApi(token: string, slug: string) {
  return api<{ ok: boolean; removed: string }>(`/api/saved/script-history/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    token,
  });
}

// ---------------------------------------------------------------- inscriptions API
export async function getInscriptionPeriods() {
  return api<string[]>("/api/inscriptions/periods");
}

export async function getInscriptionItems(params: { period?: string; script?: string; q?: string } = {}) {
  const query = new URLSearchParams();
  if (params.period && params.period !== "All") query.set("period", params.period);
  if (params.script && params.script !== "All") query.set("script", params.script);
  if (params.q && params.q.trim()) query.set("q", params.q.trim());
  const queryString = query.toString() ? `?${query.toString()}` : "";
  return api<InscriptionItemSummary[]>(`/api/inscriptions${queryString}`);
}

export async function getInscriptionDetail(slug: string) {
  return api<InscriptionItemDetail>(`/api/inscriptions/${encodeURIComponent(slug)}`);
}

export async function getSavedInscriptions(token: string) {
  return api<{ id: number; slug: string; created_at: string | null }[]>("/api/saved/inscriptions", { token });
}

export async function saveInscriptionApi(token: string, slug: string) {
  return api<{ ok: boolean; id: number; slug: string; already_saved: boolean }>("/api/saved/inscriptions", {
    method: "POST",
    token,
    body: JSON.stringify({ slug }),
  });
}

export async function unsaveInscriptionApi(token: string, slug: string) {
  return api<{ ok: boolean; removed: string }>(`/api/saved/inscriptions/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    token,
  });
}

// ---------------------------------------------------------------- map explorer API
export async function getMapLocations(contentType?: string) {
  const query = new URLSearchParams();
  if (contentType && contentType !== "All") query.set("content_type", contentType);
  const queryString = query.toString() ? `?${query.toString()}` : "";
  return api<MapLocationItem[]>(`/api/map/locations${queryString}`);
}

// ---------------------------------------------------------------- daily dashboard & missions API
export async function getDailyDashboard(token: string) {
  return api<DailyDashboardResponse>("/api/daily", { token });
}

export async function postDailyProgress(token: string, missionType: string = "vocabulary", increment: number = 1) {
  return api<DailyDashboardResponse>("/api/daily/progress", {
    method: "POST",
    token,
    body: JSON.stringify({ mission_type: missionType, increment }),
  });
}

export async function toggleKuralReadApi(token: string) {
  return api<DailyDashboardResponse>("/api/daily/kural/read", {
    method: "POST",
    token,
  });
}

export async function saveKuralReflectionApi(token: string, kuralNumber: number, body: string) {
  return api<DailyDashboardResponse>("/api/daily/kural/reflection", {
    method: "POST",
    token,
    body: JSON.stringify({ kural_number: kuralNumber, body }),
  });
}

// ---------------------------------------------------------------- hangman API
export async function completeHangmanApi(token: string, totalQuestions: number, correctCount: number) {
  return api<{
    ok: boolean;
    win_percentage: number;
    earned_bonus: boolean;
    xp_gained: number;
    total_xp: number;
    level: number;
  }>("/api/hangman/complete", {
    method: "POST",
    token,
    body: JSON.stringify({ total_questions: totalQuestions, correct_count: correctCount }),
  });
}





