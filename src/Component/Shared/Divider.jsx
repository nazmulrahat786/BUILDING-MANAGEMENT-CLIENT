import AOS from 'aos';
import 'aos/dist/aos.css';

const Divider = ({ header }) => {
    AOS.init()
    return (
        <div>
            <h1 className='font-serif font-bold text-4xl text-center ' data-aos="fade-up"
                data-aos-anchor-placement="top-bottom">{header}</h1>
            <div className='divider w-[5%] h-[2px] mx-auto bg-black ' data-aos="fade-up"
                data-aos-anchor-placement="top-bottom" ></div>
            <div className='divider w-[15%] h-[2px] mx-auto bg-black -mt-1' data-aos="fade-down"
                data-aos-anchor-placement="top-bottom"></div>
        </div>
    );
};

export default Divider;