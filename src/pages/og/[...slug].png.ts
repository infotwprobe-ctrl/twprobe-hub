import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

// 預先抓取字體緩衝區的函數（使用 Noto Sans TC 提供全中文字元支援）
async function fetchFont(text: string) {
    const API = `https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700;900&text=${encodeURIComponent(text)}twprobeTERMINALSYSC%020`;
    const css = await (await fetch(API)).text();
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
    
    if (resource && resource[1]) {
        const res = await fetch(resource[1]);
        return res.arrayBuffer();
    }
    // 如果無法抓取特定字元集，退階抓取完整的 Noto Sans TC (可能會較大且較慢)
    const fullFontRes = await fetch("https://github.com/notofonts/noto-cjk/raw/main/Sans/Variable/TTF/NotoSansTC-VF.ttf");
    return fullFontRes.arrayBuffer();
}

export async function getStaticPaths() {
    const posts = import.meta.glob('../../pages/**/*.md', { eager: true });
    
    return Object.values(posts).map((post: any) => {
        // 從完整檔案路徑解析出真正的 slug 路由
        // post.url e.g. "/protocols/protocol-1" -> slug: "protocols/protocol-1"
        const slug = post.url.replace(/^\//, '');
        
        return {
            params: { slug },
            props: {
                title: post.frontmatter.title || 'TWProbe 核心情報終端',
                docId: post.frontmatter.docId || 'KERNEL',
            },
        };
    });
}

export async function GET({ props }) {
    const { title, docId } = props;

    // 動態抓取需要的字體來減輕體積
    const fontData = await fetchFont(title + docId);

    const svg = await satori(
        {
            type: 'div',
            props: {
                style: {
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    backgroundColor: '#020617', // slate-950
                    backgroundImage: 'radial-gradient(circle at 100% 100%, #1e293b, #020617)',
                    padding: '80px',
                    fontFamily: '"Noto Sans TC"',
                },
                children: [
                    {
                        type: 'div',
                        props: {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                            },
                            children: [
                                {
                                    type: 'div',
                                    props: {
                                        style: {
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: '#2563eb', // twprobe-blue
                                        }
                                    }
                                },
                                {
                                    type: 'span',
                                    props: {
                                        style: {
                                            fontSize: '32px',
                                            color: '#cbd5e1', // slate-300
                                            fontWeight: 900,
                                            letterSpacing: '0.1em',
                                        },
                                        children: "TWPROBE CORE TERMINAL"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        type: 'div',
                        props: {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                            },
                            children: [
                                {
                                    type: 'span',
                                    props: {
                                        style: {
                                            fontSize: '36px',
                                            color: '#3b82f6', // blue-500
                                            fontWeight: 900,
                                            letterSpacing: '0.05em',
                                            backgroundColor: 'rgba(37, 99, 235, 0.15)',
                                            padding: '12px 24px',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(59, 130, 246, 0.3)',
                                        },
                                        children: docId
                                    }
                                },
                                {
                                    type: 'h1',
                                    props: {
                                        style: {
                                            fontSize: '72px',
                                            fontWeight: 900,
                                            color: '#f8fafc', // paper (off-white)
                                            lineHeight: 1.2,
                                            marginTop: '16px',
                                            maxWidth: '900px',
                                        },
                                        children: title
                                    }
                                }
                            ]
                        }
                    },
                    {
                        type: 'div',
                        props: {
                            style: {
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'flex-start',
                                borderTop: '2px solid rgba(255,255,255,0.1)',
                                paddingTop: '32px',
                            },
                            children: [
                                {
                                    type: 'span',
                                    props: {
                                        style: {
                                            fontSize: '24px',
                                            color: '#64748b', // slate-500
                                            letterSpacing: '0.2em',
                                        },
                                        children: "ESTABLISHED FOR MACROECONOMIC DEPLOYMENT."
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'Noto Sans TC',
                    data: fontData,
                    weight: 900,
                    style: 'normal',
                },
            ],
        }
    );

    const resvg = new Resvg(svg, {
        fitTo: {
            mode: 'width',
            value: 1200,
        },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return new Response(pngBuffer, {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
