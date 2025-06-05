/** 游戏接口定义 */
export interface Game {
  id: number | null;
  developerId: number | null;
  title: string;
  logo: string;
  gameUrl: string;
  genre: string;
  open: boolean;
  releaseDate: string;
  description: string;
  recommendedVideos: string;
  gameIntroduction: string;
  downloadLink: string;
}