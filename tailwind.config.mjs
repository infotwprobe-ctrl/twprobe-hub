import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    // 絕對掃描座標：告訴 Tailwind 必須去這些檔案裡尋找 class，否則不要亂刪 CSS
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {},
    },
    plugins: [
        typography, // 掛載排版降維打擊引擎
    ],
}