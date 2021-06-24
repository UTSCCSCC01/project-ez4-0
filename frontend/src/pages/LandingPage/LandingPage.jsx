import LandingPageContent from "../../components/LandingPageContent";
import LandingPageHeader from "../../components/LandingPageHeader";

const LandingPage = () => {
  return (
    <>
      <LandingPageHeader />
      <main className=" mt-24">
        <LandingPageContent />
      </main>
    </>
  );
};

export default LandingPage;
