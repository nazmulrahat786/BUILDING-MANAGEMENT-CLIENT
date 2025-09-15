import Divider from "../../../../Component/Shared/Divider";
import useAuth from "../../../../Hooks/useAuth";
import useBookedRoom from "../../../../Hooks/useBookedRoom/useBookedRoom";
import img1 from "../../../../assets/HomeBanner/pro.jpg";
import loading from "../../../../../public/loading.gif";
import { Link } from "react-router-dom";

const MakePayment = () => {
  const { user, loader } = useAuth();
  const [bookedRoom, isLoading] = useBookedRoom();

  if (isLoading || loader) {
    return <img src={loading} alt="loading" className="mx-auto mt-28" />;
  }

  const userofRoom =
    bookedRoom?.filter((item) => item?.userEmail === user?.email) || [];

  return (
    <div
    
      className="bg-cover bg-gradient-to-br from-blue-900 to-purple-800 min-h-screen"
    >
      <div className="bg-[#0606068a] min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-10">
        <div className="text-white pt-10 w-full max-w-6xl">
          <Divider header={"Payment For Your Room"} />
        </div>

        <div className="w-full max-w-6xl mt-10 pb-20 space-y-6">
          {userofRoom.length === 0 ? (
            <p className="text-center text-lg text-gray-200">
              No rooms booked yet.
            </p>
          ) : (
            userofRoom.map((item) => (
              <div
                key={item?._id}
                className="bg-[#d2d2db60] p-4 sm:p-6 rounded-2xl shadow-lg text-white hover:shadow-2xl transition-shadow"
              >
                {/* Desktop Table */}
                <div className="hidden sm:block">
                  <table className="table-auto w-full border-collapse text-white">
                    <thead>
                      <tr className="text-lg font-semibold border-b border-gray-400">
                        <th className="px-4 py-2 text-left">User Email</th>
                        <th className="px-4 py-2 text-left">Floor</th>
                        <th className="px-4 py-2 text-left">Block</th>
                        <th className="px-4 py-2 text-left">Room</th>
                        <th className="px-4 py-2 text-left">Apartment</th>
                        <th className="px-4 py-2 text-left">Rent</th>
                        <th className="px-4 py-2 text-left">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-[#222c50a1]">
                        <td className="px-4 py-2">{item?.userEmail}</td>
                        <td className="px-4 py-2">{item?.floorNo}</td>
                        <td className="px-4 py-2">{item?.blockName}</td>
                        <td className="px-4 py-2">{item?.RoomNo}</td>
                        <td className="px-4 py-2">{item?.apartmentNo}</td>
                        <td className="px-4 py-2">${item?.rent}</td>
                        <td className="px-4 py-2">
                          <Link to={`paymentForm/${item?._id}`}>
                            <button className="btn btn-sm btn-primary">
                              Pay Now
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card Layout */}
                <div className="sm:hidden space-y-2">
                  <p>
                    <span className="font-semibold">User Email:</span>{" "}
                    {item?.userEmail}
                  </p>
                  <p>
                    <span className="font-semibold">Floor:</span>{" "}
                    {item?.floorNo}
                  </p>
                  <p>
                    <span className="font-semibold">Block:</span>{" "}
                    {item?.blockName}
                  </p>
                  <p>
                    <span className="font-semibold">Room:</span> {item?.RoomNo}
                  </p>
                  <p>
                    <span className="font-semibold">Apartment:</span>{" "}
                    {item?.apartmentNo}
                  </p>
                  <p>
                    <span className="font-semibold">Rent:</span> ${item?.rent}
                  </p>
                  <div className="text-center mt-2">
                    <Link to={`paymentForm/${item?._id}`}>
                      <button className="btn btn-sm btn-primary w-full">
                        Pay Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
