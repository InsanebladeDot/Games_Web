import { create } from 'zustand'
import { GameExperience } from '../types/user_experience'

interface GameExperienceState {
  experiences: GameExperience[]
  currentExperience: GameExperience | null
  isLoading: boolean
  error: string | null
  // 新增：临时存储上传的图片路径
  uploadedImagePath: string | null
  // Actions
  setExperiences: (experiences: GameExperience[]) => void
  addExperience: (experience: GameExperience) => void
  updateExperience: (experience: GameExperience) => void
  deleteExperience: (id: number) => void
  setCurrentExperience: (experience: GameExperience | null) => void
  setLoading: (status: boolean) => void
  setError: (error: string | null) => void
  // 新增：设置上传的图片路径
  setUploadedImagePath: (path: string | null) => void
}

export const useGameExperienceStore = create<GameExperienceState>((set) => ({
  experiences: [],
  currentExperience: null,
  isLoading: false,
  error: null,
  uploadedImagePath: null,

  // Actions
  setExperiences: (experiences) => set({ experiences }),
  
  addExperience: (experience) => 
    set((state) => ({ 
      experiences: [...state.experiences, experience]
    })),
  
  updateExperience: (experience) =>
    set((state) => ({
      experiences: state.experiences.map((exp) =>
        exp.id === experience.id ? experience : exp
      ),
    })),
  
  deleteExperience: (id) =>
    set((state) => ({
      experiences: state.experiences.filter((exp) => exp.id !== id),
    })),
  
  setCurrentExperience: (experience) => set({ currentExperience: experience }),
  
  setLoading: (status) => set({ isLoading: status }),
  
  setError: (error) => set({ error }),

  // 新增：设置上传的图片路径的 action
  setUploadedImagePath: (path) => set({ uploadedImagePath: path }),
})) 