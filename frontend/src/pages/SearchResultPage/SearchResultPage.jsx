import AuthPageHeader from "../../components/AuthPageHeader";
import React, { useState } from "react";
import UserPost from "../../components/UserPost";

const LandingPage = ({ posts }) => {
  if (posts.length) {
    return (
      <>
        <main>
          <div className="flex flex-col space-y-8 pt-12 pb-24 items-center">
            {posts.map((post) => (
              <UserPost post={post} key={post.id} />
            ))}
          </div>
        </main>
      </>
    );
  } else {
    return <div className="mt-10 text-center">No matching data</div>;
  }
};

export default LandingPage;
