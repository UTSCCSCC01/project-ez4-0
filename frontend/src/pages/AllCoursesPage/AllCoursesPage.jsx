import { useState, useEffect } from "react";
import AuthPageHeader from "../../components/AuthPageHeader";
import "../../css/PostBoxComponent.css";

export default function AllCourses({ onCreatePost }) {
  const [courses, setCourses] = useState([]);

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

  useEffect(() => {
    getCourses();
  }, []);

  const renderCourses = () => {
    return courses.map((course) => (
      <div className="xl:w-1/3 md:w-1/2 p-10" key={course.id}>
        <div className="border border-gray-300 p-3 rounded-lg">
          <img
            className="rounded"
            src="https://picsum.photos/536/354"
            alt="User post image"
          />
          <h2 className="text-lg pt-2 font-medium title-font">{course.name}</h2>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-gray-50">
      <AuthPageHeader currentTab="Learn" />
      <div>
        <div className="max-w-6xl mx-auto px-5 py-3 ">
          <div className="flex flex-wrap -m-4">
            {renderCourses()}
          </div>
        </div>
      </div>
    </div>
  );
}
