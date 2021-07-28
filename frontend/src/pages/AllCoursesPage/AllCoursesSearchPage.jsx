import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthPageHeader from "../../components/AuthPageHeader";
import "../../css/PostBoxComponent.css";
import SearchBar from "../../components/SearchBar2";
import qs from "qs";
import { resetWarningCache } from "prop-types";

export default function AllCourses({ onCreatePost }) {
  const [courses, setCourses] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const updateInput = async (keyword) => {
    setKeyword(keyword);
  };

  const handleSearch = (e) => {
    setIsSearch(true);
    setSearchKeyword(keyword);
  };

  const getCourses = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:5000/api/v1/courses`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCourses(result.courses);
      });
  };

  const getSearchCourses = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:5000/api/v1/courses`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCourses(result.courses);
      });
  };

  if (isSearch) {
    getSearchCourses();
    console.warn("searched");
  }

  useEffect(() => {
    getCourses();
  }, []);

  const renderCourses = () => {
    return courses.map((course) => (
      <Link
        to={`/course_videos/${course.id}`}
        className="xl:w-1/3 md:w-1/2 p-10"
        key={course.id}
      >
        <div className="border border-gray-300 p-3 rounded-lg hover:bg-gray-200 transition ease-out duration-300">
          <img
            className="rounded"
            src="https://picsum.photos/536/354"
            alt="User post image"
          />
          <h2 className="text-lg pt-2 font-medium title-font">{course.name}</h2>
        </div>
      </Link>
    ));
  };

  return (
    <div>
      <AuthPageHeader currentTab="Learn" />
      <div className="bg-gray-50">
        <SearchBar
          className=""
          input={keyword}
          updateInput={updateInput}
          handleSearch={handleSearch}
        />
      </div>

      <div className="bg-gray-50">
        <div>
          <div className="max-w-6xl mx-auto px-5 py-3 ">
            <div className="flex flex-wrap -m-4">{renderCourses()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
