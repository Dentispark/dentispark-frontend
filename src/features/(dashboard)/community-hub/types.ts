export interface Comment {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  isMentor?: boolean;
  badge?: string;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  isMentor?: boolean;
  badge?: string;
  comments: Comment[];
  totalComments: number;
}

export interface SuccessStory {
  id: string;
  title: string;
  author: string;
  location: string;
  avatar: string;
  company?: string;
  bgColor: string;
}
