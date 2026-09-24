export type McqQuestion = {
  type: "mcq";
  q: string;
  options: string[];
  answer: number;
  hint?: string;
};

export type Lesson = {
  id: string;
  type: "read" | "letters" | "grid" | "trace" | "vocab" | "sentence" | "build" | "reading";
  title: string;
  title_ta: string;
  xp: number;
  content: any;
};

export type Stage = {
  id: string;
  order: number;
  name: string;
  name_ta: string;
  subtitle: string;
  icon: string;
  color: string;
  blurb: string;
  milestone: { title: string; title_ta: string; badge: string; desc: string };
  lessons: Lesson[];
  quiz: { pass_score: number; questions: McqQuestion[] };
};

export type Curriculum = {
  app: string;
  mascot: string;
  stages: Stage[];
};

export type MeResponse = {
  id: number;
  name: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  best_streak: number;
  progress: Record<string, number>;
  unlocked_stages: string[];
  completed_stages: string[];
};

export type SavedWord = {
  id: number;
  word_id: string;
  created_at: string | null;
};

export type Note = {
  id: number;
  content_type: string;
  content_id: string;
  title: string | null;
  body: string;
  created_at: string | null;
  updated_at: string | null;
};

export interface CultureQuizQuestion {
  question_no: number;
  question_en: string;
  question_ta: string;
  options_en: string[];
  options_ta: string[];
  answer_index: number;
  explanation_en: string;
  explanation_ta: string;
}

export type CulturalItemSummary = {
  id?: number;
  slug: string;
  title_ta: string;
  title_en: string;
  category: string;
  summary_ta: string;
  summary_en: string;
  subtitle_ta?: string;
  subtitle_en?: string;
  region: string | null;
  period: string | null;
  era?: string | null;
  location_name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  tags?: string | null;
  image_url: string | null;
  image_caption: string | null;
  image_source_url?: string;
  image_source_name?: string;
  image_license?: string;
  image_attribution?: string;
  source_type?: string;
  source_name?: string;
  source_url?: string | null;
  license?: string | null;
};

export type CulturalItemDetail = CulturalItemSummary & {
  content_ta: string;
  content_en: string;
  tags: string | null;
  related_slugs?: string | null;
  related: {
    slug: string;
    title_ta: string;
    title_en: string;
    category: string;
    image_url: string | null;
  }[];
};

export type HistoryItemSummary = CulturalItemSummary & {
  content_type: string;
  date_order: number | null;
  date_label: string | null;
  era: string | null;
  related_slugs: string | null;
};

export type HistoryItemDetail = HistoryItemSummary & {
  content_ta: string;
  content_en: string;
  tags: string | null;
  related: {
    slug: string;
    content_type: string;
    title_ta: string;
    title_en: string;
    category: string;
    image_url: string | null;
  }[];
};

export type LiteratureItemSummary = CulturalItemSummary & {
  content_type: string;
  author: string | null;
  era: string | null;
  genre: string | null;
  literary_tradition: string | null;
  copyright_status: string | null;
  external_link: string | null;
};

export type LiteratureItemDetail = LiteratureItemSummary & {
  content_ta: string;
  content_en: string;
  tags: string | null;
  related: {
    slug: string;
    content_type: string;
    title_ta: string;
    title_en: string;
    category: string;
    image_url: string | null;
  }[];
};

export type KnowledgeItemSummary = CulturalItemSummary & {
  content_type: string;
  era: string | null;
};

export type KnowledgeItemDetail = KnowledgeItemSummary & {
  content_ta: string;
  content_en: string;
  tags: string | null;
  related: {
    slug: string;
    content_type: string;
    title_ta: string;
    title_en: string;
    category: string;
    image_url: string | null;
  }[];
};

export interface ScriptHistoryKeyDevelopment {
  title_en: string;
  title_ta: string;
  description_en: string;
  description_ta: string;
}

export interface ScriptHistoryImportantExample {
  name_en: string;
  name_ta: string;
  description_en: string;
  description_ta: string;
  image_url?: string;
}

export interface ScriptHistoryQuizQuestion {
  phase_number: number;
  phase_slug: string;
  question: { en: string; ta: string };
  options: {
    a: { en: string; ta: string };
    b: { en: string; ta: string };
    c: { en: string; ta: string };
    d: { en: string; ta: string };
  };
  answer: "a" | "b" | "c" | "d";
}

export type ScriptHistoryItemSummary = CulturalItemSummary & {
  content_type: string;
  phase_number?: number;
  period: string | null;
  era: string | null;
  script: string | null;
  script_language: string | null;
  historical_significance: string | null;
  short_intro_en?: string;
  short_intro_ta?: string;
};

export type ScriptHistoryItemDetail = ScriptHistoryItemSummary & {
  overview_en?: string;
  overview_ta?: string;
  historical_context_en?: string;
  historical_context_ta?: string;
  key_developments?: ScriptHistoryKeyDevelopment[];
  writing_materials_en?: string;
  writing_materials_ta?: string;
  where_used_en?: string;
  where_used_ta?: string;
  important_examples?: ScriptHistoryImportantExample[];
  historical_significance_en?: string;
  historical_significance_ta?: string;
  transition_to_next_phase_en?: string;
  transition_to_next_phase_ta?: string;
  scholarly_consensus_en?: string;
  scholarly_consensus_ta?: string;
  unicode_block?: string;
  content_ta?: string;
  content_en?: string;
  tags?: string | null;
  related?: {
    slug: string;
    content_type: string;
    title_ta: string;
    title_en: string;
    category: string;
    image_url: string | null;
  }[];
};

export type InscriptionItemSummary = CulturalItemSummary & {
  content_type: string;
  period: string | null;
  era: string | null;
  location_name: string | null;
  latitude: number | null;
  longitude: number | null;
  script: string | null;
  script_language: string | null;
  historical_significance: string | null;
};

export type InscriptionItemDetail = InscriptionItemSummary & {
  content_ta: string;
  content_en: string;
  tags: string | null;
  related: {
    slug: string;
    content_type: string;
    title_ta: string;
    title_en: string;
    category: string;
    image_url: string | null;
  }[];
};

export type MapLocationItem = {
  id: number;
  slug: string;
  content_type: string;
  title_ta: string;
  title_en: string;
  category: string;
  summary_ta: string;
  summary_en: string;
  period: string | null;
  era: string | null;
  script: string | null;
  region: string | null;
  location_name: string | null;
  latitude: number;
  longitude: number;
  image_url: string | null;
  source_name: string;
};

export type DailyMissionItem = {
  id: number;
  type: "lesson" | "vocabulary" | "writing" | "reading" | "quiz";
  title: string;
  description: string;
  target_id: string;
  progress: number;
  target: number;
  completed: boolean;
  completed_at: string | null;
  xp_reward: number;
  action_url: string;
};

export type DailyKural = {
  number: number;
  line1: string;
  line2: string;
  translation: string;
  couplet: string;
  explanation: string;
  mv: string;
  sp: string;
  mk: string;
  transliteration1: string;
  transliteration2: string;
  read: boolean;
  reflection: {
    id: number;
    body: string;
    updated_at: string | null;
  } | null;
};

export type DailyDashboardResponse = {
  date: string;
  progress: {
    completed: number;
    total: number;
    xp_earned: number;
    xp_gained_now: number;
  };
  streak: {
    current: number;
    best: number;
  };
  missions: DailyMissionItem[];
  daily_bonus: {
    xp_reward: number;
    completed: boolean;
  };
  daily_kural?: DailyKural | null;
};




