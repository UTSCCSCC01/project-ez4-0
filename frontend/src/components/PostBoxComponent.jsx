import { useState,useRef } from "react";
import "../css/PostBoxComponent.css";

export default function PostBoxComponent({ onCreatePost }) {

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [image, setImage] = useState({ preview: "", raw: "" });


  const inputFile = useRef(0);

 const onButtonClick = () => {
    // `current` points to the mounted file input element
   inputFile.current.click();
  };

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onPostSubmit = (e) => {
    e.preventDefault();
    const { newContent, tags } = splitTags(content);
    readImageBase64(image.raw, (result) => {
      onCreatePost(newContent, title, tags, result);
      setContent("");
      setTitle("");
      setImage({ preview: "", raw: "" });
    });
  }

  const readImageBase64 = (file, callback) => {
    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => {
      callback(fr.result);
    }
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

        <label className = "self-center" htmlFor="upload-button">
        {image.preview ? (
          <img src={image.preview} alt="dummy" width="300" height="300" />
        ) : (
          <>
            
          </>
        )}
      </label>

        <div className="flex flex-row">

        <input id="upload-button" type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={handleChange}/>

        <div className="w-1/2 grid justify-items-start">
          <button
            htmlFor="upload-button"
            type="button"
            onClick={onButtonClick}
            className="customize-post-box-post-btn group relative w-1/3 flex justify-center py-2 px-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Photos
          </button>
        </div>

        <div className="w-1/2 grid justify-items-end">
          <button
            type="submit"
            disabled={title === ""}
            className="customize-post-box-post-btn group relative w-1/3 flex justify-center py-2 px-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post
          </button>
        </div>
        </div>

      </form>
    </div>
  );
}