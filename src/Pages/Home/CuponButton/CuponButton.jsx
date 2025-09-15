import { useState, useEffect } from 'react';
import './CouponButton.css';
import couponsImg from '/coupons2.gif'
import useCupon from '../../../Hooks/useCupon/useCupon';
const CuponButton = () => {
    const [showButton, setShowButton] = useState(false);
    const [showCouponButton, setShowCouponButton] = useState(false)
    const [cupon] = useCupon()
    console.log("button:",showButton)
    // useEffect(() => {
    //     setShowButton(false);
    // }, []);
    console.log(showCouponButton)
    // Show the button when scrolling
    const handleScroll = () => {
        const scrollY = window.scrollY;
        console.log(scrollY)
        setShowButton(scrollY > 100); // Adjust the scroll threshold as needed
        // setShowButton(scrollY < 1000); // Adjust the scroll threshold as needed
    };

    // Attach the scroll event listener when the component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className={`z-10 coupon-button ${showButton ? 'visible' : 'hidden'} `}>
            {/* Your button content goes here */}
            <div className={`${!showCouponButton ? 'hidden' : 'visible'}`}>
                {/* close button */}
                <h1 onClick={() => setShowCouponButton(false)} className='absolute w-full flex justify-end'><span className='bg-slate-300 px-2 text-red-600 font-bold rounded-tr-md  w-[24px]'>X</span></h1>
            </div>
            {/* open button */}
            <button className='' onClick={() => setShowCouponButton(true)}>
                {
                    !showCouponButton ?
                        <div >
                            <img src={couponsImg} alt="" className='h-[80px] mr-5' />
                            <span className='font-sans font-semibold text-black'>Coupon</span>
                        </div>
                        :
                        <div className='bg-[#040404c2] rounded-lg px-5 py-2 shadow-lg shadow-blue-500'>

                            <div className="overflow-x-auto">
                                <table className="table text-white">
                                    {/* head */}
                                    <thead>
                                        <tr className='text-white text-lg'>
                                            <th>Code</th>
                                            <th>Discount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cupon?.map(item => {
                                            return (
                                                <tr key={item?._id}>
                                                    <td><p>{item?.cuponCode}</p></td>
                                                    <td>{item?.discount}%</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                }
            </button>
        </div>
    );
};

export default CuponButton;
