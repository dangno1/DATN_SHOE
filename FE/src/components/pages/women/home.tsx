import Slider from "./banner";
import WomenList from "./womenList";
import Blog from "../home/blog";
import Social from "../home/social";
import Socials from "./socials";

const Women = () => {
  return (
    <div>
      <Slider />
      <Socials />
      <WomenList />
      <Social/>
      <Blog/>
    </div>
  );
};

export default Women;
