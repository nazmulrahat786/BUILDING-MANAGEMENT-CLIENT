import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import img1 from ".././../../../assets/HomeBanner/pro.jpg";
import Divider from "../../../../Component/Shared/Divider";
import useApartment from "../../../../Hooks/useApartment/useApartment";
import loading from "/loading.gif";
import useMangeMember from "../../../../Hooks/useMangeMember/useMangeMember";
import useBookedRoom from "../../../../Hooks/useBookedRoom/useBookedRoom";

const AdminProfile = () => {
  const [apartment, , isLoading] = useApartment();
  const [totaluser] = useMangeMember();
  const [bookedRoom] = useBookedRoom();
  const { user } = useAuth();

  const member = totaluser?.filter((item) => item.role === "member");
  const availableRoom =
    ((apartment?.length - bookedRoom?.length) * 100) / apartment?.length;

  if (isLoading) {
    return <img src={loading} alt="" className="mx-auto mt-28" />;
  }

  return (
    <div className="bg-gradient-to-br from-blue-900 to-purple-800 min-h-screen p-6 text-white">
      <Divider header="Profile Info" />

      <div className="flex flex-col lg:flex-row justify-center gap-6 mt-10">
        {/* User Info Card */}
        <div className="bg-blue-800 p-6 rounded-xl shadow-md text-center w-full lg:w-1/3">
          <img
            src={user?.photoURL}
            alt=""
            className="h-24 w-24 rounded-full mx-auto mb-4 border-2 border-white"
          />
          <h1 className="text-xl font-bold">{user?.displayName}</h1>
          <p className="text-sm text-gray-200">{user?.email}</p>
        </div>

        {/* Statistics Card */}
        <div className="bg-blue-800 p-6 rounded-xl shadow-md w-full lg:w-2/3">
          <h2 className="text-lg font-semibold mb-4">Statistics</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Total Rooms: {apartment?.length}</p>
              <div className="h-4 w-full bg-white/20 rounded mt-1">
                <div
                  className="h-4 bg-green-500 rounded"
                  style={{ width: `${availableRoom}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">
                {availableRoom.toFixed(0)}% Available,{" "}
                {(100 - availableRoom).toFixed(0)}% Booked
              </p>
            </div>

            <div>
              <p className="font-medium">Total Users: {totaluser?.length}</p>
            </div>

            <div>
              <p className="font-medium">Total Members: {member?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
