import LandingPageContent from "../../components/LandingPageContent";
import UnAuthPageHeader from "../../components/UnAuthPageHeader";
import SearchBar from "../../components/SearchBar";
const LandingPage = () => {
  return (
    <>
      <main>
        <UnAuthPageHeader />
        <div className=" pt-32">
          <SearchBar />
          <LandingPageContent />
        </div>
      </main>
    </>
  );
};

export default LandingPage;
