import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    // 絕對掃描座標：告訴 Tailwind 必須去這些檔案裡尋找 class，否則不要亂刪 CSS
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                paper: '#f8fafc',
                'twprobe-blue': '#2563eb',
            },
            fontFamily: {
                sans: ['system-ui', '-apple-system', 'sans-serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', 'monospace'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'typewriter': 'typing 2s steps(40, end)',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                typing: {
                    'from': { width: '0' },
                    'to': { width: '100%' },
                },
                glow: {
                    'from': { boxShadow: '0 0 10px -5px rgba(59, 130, 246, 0.5)' },
                    'to': { boxShadow: '0 0 20px 2px rgba(59, 130, 246, 0.8)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [
        typography, // 掛載排版降維打擊引擎
    ],
}