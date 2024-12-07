// 计算文章阅读时间（以分钟为单位）
export function getReadingTime(content: string): number {
  // 假设平均阅读速度为每分钟 200 个中文字符或 400 个英文单词
  const wordsPerMinute = 200;
  
  // 移除 HTML 标签
  const text = content.replace(/<[^>]*>/g, '');
  
  // 计算字符数（简单起见，这里我们假设所有字符都是中文）
  const charCount = text.length;
  
  // 计算预计阅读时间（分钟）
  const minutes = Math.ceil(charCount / wordsPerMinute);
  
  return minutes;
}
