import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Images
import img1 from "../../../assets/HomeBanner/1.jpg";
import img2 from "../../../assets/HomeBanner/2.jpg";
import img3 from "../../../assets/HomeBanner/3.jpg";
import img4 from "../../../assets/HomeBanner/4.jpg";
import img5 from "../../../assets/HomeBanner/5.jpg";

const slides = [img1, img2, img3, img4, img5];

const Banner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  // ✅ Handle button click
  const handleGoToApartment = () => {
    const token = localStorage.getItem("access-token"); // adjust if you saved JWT with different name
    if (token) {
      navigate("/apartment");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
      >
        {slides.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="h-[500px] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center px-4">
                <div
                  data-aos="fade-down"
                  className="text-center w-full md:w-3/4 lg:w-2/3"
                >
                  <h1 className="text-white text-2xl md:text-3xl lg:text-6xl font-serif uppercase mb-2">
                    Welcome to Homex
                  </h1>
                  <p className="text-gray-300 text-lg md:text-xl lg:text-2xl mb-6">
                    Your Smart Building Management Solution
                  </p>

                  {/* ✅ Replaced Search bar with button */}
                  <button
                    onClick={handleGoToApartment}
                    className="py-3 px-8 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-blue-800 transition-colors"
                  >
                    View Apartments
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
