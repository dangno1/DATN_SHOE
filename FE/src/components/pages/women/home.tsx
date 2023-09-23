import Header from "./header";
import Slider from "./banner";
import Footer from "../home/footer";
import WomenList from "./womenList";
import Social from "./social";

const Women = () => {
    return (
      <div>
          <Header/>
          <Slider/>
          <Social/>
         <WomenList/>
          <Footer/>
      </div>
    )
  }
  
  export default Women