import "./css/App.css";
import Router from "./Router";
import JobPost from "./components/JobPost.jsx";
import AllJobPosting from "./components/AllJobPosting";
import MakeJobPost from "./components/MakeJobPost";
import AuthPageHeader from "./components/AuthPageHeader";
import MakeJobPostPage from "./pages/MakeJobPostPage/MakeJobPostPage";

function App() {
  return (
    <div>
      <MakeJobPostPage />
    </div>
  );
}

export default App;
