import { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { createFileRoute } from "@tanstack/react-router";
import { FaRegHeart } from "react-icons/fa";
import PostModal from "../../components/modals/post-modal.tsx";
import { Like, Post } from "../../utils/types.ts";
import NavBar from "../../components/navbar.tsx";

export const Route = createFileRoute("/_authenticated/")({
  component: HomePage,
});

function HomePage() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const { user, getToken } = useKindeAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined); // Add token state

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch data when component mounts

  useEffect(() => {
    async function fetchToken() {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    }

    fetchToken();
  }, [getToken]); // Fetch token on component mount or when getToken changes

  async function fetchData() {
    try {
      const fetchedToken = await getToken();
      if (!fetchedToken) {
        throw new Error("No token found");
      }
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/posts`, {
        headers: {
          Authorization: fetchedToken,
        },
      });
      const data = await res.json();
      setPosts(data as Post[]);

      const likedRes = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/likes/${user?.id}`,
        {
          headers: {
            Authorization: fetchedToken,
          },
        }
      );
      const likedData = await likedRes.json();
      setLikedPosts(likedData.map((like: Like) => like.postId));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function likePost(id: number) {
    try {
      const fetchedToken = await getToken();
      if (!fetchedToken) {
        throw new Error("No token found");
      }

      const isLiked = likedPosts.includes(id);

      if (isLiked) {
        await fetch(
          `${import.meta.env.VITE_APP_API_URL}/likes/${user?.id}/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: fetchedToken,
            },
          }
        );
      } else {
        await fetch(`${import.meta.env.VITE_APP_API_URL}/likes`, {
          method: "POST",
          body: JSON.stringify({ userId: user?.id, postId: id }),
          headers: {
            Authorization: fetchedToken,
          },
        });
      }

      // Toggle the like status in the local state
      setLikedPosts(
        isLiked
          ? likedPosts.filter((postId) => postId !== id)
          : [...likedPosts, id]
      );

      // Fetch updated post data
      fetchData();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  }

  function isPostLiked(id: number) {
    return likedPosts.includes(id);
  }

  return (
    <div className="p-5 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            Welcome, {user?.given_name}
          </h1>
        </div>
        <div className="flex items-center">
          <NavBar />
        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded bg-white border border-gray-200 shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (!target.closest || !target.closest(".like-button")) {
                  setSelectedPost(post);
                }
              }}
            >
              <img
                src={post.url}
                alt="Post"
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="relative mt-2 mx-2">
                <p className="px-2 text-xl font-semibold mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {post.title}
                </p>
                <p className="px-2 pb-2 text-[#ff96ed] text-xs">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="px-2 pb-2 h-[50px] overflow-hidden">
                  <span className="block max-h-[3em] overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {post.description}
                  </span>
                </p>
                <div className="flex justify-center border-t items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      likePost(parseInt(post.id));
                    }}
                    className="px-4 py-2 rounded text-gray-800 flex items-center like-button"
                  >
                    {isPostLiked(parseInt(post.id)) ? (
                      <FaRegHeart className="mr-1 text-red-500" />
                    ) : (
                      <FaRegHeart className="mr-1" />
                    )}
                    {post.numLikes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          token={token}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}

export default HomePage;
