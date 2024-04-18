export interface Post {
  user: string;
  id: string;
  title: string;
  description: string;
  url: string;
  numLikes: number;
  createdAt: string;
}

export interface Like {
  userId: string;
  postId: string;
}

export interface PostModalProps {
  post: Post;
  onClose: () => void;
  token?: string;
  fetchData: () => void;
}