import GoogleMap from "../../Component/Home/GoogleMap/GoogleMap";
import About from "../../Component/Home/About/About";
import Banner from "../../Component/Home/Banner/Banner";
import CuponButton from "./CuponButton/CuponButton";
import FeatureRoom from "../../Component/Home/feature/FeatureRoom";
  

const Home = () => {
    return (
        <div className="overflow-x-hidden " >
           
            <Banner></Banner>

        <div className=" flex flex-col justify-center items-center">
               <div className="px-5 max-w-[1440px] md:px-20">
           <About></About>
           </div>
           
           <div className="px-5 max-w-[1440px] md:px-20 mt-10 lg:mt-20">
            <GoogleMap></GoogleMap>
           </div>
           
            <div className=""><FeatureRoom></FeatureRoom></div>
            <div className="max-w-[1440px]"> <CuponButton></CuponButton></div>
           
        </div>
        
        </div>
    );
};

export default Home;
