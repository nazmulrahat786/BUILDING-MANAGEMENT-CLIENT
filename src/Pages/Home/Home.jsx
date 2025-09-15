import GoogleMap from "../../Component/Home/GoogleMap/GoogleMap";
import About from "../../Component/Home/About/About";
import Banner from "../../Component/Home/Banner/Banner";
import CuponButton from "./CuponButton/CuponButton";
import FeatureRoom from "../../Component/Home/feature/FeatureRoom";


const Home = () => {
    return (
        <div className="overflow-x-hidden" >
            <Banner></Banner>
           <div className="px-5 md:px-20">
           <About></About>
           </div>
           
           <div className="px-5 md:px-20 mt-10 lg:mt-20">
            <GoogleMap></GoogleMap>
           </div>
           
            <FeatureRoom></FeatureRoom>
           
           <CuponButton></CuponButton>
        </div>
    );
};

export default Home;