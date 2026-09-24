export interface RhymeVideo {
  id: string;
  youtubeId: string;
  titleTa: string;
  titleEn: string;
  category: "Everyday Tamil" | "Animals" | "Nature" | "Food" | "Colours";
  thumbnailUrl: string;
}

export const CURATED_YOUTUBE_RHYMES: RhymeVideo[] = [
  {
    id: "yt-1",
    youtubeId: "1dMG9sa8qUo",
    titleTa: "கைவீசம்மா கைவீசு",
    titleEn: "Kaiveethamma Kaiveethu - Classic Tamil Rhyme",
    category: "Everyday Tamil",
    thumbnailUrl: "https://img.youtube.com/vi/1dMG9sa8qUo/hqdefault.jpg",
  },
  {
    id: "yt-2",
    youtubeId: "QlNdVXRj9SE",
    titleTa: "தோசையம்மா தோசை",
    titleEn: "Dosai Amma Dosai - Favorite Food Rhyme",
    category: "Food",
    thumbnailUrl: "https://img.youtube.com/vi/QlNdVXRj9SE/hqdefault.jpg",
  },
  {
    id: "yt-3",
    youtubeId: "_1vEELv2rQ0",
    titleTa: "நிலா நிலா ஓடி வா",
    titleEn: "Nila Nila Odi Va - Moon & Night Rhyme",
    category: "Nature",
    thumbnailUrl: "https://img.youtube.com/vi/_1vEELv2rQ0/hqdefault.jpg",
  },
  {
    id: "yt-4",
    youtubeId: "DmKnzvJfnFE",
    titleTa: "யானை யானை அழகிய யானை",
    titleEn: "Elephant Rhyme - Friendly Animal Song",
    category: "Animals",
    thumbnailUrl: "https://img.youtube.com/vi/DmKnzvJfnFE/hqdefault.jpg",
  },
  {
    id: "yt-5",
    youtubeId: "QiiAC4yrb7A",
    titleTa: "வண்ண வண்ணப் பூக்கள்",
    titleEn: "Color Flowers - Vibrant Tamil Rhyme",
    category: "Colours",
    thumbnailUrl: "https://img.youtube.com/vi/QiiAC4yrb7A/hqdefault.jpg",
  },
];
