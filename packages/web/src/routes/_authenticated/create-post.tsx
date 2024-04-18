import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import NavBar from "../../components/navbar";

export const Route = createFileRoute("/_authenticated/create-post")({
  component: CreatePostPage,
});

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const { user, getToken } = useKindeAuth();

  const navigate = useNavigate({ from: "/create-post" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitButton = document.getElementById(
      "submitButton"
    ) as HTMLButtonElement | null;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.remove("bg-blue-500");
      submitButton.classList.add("bg-gray-300");
    }

    const response = await uploadPost();
    console.log(response);
    navigate({ to: "/" });

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.classList.remove("bg-gray-300");
      submitButton.classList.add("bg-blue-500");
    }
    setTitle("");
    setDescription("");
    setImage(null);
  };

  async function uploadPost() {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }

    if (image) {
      const signedURLResponse = await fetch(
        import.meta.env.VITE_APP_API_URL + "/signed-url",
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contentType: image.type,
          }),
        }
      );
      if (!signedURLResponse.ok) {
        throw new Error("An error occurred while creating the expense");
      }
      const { url } = (await signedURLResponse.json()) as { url: string };

      await fetch(url, {
        method: "PUT",
        body: image,
        headers: {
          "Content-Type": image.type,
        },
      });

      const imageUrl = url.split("?")[0];

      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/posts", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          title: title,
          description: description,
          url: imageUrl,
        }),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("An error occurred while creating the expense");
      }
      const json = await res.json();
      return json;
    }
  }

  function handleFileClick(e: React.FormEvent) {
    e.preventDefault();
    document.getElementById("getImage")?.click();
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    if (previewImageUrl) {
      URL.revokeObjectURL(previewImageUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImageUrl(url);
    } else {
      setPreviewImageUrl(null);
    }
  };

  return (
    <div className="p-5 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            Share Your Thoughts, {user?.given_name}
          </h1>
        </div>
        <div className="flex items-center">
          <NavBar />
        </div>
      </div>
      <div className="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover">
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-md z-10 border border-gray-200 shadow-lg">
          <div className="text-center">
            <h2 className="mt-2 text-xl text-gray-400">Share A Post</h2>
          </div>
          <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 space-y-2">
              <input
                className="w-full text-base p-2 border border-gray-200 shadow-lg rounded-md focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Picture Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="w-full text-base p-2 border border-gray-200 shadow-lg rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <div className="text-sm font-bold text-gray-500 tracking-wide">
                Attach an Image
              </div>
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-col rounded-lg border-4 border-gray-300 border-dashed w-full p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto"></div>
                    {previewImageUrl && image && (
                      <div className="mt-4">
                        {image.type.startsWith("image/") ? (
                          <img src={previewImageUrl} alt="Selected file" />
                        ) : image.type.startsWith("video/") ? (
                          <video src={previewImageUrl} controls />
                        ) : null}
                      </div>
                    )}
                    <div className="pointer-none text-[#ff96ed] hover:scale-105 duration-300">
                      <button
                        style={{
                          display: "block",
                          width: "120px",
                          height: "30px",
                        }}
                        onClick={handleFileClick}
                      >
                        Select Image
                      </button>
                      <input
                        type="file"
                        id="getImage"
                        accept="image/jpg,image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageChange(e)}
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                id="submitButton"
                className="my-5 w-full flex justify-center bg-[#ff96ed] hover:bg-[#db7ac9] hover:scale-105 text-gray-100 p-4 rounded-md tracking-wide font-semibold focus:outline-none focus:shadow-outline shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
