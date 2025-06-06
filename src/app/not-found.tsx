// src/app/(root)/not-found.tsx 或 src/pages/404.tsx

'use client'

import { t } from '@/components/i18n';
import Link from 'next/link';

export default function NotFound() {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#000',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative'
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 'bold', letterSpacing: 8, textShadow: '0 0 40px #8f5cff' }}>
          404
        </div>
        <div style={{ fontSize: 28, margin: '24px 0 8px', color: '#8f5cff', fontFamily: 'cursive' }}>
          {t('notFound.title')}
        </div>
        <div style={{ fontSize: 18, color: '#aaa', marginBottom: 40, textAlign: 'center' }}>
          {t('notFound.desc')}
        </div>
        <Link
          href="/"
          className="notfound-btn"
          style={{
            padding: '12px 36px',
            background: 'linear-gradient(90deg, #8f5cff 0%, #3c3b6e 100%)',
            borderRadius: 30,
            color: '#fff',
            fontWeight: 600,
            fontSize: 18,
            textDecoration: 'none',
            boxShadow: '0 4px 24px #8f5cff55',
            transition: 'transform 0.2s',
            display: 'inline-block'
          }}
        >
          {t('notFound.backHome')}
        </Link>
        <style jsx>{`
          .notfound-btn:hover {
            transform: scale(1.08);
          }
        `}</style>
        {/* 可选：底部加点星空SVG装饰 */}
        <svg width="100vw" height="80" style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.2 }}>
          <circle cx="50" cy="40" r="2" fill="#fff" />
          <circle cx="200" cy="60" r="1.5" fill="#fff" />
          <circle cx="400" cy="30" r="2.5" fill="#fff" />
          {/* ...更多星星 */}
        </svg>
      </div>
    );
  }