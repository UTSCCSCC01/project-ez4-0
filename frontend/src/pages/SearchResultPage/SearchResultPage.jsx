import AuthPageHeader from "../../components/AuthPageHeader";
import React, { useState } from "react";
import UserPost from "../../components/UserPost";
import TagBadge from "../../components/TagBadge";

const SearchResultPage = ({ tags, posts }) => {
  if (posts.length) {
    return (
      <>
        <main>
          <div className="flex space-x-4">
            {/* {tags.map((tagName) => (
              <TagBadge isSelected={false} tagName={tagName} key={tagName} />
            ))} */}
          </div>
          <div className="flex flex-col space-y-8 pt-6 pb-24 items-center">
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

export default SearchResultPage;
