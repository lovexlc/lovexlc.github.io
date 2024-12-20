export type PageData = {
  path: string;
  id: string;
  content: string;
  tags: string[];
  title: string;
  createTime: number;
  updateTime: number;
  draft: boolean;
  cover?: {
    src: string;
    alt?: string;
  };
};

export type PageDetail = Omit<PageData, "path" | "id"> & { intro: string; html: string };

// 默认封面类型
type DefaultCover = {
  src: 'https://via.placeholder.com/728x400?text=Default+Cover';
  alt: 'https://via.placeholder.com/728x400?text=Default+Cover';
};

// 使用条件类型处理 cover 字段
type ShortPageData = Omit<PageData, "content"> & { intro: string } & (
  PageData["cover"] extends (undefined | null) 
    ? { cover: DefaultCover } // 如果 cover 为空，则使用默认封面
    : { cover: PageData["cover"] } // 如果 cover 不为空，则使用原有的 cover 类型
);
