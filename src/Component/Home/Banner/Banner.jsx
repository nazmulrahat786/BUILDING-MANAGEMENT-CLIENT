import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Images
import img1 from '../../../assets/HomeBanner/1.jpg';
import img2 from '../../../assets/HomeBanner/2.jpg';
import img3 from '../../../assets/HomeBanner/3.jpg';
import img4 from '../../../assets/HomeBanner/4.jpg';
import img5 from '../../../assets/HomeBanner/5.jpg';

const slides = [img1, img2, img3, img4, img5];

const Banner = () => {
    AOS.init();

    return (
        <div className="relative ">
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
                                <div data-aos="fade-down" className="text-center w-full md:w-3/4 lg:w-2/3">
                                    <h1 className="text-white text-2xl md:text-3xl lg:text-6xl font-serif uppercase mb-2">
                                        Jonab Ali Mention
                                    </h1>
                                    <p className="text-gray-300 text-lg md:text-xl lg:text-2xl mb-4">
                                        Ghasful And Most Beautiful Building in Gulshan
                                    </p>

                                    {/* Search bar visible on large screens */}
                                    <div className="hidden lg:flex justify-center items-center gap-0 mt-4">
                                        <input
                                            type="text"
                                            placeholder="Search Your Room..."
                                            className="w-full lg:w-2/3 p-3 rounded-l-xl outline-none"
                                        />
                                        <button className="py-3 px-5 rounded-r-xl bg-primary text-white font-semibold text-lg hover:bg-blue-800 transition-colors">
                                            Search
                                        </button>
                                    </div>
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
