import logo from "./logo.svg";
import "./css/App.css";
import LandingPageHeader from "./components/LandingPageHeader";
import LandingPageContent from "./components/LandingPageContent";

function App() {
  return (
    <div>
      <LandingPageHeader />
      <main
        className="mt-10 mx-auto max-w-7xl 
      sm:mt-12 sm:px-6 md:mt-16 lg:mt-20"
      >
        <LandingPageContent />
      </main>
    </div>
  );
}

export default App;
