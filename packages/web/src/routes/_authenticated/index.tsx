import { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { createFileRoute } from "@tanstack/react-router";

interface Post {
  id: string;
  title: string;
  description: string;
  url: string;
  numLikes: number;
}

export const Route = createFileRoute("/_authenticated/")({
  component: HomePage,
});

function HomePage() {
  const { user, getToken } = useKindeAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  async function fetchData() {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/posts`, {
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    setPosts(data as Post[]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function deletePost(id: number) {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/posts", {
      method: "DELETE",
      body: JSON.stringify({ postId: id }),
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    console.log(data);
  }

  async function likePost(id: number) {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/likes", {
      method: "POST",
      body: JSON.stringify({ userId: user?.id, postId: id }),
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div>
      <h1>Home</h1>
      <h2 className="mt-5 text-3xl font-bold text-gray-900">
        Welcome {user?.given_name}
      </h2>
      <div>
        <h3 className="mt-5 text-2xl font-bold text-gray-900">Posts</h3>
        {posts.map((post) => (
          <div key={post.id}>
            <p>Title: {post.title}</p>
            <p>Description: {post.description}</p>
            <img src={post.url} alt="Post Image" />
            <button onClick={() => likePost(parseInt(post.id))}>Likes</button>
            <p>Likes: {post.numLikes}</p>
            <button onClick={() => deletePost(parseInt(post.id))}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
