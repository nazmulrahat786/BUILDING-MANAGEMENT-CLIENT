import Divider from "../../../Component/Shared/Divider";
import useAuth from "../../../Hooks/useAuth";
import img1 from "../../../assets/HomeBanner/pro.jpg";

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div
      
      className="bg-cover bg-gradient-to-br from-blue-700 to-purple-800 bg-center min-h-screen"
    >
      <div className="bg-black/60 min-h-screen p-6">
        {/* Header */}
        <div className="text-white pt-20">
          <Divider header="Profile Info" />
        </div>

        {/* Profile Card */}
        <div className="flex justify-center mt-10">
          <div className="flex flex-col md:flex-row gap-10 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-4xl text-white">
            {/* User Info */}
            <div className="flex flex-col items-center space-y-3 md:space-y-4 md:w-1/3">
              <img
                src={user?.photoURL}
                alt="User"
                className="h-24 w-24 rounded-full border-2 border-white"
              />
              <h1 className="text-2xl font-bold text-center">
                {user?.displayName}
              </h1>
              <p className="text-sm text-gray-300 text-center">{user?.email}</p>
            </div>

            {/* Apartment Info */}
            <div className="flex flex-col justify-center space-y-3 md:w-2/3">
              <div className="flex justify-between">
                <span className="font-semibold text-lg">Apartment No.:</span>
                <span className="text-gray-400 font-normal">None</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-lg">Floor No.:</span>
                <span className="text-gray-400 font-normal">None</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-lg">Block Name:</span>
                <span className="text-gray-400 font-normal">None</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-lg">Room No.:</span>
                <span className="text-gray-400 font-normal">None</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-lg">
                  Agreement Accept Date:
                </span>
                <span className="text-gray-400 font-normal">None</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
