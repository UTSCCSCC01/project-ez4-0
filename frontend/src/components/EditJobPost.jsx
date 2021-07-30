import { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import "../css/PostBoxComponent.css";

export default function EditJobPostComponent({ onUpdateJobPost, jobPostId }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");
  const [successRedirect, setSuccessRedirect] = useState(false);

  const getInfo = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const api = `http://localhost:5000/api/v1/job_posts/${jobPostId}`;
    fetch(api, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTitle(result.title);
        setLocation(result.location);
        setCompany(result.company);
        setDescription(result.description || "");
        setRequirement(result.requirements?.join(",") || "");
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const onCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onRequirementChange = (e) => {
    setRequirement(e.target.value);
  };

  const onJobPostSubmit = (e) => {
    e.preventDefault();
    const { newDescription, tags } = splitTags(description);
    onUpdateJobPost(
      title,
      location,
      company,
      newDescription,
      requirement,
      tags
    );
    setSuccessRedirect(true);
  };

  const splitTags = (description) => {
    let copied = description;
    let tags = [];
    const matches = description.match(/#.*?#/g);
    if (matches) {
      tags = matches.map((m) => {
        copied = copied.replaceAll(m, "");
        return m.replaceAll("#", "");
      });
    }
    return { newDescription: copied.trim(), tags: tags };
  };

  if (successRedirect) {
    return <Redirect to="/all_jobs"/>
  }

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <form
        className=" max-w-2xl flex-col mx-auto my-auto mt-8 p-10 bg-white rounded shadow-xl leading-loose"
        onSubmit={onJobPostSubmit}
      >
        <div>
          <p className="text-gray-800 font-medium text-xl text-center">
            Edit Job Post
          </p>
          <label className="block ml-2 text-base text-gray-00">Job Title</label>
          <input
            className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded"
            id="job_title"
            name="job_title"
            placeholder="Title"
            onChange={onTitleChange}
            value={title}
          ></input>
        </div>
        <div className="mt-2">
          <label className="block ml-2 text-base text-gray-600">
            Job Location
          </label>
          <input
            className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded"
            id="job_location"
            name="job_location"
            placeholder="Location"
            onChange={onLocationChange}
            value={location}
          ></input>
        </div>
        <div className="mt-2">
          <label className="block ml-2 text-base text-gray-600">
            Company Name
          </label>
          <input
            className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded"
            id="job_company"
            name="job_company"
            placeholder="Company Name"
            onChange={onCompanyChange}
            value={company}
          ></input>
        </div>
        <div className="mt-2">
          <label className="block ml-2 text-base text-gray-600">
            Job Description
          </label>
          <textarea
            className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded"
            id="job_description"
            name="job_description"
            rows="4"
            placeholder="Description"
            onChange={onDescriptionChange}
            value={description}
          ></textarea>
        </div>
        <div className="mt-2">
          <label className="block ml-2 text-base text-gray-600">
            Job Requirement
          </label>
          <textarea
            className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded"
            id="job_requirement"
            name="job_requirement"
            rows="4"
            placeholder="Requirement"
            onChange={onRequirementChange}
            value={requirement}
          ></textarea>
        </div>
        <div className="mt-4">
          {" "}
          <button
            disabled={
              title === "" ||
              company === "" ||
              location === "" ||
              description === ""
            }
            className="customize-post-box-post-btn group relative w-1/6 flex justify-center py-2 px-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            //type="submit"
          >
            Save
          </button>{" "}
        </div>
      </form>
    </div>
  );
}
