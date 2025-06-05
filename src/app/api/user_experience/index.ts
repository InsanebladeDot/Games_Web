import instance from '../index';
import type { GameExperience } from '@/types/user_experience/index';
import type { Result } from '@/types/Result';

// 获取全部游戏
export const getUserExperienceList = () => {
  return instance.get<Result<GameExperience[]>>('/userExperiences');
};

// 通过id获取指定游戏
export const getUserExperienceById = (id: number) => {
  return instance.get<Result<GameExperience>>(`/userExperiences/${id}`);
};

// 分页查询
export const getPaginatedGames = (index: number, pages: number) => {
  return instance.get<Result<GameExperience[]>>(`/userExperiences/getPaginatedList/${index}/${pages}`);
};

// 删除指定id的游戏
export const deleteUserExperienceById = (id: number) => {
  return instance.delete<Result<null>>(`/userExperiences/${id}`);
};

// 新增游戏
export const insertUserExperienceL = (game: GameExperience) => {
  return instance.post<Result<null>>('/userExperiences', game);
};

// 更新游戏
export const updateUserExperience = (game:GameExperience) => {
  return instance.put<Result<null>>('/userExperiences', game);
};