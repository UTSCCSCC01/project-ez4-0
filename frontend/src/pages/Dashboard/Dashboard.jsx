import AuthPageHeader from "../../components/AuthPageHeader";
import React, { useState } from "react";

const LandingPage = () => {
  const [result, setResult] = useState({});

  const onSearch = (newResult) => {
    setResult(newResult);
    console.log(newResult);
  };
  return (
    <>
      <AuthPageHeader updateResult={onSearch} currentTab={"Home"} />
      <main>
        <div className="flex flex-col space-y-8  py-12 bg-gray-100 items-center">
          <div className="rounded-md h-post-height w-post-width bg-white shadow-md p-12">
            Search result placeholder
          </div>
          <div className="rounded-md h-post-height w-post-width bg-white shadow-md p-12">
            Search result placeholder
          </div>
          <div className="rounded-md h-post-height w-post-width bg-white shadow-md p-12">
            Search result placeholder
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
