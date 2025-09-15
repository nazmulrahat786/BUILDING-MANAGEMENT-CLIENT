import img1 from '../../../assets/HomeBanner/1.jpg';
import img2 from '../../../assets/HomeBanner/2.jpg';
import img3 from '../../../assets/HomeBanner/3.jpg';
import img5 from '../../../assets/HomeBanner/5.jpg';
import img6 from '../../../assets/HomeBanner/k.jpg';
import img7 from '../../../assets/HomeBanner/l.jpg';
import Divider from '../../Shared/Divider';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
    AOS.init();

    const aosClass = "data-aos='fade-up' data-aos-easing='linear' data-aos-duration='1500'";

    return (
        <div className="px-4 md:px-10 lg:px-20 mt-20 mb-10">
            <div className='mb-10'>
                <Divider header={'About This Building'} />
            </div>

            <div className='flex flex-col lg:flex-row gap-8 items-center'>
                {/* Image Gallery */}
                <div className='w-full lg:w-1/2 grid grid-cols-3 gap-2'>
                    <img src={img1} alt="" className='col-span-2 row-span-2 w-full h-full object-cover border rounded-lg' data-aos="fade-up" />
                    <img src={img2} alt="" className='w-full h-full object-cover border rounded-lg' data-aos="fade-down" />
                    <img src={img3} alt="" className='w-full object-cover border rounded-lg' data-aos="fade-left" />
                    <img src={img5} alt="" className='w-full h-20 md:h-48 object-cover border rounded-lg' data-aos="fade-right" />
                    <img src={img6} alt="" className='w-full h-20 md:h-48 object-cover border rounded-lg' data-aos="fade-up" />
                    <img src={img7} alt="" className='w-full h-20 md:h-48 object-cover border rounded-lg' data-aos="fade-left" />
                </div>

                {/* Text Content */}
                <div className='w-full lg:w-1/2 space-y-4 md:px-4'>
                    <h1 className='font-serif font-bold text-2xl md:text-4xl' data-aos="fade-down">
                        Remarkable 2500 Sq Ft Ready Apartment For Rent In Gulshan
                    </h1>
                    <p className='font-sans text-base md:text-lg' data-aos="fade-down">
                        Nestled in the prestigious neighborhood of Gulshan, this extraordinary 4-bedroom, 4-bathroom residential flat for rent offers an expansive 2500 sq ft of sophisticated living space.
                    </p>
                    <p className='font-sans text-base md:text-lg' data-aos="fade-down">
                        Beyond the allure of the interior, residents benefit from practical amenities such as a well-equipped kitchen, parking space, elevators, CCTV security, and electricity backup, ensuring a hassle-free and secure living experience.
                    </p>
                    <p className='font-sans text-base md:text-lg' data-aos="fade-down">
                        Gulshan is renowned for its upscale lifestyle, and this rental property is strategically located to take full advantage of the area's amenities. Reputable educational institutions are within reach, offering top-notch learning opportunities for families.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
