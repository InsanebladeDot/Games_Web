"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';

interface Comment {
  id: number;
  user: string;
  avatar: string;
  date: string;
  content: string;
  anonymous?: boolean;
  email?: string;
  gameId: string | number;
}

const ANONYMOUS_AVATAR = "https://avatars.githubusercontent.com/u/0?v=4";

function getToday() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

interface GameCommentsProps {
  gameId: string | number;
}

export default function GameComments({ gameId }: GameCommentsProps) {
  const [showEditor, setShowEditor] = useState(false);
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  // 加载本地评论
  useEffect(() => {
    const raw = localStorage.getItem("game_comments");
    if (raw) {
      try {
        const all: Comment[] = JSON.parse(raw);
        setComments(all.filter(c => c.gameId === gameId));
      } catch {}
    }
  }, [gameId]);

  // 发布评论并持久化
  const handlePublish = () => {
    const raw = localStorage.getItem("game_comments");
    let all: Comment[] = [];
    if (raw) {
      try { all = JSON.parse(raw); } catch {}
    }
    const id = all.length ? all[all.length - 1].id + 1 : 1;
    const isAnonymous = anonymous || !name.trim();
    const user = isAnonymous ? "匿名玩家" : name;
    const avatar = isAnonymous ? ANONYMOUS_AVATAR : `https://avatars.githubusercontent.com/u/${1000 + id}?v=4`;
    const date = getToday();
    const newComment: Comment = {
      id,
      user,
      avatar,
      date,
      content: comment,
      anonymous: isAnonymous,
      email: email.trim() ? email : undefined,
      gameId
    };
    const nextAll = [...all, newComment];
    localStorage.setItem("game_comments", JSON.stringify(nextAll));
    setComments(nextAll.filter(c => c.gameId === gameId));
    setShowEditor(false);
    setComment("");
    setAnonymous(false);
    setName("");
    setEmail("");
  };

  const canPublish = comment.trim();

  return (
    <section className="w-full bg-neutral-900 rounded-xl shadow-lg p-6 mt-10 mb-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="inline-block text-neutral-400"><path d="M17 17v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 15v4m0 0v4m0-4h-4m4 0h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          评论区
        </h3>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors font-semibold shadow"
          onClick={() => setShowEditor(v => !v)}
        >
          {showEditor ? "取消" : "发表评论"}
        </button>
      </div>
      {showEditor && (
        <div className="mb-8 bg-neutral-800 rounded-lg p-4 flex flex-col gap-3 animate-fade-in">
          <div className="flex gap-4 mb-2">
            <input
              type="text"
              className="flex-1 bg-neutral-900 text-white rounded p-3 border border-neutral-700 focus:outline-none focus:border-blue-500"
              placeholder="名称"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={anonymous}
            />
            <input
              type="email"
              className="flex-1 bg-neutral-900 text-white rounded p-3 border border-neutral-700 focus:outline-none focus:border-blue-500"
              placeholder="邮箱"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={anonymous}
            />
          </div>
          <textarea
            className="w-full min-h-[80px] bg-neutral-900 text-white rounded p-3 border border-neutral-700 focus:outline-none focus:border-blue-500 resize-none"
            placeholder="写下你的评论..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={e => setAnonymous(e.target.checked)}
                className="accent-blue-600 w-4 h-4"
              />
              匿名评论
            </label>
            <button
              className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded font-semibold transition-colors shadow disabled:opacity-50"
              disabled={!canPublish}
              onClick={handlePublish}
            >
              发布
            </button>
          </div>
        </div>
      )}
      <ul className="space-y-6">
        {comments.map(c => (
          <li key={c.id} className="flex items-start gap-4 bg-neutral-800 rounded-lg p-4 hover:bg-neutral-700 transition-colors">
            <Image src={c.avatar} alt={c.user} width={48} height={48} className="w-12 h-12 rounded-full border-2 border-neutral-700 object-cover" unoptimized />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white">{c.user}</span>
                <span className="text-xs text-neutral-400">{c.date}</span>
                {c.email && !c.anonymous && (
                  <span className="text-xs text-blue-400 ml-2">{c.email}</span>
                )}
              </div>
              <div className="text-neutral-200 leading-relaxed whitespace-pre-line">{c.content}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
} 