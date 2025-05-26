// src/types/games.ts

export interface Games {
    id: number;
    developerId: number;
    title: string;
    logo: string;
    gameUrl: string;
    genre: string;
    releaseDate: string; // 建议用 string，后端 LocalDateTime 通常会转成字符串
    description: string;
    open: boolean;
  }