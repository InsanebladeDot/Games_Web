import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'message-slide-in': 'messageSlideIn 0.3s ease-out forwards',
      },
      keyframes: {
        messageSlideIn: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      },
      zIndex: {
        'max': '999999'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            strong: {
              color: 'inherit',
            },
            code: {
              color: 'inherit',
              backgroundColor: 'var(--tw-prose-pre-bg)',
            },
            pre: {
              color: 'inherit',
              backgroundColor: 'var(--tw-prose-pre-bg)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
