import Divider from "../../Shared/Divider";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const GoogleMap = () => {
    useEffect(() => {
        AOS.init({ duration: 1200 });
    }, []);

    return (
        <div className="px-4 md:px-10 lg:px-20 mt-14 mb-20 lg:mb-32">
            <Divider header="Building Location" />

            <div className="flex flex-col lg:flex-row gap-8 items-start mt-8">
                {/* Google Map */}
                <div className="w-full lg:w-1/2" data-aos="zoom-in-down">
                    <iframe
                        src="https://maps.google.com/maps?q=House%2020%20Road%20104,%20Gulshan,%20Dhaka%201212&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                        title="Building Location"
                        frameBorder="0"
                        scrolling="no"
                        className="w-full h-64 md:h-96 lg:h-[500px] border-2 border-blue-500 rounded-lg"
                    ></iframe>
                </div>

                {/* Instructions */}
                <div className="w-full lg:w-1/2 space-y-4">
                    <h1 className="text-2xl md:text-4xl font-serif font-semibold" data-aos="fade-up">
                        How to get apartment’s location?
                    </h1>

                    <p className="text-lg font-sans" data-aos="fade-up">
                        <span className="font-semibold">Use a Navigation App:</span> Consider using a navigation app on your smartphone, such as Google Maps, Apple Maps, or another local navigation app. Enter the specific address, and the app will provide you with turn-by-turn directions.
                    </p>

                    <p className="text-lg font-sans" data-aos="fade-up">
                        <span className="font-semibold">Ask Locals:</span> If you're already in the area, asking locals for directions can be helpful. They might be able to guide you or provide additional tips on reaching your destination.
                    </p>

                    <p className="text-lg font-sans" data-aos="fade-up">
                        <span className="font-semibold">Public Transportation:</span> If you're using public transportation, such as buses or taxis, you can ask the operators or fellow passengers for assistance.
                    </p>

                    <p className="text-lg font-sans" data-aos="fade-up">
                        <span className="font-semibold">Check Online Maps:</span> Before you start your journey, you can use online maps to get an overview of the route. This can help you familiarize yourself with major landmarks and roads.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GoogleMap;
