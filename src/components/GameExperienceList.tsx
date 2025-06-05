import React from 'react';
import { useGameExperienceStore } from '@/store/gameExperienceStore';
import Image from 'next/image';

const GameExperienceList: React.FC = () => {
  const { experiences, isLoading, error } = useGameExperienceStore();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-white">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-neutral-500">暂无游戏体验</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {experiences.map((experience) => (
        <div
          key={experience.id}
          className="bg-neutral-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
        >
          {experience.experienceImageUrl && (
            <div className="mb-4">
              <Image
                src={experience.experienceImageUrl || 'notFund.png'}
                alt={experience.username}
                width={320}
                height={180}
                className="w-full h-48 object-cover rounded-lg"
                unoptimized
              />
            </div>
          )}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{experience.username}</h3>
              <span className="text-sm text-neutral-400">
                {new Date(experience.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-neutral-300">{experience.experienceContent}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameExperienceList; 