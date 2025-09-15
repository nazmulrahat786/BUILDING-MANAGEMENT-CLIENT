import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import useBookedRoom from "../../Hooks/useBookedRoom/useBookedRoom";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import loading from '/loading.gif';
import { useState } from "react";

const ApartmentCard = ({ apartment }) => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [role] = useAdmin();
    const [bookedRoom, isLoading] = useBookedRoom();
    const [imgLoaded, setImgLoaded] = useState(false);

    AOS.init();

    const { _id, apartmentImage, floorNo, blockName, apartmentNo, rent, roomNo } = apartment;

    if (isLoading) return <img src={loading} alt="Loading..." className="mx-auto mt-28" />;

    const formattedDate = new Date().toLocaleDateString('en-US', {
        month: '2-digit', day: '2-digit', year: 'numeric'
    });

    const isUnavailable = bookedRoom?.some(item => item.RoomNo === roomNo);

    const handleAgreement = () => {
        if (!user) return handleCheckLogin();

        const agreementInfo = {
            userName: user.displayName,
            userEmail: user.email,
            floorNo,
            apartmentNo,
            blockName,
            rent: parseInt(rent),
            status: 'pending',
            requestDate: formattedDate,
            roomNo
        };

        axiosPublic.post('/ageement', agreementInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Agreement request sent successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something went wrong, please try again",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const handleAlreadyBooked = () => {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "You already booked a room",
            showConfirmButton: false,
            timer: 1500
        });
    };

    const handleCheckLogin = () => {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Please login first",
            showConfirmButton: false,
            timer: 1500
        });
        navigate('/login');
    };

    return (
        <div className="card bg-base-100 shadow-lg hover:shadow-xl mt-4 transition-all" data-aos="fade-up">
            <figure className="relative">
                {!imgLoaded && (
                    <img
                        src={loading}
                        alt="Loading..."
                        className="absolute top-0 left-0 h-60 w-full object-cover rounded-t-lg"
                    />
                )}
                <img
                    src={apartmentImage}
                    alt={`Apartment ${apartmentNo}`}
                    className={`h-60 w-full object-cover rounded-t-lg transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImgLoaded(true)}
                />
            </figure>
            <div className="p-5 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <p className="font-semibold text-lg">Apartment No: <span className="text-blue-600">{apartmentNo}</span></p>
                    <p className="font-semibold text-lg">Rent: <span className="text-red-600">{rent}৳</span></p>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <p className="font-semibold text-lg">Block: <span className="text-blue-600">{blockName} Block</span></p>
                    <p className="font-semibold text-lg">Floor: <span className="text-blue-600">{floorNo}</span></p>
                </div>
                <div className="text-center mt-4">
                    {isUnavailable ? (
                        <button className="btn btn-disabled w-full">Unavailable</button>
                    ) : role === 'member' ? (
                        <button className="btn btn-primary w-full" onClick={handleAlreadyBooked}>Agreement</button>
                    ) : (
                        <button className="btn btn-primary w-full" onClick={handleAgreement}>
                            {user ? 'Agreement' : 'Login to Request'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApartmentCard;
