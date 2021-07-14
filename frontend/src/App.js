import "./css/App.css";
import Router from "./Router";
import JobPost from "./components/JobPost.jsx";
import AllJobPosting from "./components/AllJobPosting";
import MakeJobPost from "./components/MakeJobPost";
import AuthPageHeader from "./components/AuthPageHeader";

function App() {
  return (
    <div>
      <AuthPageHeader />
      <MakeJobPost />
    </div>
  );
}

export default App;
