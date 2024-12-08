import type { APIRoute } from "astro";
import { getAllPosts } from "../../../utils/posts";

export const GET: APIRoute = async ({ url }) => {
  try {
    const query = url.searchParams.get("q")?.toLowerCase() || "";
    
    if (!query) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const posts = await getAllPosts();
    
    // 对标题、简介和标签进行搜索
    const results = posts.filter((post) => {
      const titleMatch = post.title?.toLowerCase().includes(query);
      const introMatch = post.intro?.toLowerCase().includes(query);
      const tagsMatch = post.tags?.some(tag => tag.toLowerCase().includes(query));
      return titleMatch || introMatch || tagsMatch;
    });

    // 只返回需要的字段
    const searchResults = results.slice(0, 5);

    return new Response(JSON.stringify(searchResults), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({ error: "Failed to search posts" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
