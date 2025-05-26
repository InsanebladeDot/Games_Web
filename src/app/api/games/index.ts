import instance from '../index';
import type { Games } from '@/types/games';
import type { Result } from '@/types/Result';

// 获取全部游戏
export const getGames = () => {
  return instance.get<Result<Games[]>>('/games');
};

// 通过id获取指定游戏
export const getGameById = (id: number) => {
  return instance.get<Result<Games>>(`/games/${id}`);
};
export const getGameRadom = ()=>{
  return instance.get<Result<Games[]>>('/games/Radom');
}
// 分页查询
export const getPaginatedGames = (index: number, pages: number) => {
  return instance.get<Result<Games[]>>(`/games/getPaginatedList/${index}/${pages}`);
};

// 删除指定id的游戏
export const deleteGameById = (id: number) => {
  return instance.delete<Result<null>>(`/games/${id}`);
};

// 新增游戏
export const insertGame = (game: Games) => {
  return instance.post<Result<null>>('/games', game);
};

// 更新游戏
export const updateGame = (game: Games) => {
  return instance.put<Result<null>>('/games', game);
};