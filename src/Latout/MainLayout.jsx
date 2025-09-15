import { Outlet } from "react-router-dom";
import Navbar from "../Component/Shared/Navbar/Navbar";
import Footer from "../Component/Shared/Footer/Footer";

const MainLayout = () => {
   
    return (
        <div className=" mx-auto  h-full">
            <Navbar></Navbar>
            <div className="min-h-[85vh]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            

        </div> 
    );
};

export default MainLayout;
