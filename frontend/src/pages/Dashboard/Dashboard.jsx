import AuthPageHeader from "../../components/AuthPageHeader";
import React, { useState } from "react";
import UserPost from "../../components/UserPost";

const LandingPage = () => {
  const [result, setResult] = useState([
    {
      content: "",
      id: "60de183661866e3893c59eca",
      posted_at: "2021-07-01T15:32:06.572000+00:00",
      resources: [],
      tags: [],
      title: "PLACEHOLDER",
      user_id: "e8d62475-ba58-4f7d-ae39-c804b15c653c",
    },
  ]);

  const onSearch = (newResult) => {
    setResult(newResult);
    console.log(newResult);
  };
  return (
    <>
      <AuthPageHeader updateResult={onSearch} currentTab={"Home"} />
      <main>
        <div className="flex min-h-screen flex-col space-y-8 pt-12 pb-24 bg-gray-100 items-center">
          {result.map((post) => (
            <UserPost post={post} key={post.id} />
          ))}
        </div>
      </main>
    </>
  );
};

export default LandingPage;
