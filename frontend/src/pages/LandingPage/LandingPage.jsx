import LandingPageContent from "../../components/LandingPageContent";
import UnAuthPageHeader from "../../components/UnAuthPageHeader";
import SearchBar from "../../components/SearchBar";
import React, { useState } from "react";

const LandingPage = () => {
  const [keyword, setKeyword] = useState("");
  const updateInput = async (keyword) => {
    setKeyword(keyword);
    // console.log(keyword);
  };
  const handleSearch = async (keyword) => {
    console.log("SEARCH FOR '%s'", keyword);
  };
  return (
    <>
      <main>
        <UnAuthPageHeader />
        <div className=" pt-32">
          <SearchBar
            input={keyword}
            updateInput={updateInput}
            handleSearch={handleSearch}
          />
          <LandingPageContent />
        </div>
      </main>
    </>
  );
};

export default LandingPage;
