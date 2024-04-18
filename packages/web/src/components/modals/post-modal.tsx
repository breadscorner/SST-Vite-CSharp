import React from "react";
import { PostModalProps } from "../../utils/types";

const PostModal: React.FC<PostModalProps> = ({ post, onClose, token }) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  async function deletePost(id: number) {
    try {
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
      onClose();
      await fetchData();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-3xl"
      onClick={handleOverlayClick}
    >
      <div className="w-[50%] bg-white rounded-lg flex overflow-hidden">
        {/* Image */}
        <img src={post.url} alt={post.title} className="flex-shrink-0 w-1/2" />

        {/* Content */}
        <div className="p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="py-2 text-[#ff96ed] text-sm">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-700">{post.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600">
              Like
            </button>
            <p className="text-gray-800">Likes: {post.numLikes}</p>
            <button
              onClick={() => deletePost(parseInt(post.id))}
              className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PostModal;
function fetchData() {
  throw new Error("Function not implemented.");
}
