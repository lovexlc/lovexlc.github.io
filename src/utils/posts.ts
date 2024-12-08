import type { ShortPageData } from "../shared/type";

export async function getAllPosts() {
  const posts = await import.meta.glob<any>('/posts/*.json', { eager: true });
  return Object.values(posts).map(post => ({
    id: post.default.__ud_title,
    title: post.default.__ud_title,
    intro: post.default.content?.[2]?.content?.[0]?.text || '',
    tags: post.default.__ud_tags || [],
  }));
}
