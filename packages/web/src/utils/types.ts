export interface Post {
  id: string;
  title: string;
  description: string;
  url: string;
  numLikes: number;
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