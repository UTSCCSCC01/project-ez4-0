import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthPageHeader from "../../components/AuthPageHeader";
import "../../css/PostBoxComponent.css";
import SearchBar from "../../components/SearchBar2";
import CourseCategoryDropdown from "../../components/CouseCategoryDropdown";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const updateInput = async (keyword) => {
    setKeyword(keyword);
  };

  const handleSearch = (e) => {
    setSearchKeyword(keyword);
    getSearchCourses();
    console.log("searched");
  };

  const onFilterCategory = (category) => {
    getCategoryCourses(category);
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
    fetch(
      `http://localhost:5000/api/v1/courses?keyword=${searchKeyword}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCourses(result.courses);
      });
  };

  const getCategoryCourses = (category) => {
    if (category == "All") {
      getCourses();
    } else {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(
        `http://localhost:5000/api/v1/courses?category=${category}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setCourses(result.courses);
        });
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const renderCourses = () => {
    if (courses.length > 0) {
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
            <h2 className="text-lg pt-2 font-medium title-font">
              {course.name}
            </h2>
          </div>
        </Link>
      ));
    } else {
      return <div className="mt-3">No matching posts found</div>;
    }
  };

  return (
    <div>
      <AuthPageHeader currentTab="Learn" />

      <div className="bg-gray-50 flex flex-row justify-center">
        <SearchBar
          className=""
          input={keyword}
          updateInput={updateInput}
          handleSearch={handleSearch}
        />
        <CourseCategoryDropdown
          className=""
          onFilterCategory={onFilterCategory}
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
