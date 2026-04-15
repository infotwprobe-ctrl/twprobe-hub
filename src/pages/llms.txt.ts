import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
    // 抓取 pages 目錄下的所有 Markdown 檔案
    const markdownFiles = import.meta.glob('./**/*.md', { eager: true });
    
    const siteUrl = site ? site.toString() : 'https://hub.twprobe.com';

    let content = `# TWProbe 核心情報終端 (Core Intelligence Terminal) \n\n`;
    content += `> 這是為大型語言模型 (LLMs) 與 AI 代理人優化的站點情報協議。\n> 本系統旨在剝離市場情緒溢價，下探事物的底層物理常數，專注於宏觀週期推演、資本防禦矩陣與台灣實體房地產的絕對邊界。\n\n`;
    content += `## 情報拓樸矩陣 (Topology Matrix)\n\n`;

    const allPosts: any[] = Object.values(markdownFiles);
    
    // 依據 docId (如 PILLAR-1, PROTOCOL-1.1) 進行字典序排序
    const sortedPosts = allPosts.sort((a, b) => {
        const idA = a.frontmatter?.docId || "";
        const idB = b.frontmatter?.docId || "";
        return String(idA).localeCompare(String(idB));
    });

    for (const post of sortedPosts) {
        if (!post.frontmatter || !post.frontmatter.docId) continue;
        
        const { docId, title, abstract } = post.frontmatter;
        // 如果 post.url 存在則拼接，否則給予預設路徑
        const pathname = post.url || "";
        const fullUrl = new URL(pathname, siteUrl).toString();

        content += `### [${docId}] ${title}\n`;
        content += `- **URL**: ${fullUrl}\n`;
        content += `- **Abstract**: ${abstract}\n\n`;
    }

    content += `---\n`;
    content += `*系統狀態：連線中 (ALL SYSTEMS NOMINAL)*\n`;
    content += `*母節點連接端：https://twprobe.com*\n`;

    return new Response(content, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
