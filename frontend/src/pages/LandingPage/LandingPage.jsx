import LandingPageContent from "../../components/LandingPageContent";
import UnAuthPageHeader from "../../components/UnAuthPageHeader";
import SearchBar from "../../components/SearchBar";
import CourseTimeline from "../../components/CourseTimeline";

const LandingPage = () => {
  return (
    <>
      <main>
        {/* <UnAuthPageHeader /> */}
        <div className=" pt-32">
          <CourseTimeline />
          <LandingPageContent />
        </div>
      </main>
    </>
  );
};

export default LandingPage;
