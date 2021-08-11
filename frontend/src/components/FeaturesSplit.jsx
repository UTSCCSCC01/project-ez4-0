import img1 from "../img/img1.png";
import img2 from "../img/img2.png";
import img3 from "../img/img3.png";
import Fade from "react-reveal/Fade";
const Card = ({ title, subtitle, content, img }) => {
  return (
    <>
      <div className="flex flex-wrap">
        {/* // p-8 rounded-md border shadow-md"> */}
        <div className="mr-0 md:mr-24">
          <div className=" text-indigo-500 font-medium mb-1">{subtitle}</div>
          <h3 className=" text-2xl font-bold mb-8">{title}</h3>
          <p className=" w-72 md:w-96">{content}</p>
        </div>
        <div className="mt-12 lg:mt-0">
          <img className="w-96" src={img} />
        </div>
      </div>
    </>
  );
};

const FeaturesSplit = () => {
  return (
    <div className="mx-16 space-y-28">
      <Fade left>
        <Card
          img={img1}
          title="Community for Everyone"
          subtitle="POST ANYTHING"
          content="You can post anything you want for your business and future, no matter you are a startup entrepreuner, learner or a recruiter."
        />
      </Fade>
      <Fade left>
        <Card
          img={img3}
          title="Find Your Partners"
          subtitle="FIND YOUR PARTNERS"
          content="Find your partners on our website. You can post anything you want for your business and future, no matter you are a startup entrepreuner, learner or a recruiter."
        />
      </Fade>
      <Fade left>
        <Card
          img={img2}
          title="Learn New Things"
          subtitle="LEARNING COMUNITY"
          content="You can post anything you want for your business and future, no matter you are a startup entrepreuner, learner or a recruiter."
        />
      </Fade>
      <Fade left>
        <Card
          img={img1}
          title="Community for Everyone"
          subtitle="COMMUNITY FOR EVERYONE"
          content="You can post anything you want for your business and future, no matter you are a startup entrepreuner, learner or a recruiter."
        />
      </Fade>
    </div>
  );
};

export default FeaturesSplit;
