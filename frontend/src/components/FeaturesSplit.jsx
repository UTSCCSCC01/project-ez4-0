import img1 from "../img/UI-Bob's Scenario.png";
import img2 from "../img/UI-Alice's Scenario.png";
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
          subtitle="COMMUNITY FOR EVERYONE"
          content="It is a long established fact that a reader will be distracted by
        the readable content of a page when looking at its layout. The point
        of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English."
        />
      </Fade>
      <Fade left>
        <Card
          img={img2}
          title="Find Your Partners"
          subtitle="FIND YOUR PARTNERS"
          content="It is a long established fact that a reader will be distracted by
        the readable content of a page when looking at its layout. The point
        of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English."
        />
      </Fade>
      <Fade left>
        <Card
          img={img1}
          title="Community for Everyone"
          subtitle="COMMUNITY FOR EVERYONE"
          content="It is a long established fact that a reader will be distracted by
        the readable content of a page when looking at its layout. The point
        of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English."
        />
      </Fade>
      <Fade left>
        <Card
          img={img1}
          title="Community for Everyone"
          subtitle="COMMUNITY FOR EVERYONE"
          content="It is a long established fact that a reader will be distracted by
        the readable content of a page when looking at its layout. The point
        of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English."
        />
      </Fade>
    </div>
  );
};

export default FeaturesSplit;
