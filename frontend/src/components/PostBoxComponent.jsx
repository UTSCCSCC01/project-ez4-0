import { useState } from "react";
import "../css/PostBoxComponent.css";

export default function PostBoxComponent({ onCreatePost }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onPostSubmit = (e) => {
    e.preventDefault();
    const { newContent, tags } = splitTags(content);
    onCreatePost(newContent, title, tags);
    setContent("");
    setTitle("");
  };

  const splitTags = (content) => {
    let copied = content;
    let tags = [];
    const matches = content.match(/#.*?#/g);
    if (matches) {
      tags = matches.map((m) => {
        copied = copied.replaceAll(m, "");
        return m.replaceAll("#", "");
      });
    }
    return { newContent: copied.trim(), tags: tags };
  };

  return (
    <div className="bg-gray-50">
      <form className="max-w-xl flex flex-wrap flex-col mx-auto" action="#" method="post" onSubmit={onPostSubmit}>
        <div>
          <label
            htmlFor="post-title"
            className="text-gray-700 text-sm font-bold"
          >
            Title
          </label>
          <input
            id="post-title"
            required
            className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Give it a title..."
            onChange={onTitleChange}
            value={title}
          />
        </div>
        <div>
          <label
            htmlFor="post-content"
            className="text-gray-700 text-sm font-bold"
          >
            Content
          </label>
          <textarea
            id="post-content"
            rows="4"
            className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Write something..."
            onChange={onContentChange}
            value={content}
          />
        </div>

        <div className="grid justify-items-end">
          <button
            type="submit"
            disabled={title === ""}
            className="customize-post-box-post-btn group relative w-1/6 flex justify-center py-2 px-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
