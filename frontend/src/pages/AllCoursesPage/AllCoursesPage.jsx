import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthPageHeader from "../../components/AuthPageHeader";
import "../../css/PostBoxComponent.css";
import { SearchIcon } from "@heroicons/react/outline";
import CourseCategoryDropdown from "../../components/CourseCategoryDropdown";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

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

  const onSearchKeyDown = (e) => {
    if (e.code === "Enter") {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      let reqUrl = "";
      if (category === "All") {
        if (keyword) {
          reqUrl = `http://localhost:5000/api/v1/courses?keyword=${keyword}`;
        } else {
          getCourses();
        }
      } else {
        if (keyword) {
          reqUrl = `http://localhost:5000/api/v1/courses?keyword=${keyword}&category=${category}`;
        } else {
          reqUrl = `http://localhost:5000/api/v1/courses?category=${category}`;
        }
      }
      fetch(reqUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setCourses(result.courses);
        });
    }
  };

  const setSelectedCategory = (category) => {
    setCategory(category);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let reqUrl = "";
    if (category === "All") {
      if (keyword) {
        reqUrl = `http://localhost:5000/api/v1/courses?keyword=${keyword}`;
      } else {
        getCourses();
      }
    } else {
      if (keyword) {
        reqUrl = `http://localhost:5000/api/v1/courses?keyword=${keyword}&category=${category}`;
      } else {
        reqUrl = `http://localhost:5000/api/v1/courses?category=${category}`;
      }
    }
    fetch(reqUrl, requestOptions)
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
      return <div className="mt-6 w-full text-center">No courses found</div>;
    }
  };

  return (
    <div>
      <AuthPageHeader currentTab="Learn" />

      <div className="bg-gray-50 flex flex-row justify-center">
        <div className="pt-6 px-4 rounded-md bg-opacity-20 bg-white flex place-items-center md:w-1/2">
          <SearchIcon className="h-5 bg-white mr-3" />
          <input
            className=" flex-auto mx-auto ml-1 my-auto p-2 bg-white rounded shadow-md"
            value={keyword}
            placeholder={"Search courses by keyword"}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={onSearchKeyDown}
          />
        </div>
        <CourseCategoryDropdown onFilterCategory={setSelectedCategory} />
      </div>

      <div className="h-screen bg-gray-50">
        <div>
          <div className="max-w-6xl mx-auto px-5 py-3 ">
            <div className="flex flex-wrap -m-4">{renderCourses()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
