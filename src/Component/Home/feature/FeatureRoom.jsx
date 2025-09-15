import React from 'react';
import Divider from '../../Shared/Divider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

// Images
import img1 from '../../../assets/HomeBanner/5.jpg';
import img2 from '../../../assets/HomeBanner/k.jpg';
import img3 from '../../../assets/HomeBanner/m.jpg';
import img4 from '../../../assets/HomeBanner/l.jpg';
import img5 from '../../../assets/HomeBanner/o.jpg';

const rooms = [
  { img: img1, aptNo: '01', rent: 15000, block: 'A', floor: '01', description: 'Spacious apartment with modern amenities and sunlight.' },
  { img: img2, aptNo: '02', rent: 15000, block: 'B', floor: '01', description: 'Comfortable, bright, and airy living space.' },
  { img: img3, aptNo: '03', rent: 15500, block: 'C', floor: '02', description: 'Elegant interiors with scenic views and premium finishes.' },
  { img: img4, aptNo: '04', rent: 16000, block: 'D', floor: '03', description: 'Luxury apartment with high-end fittings and furniture.' },
  { img: img5, aptNo: '05', rent: 16500, block: 'E', floor: '03', description: 'Modern apartment with all necessary conveniences.' },
];

const FeatureRoom = () => {
  return (
    <div className="pb-20 w-2/3 mx-auto  px-4 md:px-10">
      <Divider header="Recommended Rooms" />

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 25,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper py-10"
      >
        {rooms.map((room, index) => (
          <SwiperSlide
            key={index}
            className="w-[300px] sm:w-[320px] md:w-[360px] lg:w-[400px]"
          >
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300">
              
              {/* Recommended Badge */}
              <span className="absolute top-3 left-3 bg-red-500 text-white font-semibold text-xs px-3 py-1 rounded-full shadow-md z-10">
                Recommended
              </span>

              {/* Image */}
              <div className="relative border h-[250px] overflow-hidden">
                <img
                  src={room.img}
                  alt={`Apartment ${room.aptNo}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-lg font-bold drop-shadow-md">Apt {room.aptNo}</p>
                  <p className="text-sm drop-shadow-md">{room.block} Block | Floor {room.floor}</p>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="text-gray-700 text-sm md:text-base mb-4">{room.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-blue-600">{room.rent}৳</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md">
                    Book Now
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

export default FeatureRoom;
