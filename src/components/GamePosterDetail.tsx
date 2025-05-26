import React from "react";
import Image from 'next/image';

interface GamePosterDetailProps {
  name: string;
  img: string;
  date: string;
  tags: string[];
  desc: string;
}

export default function GamePosterDetail({ name, img, date, tags, desc }: GamePosterDetailProps) {
  return (
    <section className="w-full flex flex-col md:flex-row items-center bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl shadow-xl my-10 p-8">
      <Image src={img} alt={name} width={320} height={420} className="w-[320px] h-[420px] object-cover rounded-lg shadow-lg mb-6 md:mb-0 md:mr-10" unoptimized />
      <div className="flex-1 flex flex-col">
        <h2 className="text-3xl font-bold mb-2">{name}</h2>
        <div className="text-neutral-400 mb-4">{date}</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t, i) => (
            <span key={i} className="bg-neutral-800 border border-neutral-700 text-xs text-white rounded px-3 py-1 font-semibold tracking-wide">{t}</span>
          ))}
        </div>
        <div className="text-lg text-neutral-200">{desc}</div>
      </div>
    </section>
  );
} 