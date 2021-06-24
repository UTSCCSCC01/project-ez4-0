import LandingPageContent from "../../components/LandingPageContent";
import LandingPageHeader from "../../components/UnAuthPageHeader";

const LandingPage = () => {
  return (
    <>
      <main>
        <LandingPageHeader />
        <div className=" pt-32">
        <LandingPageContent/>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
