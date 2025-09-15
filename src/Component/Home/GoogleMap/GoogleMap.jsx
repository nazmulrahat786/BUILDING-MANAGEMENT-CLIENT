import Divider from "../../Shared/Divider";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const GoogleMap = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-in-out" });
  }, []);

  return (
    <div className="px-4 md:px-10 lg:px-20 mt-14 mb-20 lg:mb-32">
      {/* Section Title */}
      <Divider header="Building Location" />

      <div className="flex flex-col lg:flex-row gap-8 items-start mt-8">
        {/* Google Map */}
        <div
          className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-lg"
          data-aos="zoom-in-down"
        >
          <iframe
            src="https://maps.google.com/maps?q=House%2020%20Road%20104,%20Gulshan,%20Dhaka%201212&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            title="Homex Apartment Location"
            frameBorder="0"
            scrolling="no"
            className="w-full h-64 md:h-96 lg:h-[500px] border-2 border-blue-500 rounded-xl"
          ></iframe>
        </div>

        {/* Instructions */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h1
            className="text-2xl md:text-4xl font-serif font-semibold text-gray-800 dark:text-gray-200"
            data-aos="fade-up"
          >
            How to Find Homex Apartment?
          </h1>

          <p
            className="text-base md:text-lg font-sans text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
          >
            <span className="font-semibold">Use a Navigation App:</span> Open{" "}
            <span className="text-blue-600 dark:text-blue-400">Google Maps</span>{" "}
            or Apple Maps, enter the apartment address, and follow turn-by-turn
            directions.
          </p>

          <p
            className="text-base md:text-lg font-sans text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
          >
            <span className="font-semibold">Ask Locals:</span> If you are near
            Gulshan, ask residents or shopkeepers—they can guide you directly to
            <span className="font-semibold"> Homex</span>.
          </p>

          <p
            className="text-base md:text-lg font-sans text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
          >
            <span className="font-semibold">Public Transportation:</span> Use a
            bus, taxi, or ride-sharing service and share the exact address with
            the driver for a hassle-free journey.
          </p>

          <p
            className="text-base md:text-lg font-sans text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
          >
            <span className="font-semibold">Check Online Maps:</span> Review the
            route beforehand to identify major{" "}
            <span className="font-semibold">landmarks</span> and roads near
            Gulshan for easy navigation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
