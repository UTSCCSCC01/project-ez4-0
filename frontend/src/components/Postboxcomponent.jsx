import { useState } from 'react';
import '../css/PostBoxComponent.css';

export default function PostBoxComponent() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const onContentChange = (e) => {
    setContent(e.target.value);
  }

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const createPost = (content, title, tags) => {
    const userId = localStorage.getItem("userId");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          title,
          content,
          tags,
          user_id: userId,
      })
    };
    const api = `http://localhost:5000/api/v1/posts`;
    fetch(api, requestOptions)
      .then(response => response.json())
      .then((result) => console.log(result));
  }

  const onPostSubmit = (e) => {
    e.preventDefault();
    const { newContent, tags } = splitTags(content);
    createPost(newContent, title, tags);
  }

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
    return { newContent: copied.trim(), tags: tags }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form className="w-80 min-w-full md:min-w-0 space-y-6" action="#" method="post" onSubmit={onPostSubmit}>
      <div>
          <label htmlFor="post-title" className="text-gray-700 text-sm font-bold">Title</label>
          <input
            id="post-title"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Give it a title..."
            onChange={onTitleChange}
            value={title}
          />
        </div>
        <div>
          <label htmlFor="post-content" className="text-gray-700 text-sm font-bold">Content</label>
          <textarea
            id="post-content"
            rows="4"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Write something..."
            onChange={onContentChange}
            value={content}
          />
        </div>

        <div className="py-2 grid justify-items-center" >
          <button
            type="submit"
            disabled={title === ""}
            className="customize-post-box-post-btn group relative w-1/6 flex justify-center  py-2 px-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  )
}

