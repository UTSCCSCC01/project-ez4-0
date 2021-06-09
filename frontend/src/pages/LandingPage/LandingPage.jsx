import LandingPageContent from "../../components/LandingPageContent";
import LandingPageHeader from "../../components/LandingPageHeader";

const LandingPage = () => {
  return (
    <>
      <LandingPageHeader />
      <main className="mt-16">
        <LandingPageContent />
      </main>
    </>
  );
};

export default LandingPage;
