import img1 from '../../../assets/HomeBanner/1.jpg';
import img2 from '../../../assets/HomeBanner/2.jpg';
import img3 from '../../../assets/HomeBanner/3.jpg';
import img5 from '../../../assets/HomeBanner/5.jpg';
import img6 from '../../../assets/HomeBanner/k.jpg';
import img7 from '../../../assets/HomeBanner/l.jpg';
import Divider from '../../Shared/Divider';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const About = () => {
  // Initialize AOS once
  useEffect(() => {
    AOS.init({ duration: 1200, easing: 'ease-in-out' });
  }, []);

  return (
    <div className="px-4 md:px-10 lg:px-20 mt-20 mb-10">
      {/* Section Title */}
      <div className="mb-10">
        <Divider header={'About Homex'} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2 grid grid-cols-3 gap-2">
          <img
            src={img1}
            alt="Homex Apartment"
            className="col-span-2 row-span-2 w-full h-full object-cover border rounded-lg shadow-lg"
            data-aos="fade-up"
          />
          <img
            src={img2}
            alt="Homex Apartment"
            className="w-full h-full object-cover border rounded-lg shadow-lg"
            data-aos="fade-down"
          />
          <img
            src={img3}
            alt="Homex Apartment"
            className="w-full object-cover border rounded-lg shadow-lg"
            data-aos="fade-left"
          />
          <img
            src={img5}
            alt="Homex Apartment"
            className="w-full h-20 md:h-48 object-cover border rounded-lg shadow-lg"
            data-aos="fade-right"
          />
          <img
            src={img6}
            alt="Homex Apartment"
            className="w-full h-20 md:h-48 object-cover border rounded-lg shadow-lg"
            data-aos="fade-up"
          />
          <img
            src={img7}
            alt="Homex Apartment"
            className="w-full h-20 md:h-48 object-cover border rounded-lg shadow-lg"
            data-aos="fade-left"
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-4 md:px-4">
          <h1
            className="font-serif font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200"
            data-aos="fade-down"
          >
            Discover Luxury Living at Homex
          </h1>
          <p
            className="font-sans text-base md:text-lg text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
          >
            Welcome to <span className="font-semibold">Homex</span> – your
            trusted destination for modern living. Our 2500 sq ft ready
            apartments in the heart of Gulshan are designed to provide both
            comfort and sophistication, tailored to your lifestyle.
          </p>
          <p
            className="font-sans text-base md:text-lg text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
          >
            Each apartment is thoughtfully crafted with spacious interiors,
            4 bedrooms, 4 bathrooms, a fully equipped kitchen, elevators, CCTV
            security, and electricity backup – ensuring a secure and
            hassle-free experience.
          </p>
          <p
            className="font-sans text-base md:text-lg text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
          >
            Located in one of Dhaka’s most prestigious neighborhoods, Homex
            places you close to top educational institutions, healthcare
            facilities, and shopping centers, offering you unmatched convenience
            and an upscale lifestyle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
