'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Root() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams({
      id: '3',
      title: 'Crazy Cattle 3D',
      gameUrl: 'https://crazy-cattle3d.org/game/crazycattle3d/',
      logo: 'https://public-image.fafafa.ai/cm9skdmuc00l215csgozjetbr/2025-04-23/images/1745387092958-bw2ulr.png',
      description: 
      `Experience the thrilling new Poland map in our battle royale rage game about sheep. Can you survive the treacherous Polish winter landscape?

This latest expansion brings snowy terrain, frozen lakes, and challenging mountain passes to the chaotic world of Crazy Cattle 3D. Master momentum in slippery conditions, use the unique Polish landscape to your advantage, and become the last sheep standing!`,
      genre: 'Action, Western',
      releaseDate: '2018-10-25T16:00:00',
      open: 'true'
    });

    router.push(`/home?${params.toString()}`);
  }, [router]);

  return null;
}