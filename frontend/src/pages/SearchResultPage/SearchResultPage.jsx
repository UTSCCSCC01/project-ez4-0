import AuthPageHeader from "../../components/AuthPageHeader";
import React, { useState } from "react";
import UserPost from "../../components/UserPost";

const LandingPage = () => {
  const [result, setResult] = useState([{}]);

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
