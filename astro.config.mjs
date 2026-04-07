import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 注入絕對物理座標 (Sitemap 引擎的必須燃料)
  site: 'https://hub.twprobe.com',

  integrations: [
    tailwind(),
    sitemap()
  ],

  // 啟動物理預載引擎
  prefetch: true
});