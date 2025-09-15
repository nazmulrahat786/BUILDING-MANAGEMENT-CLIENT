import Swal from "sweetalert2";
import useMangeMember from "../../../../Hooks/useMangeMember/useMangeMember";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import Divider from "../../../../Component/Shared/Divider";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [totaluser, refetch] = useMangeMember();
  const member = totaluser?.filter((item) => item.role === "member");

  const handleMemberShip = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove membership access.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/userRole?id=${id}`).then((res) => {
          refetch();
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Member removed successfully",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              title: "Something went wrong. Please try again.",
              icon: "error",
            });
          }
        });
      }
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-purple-800 min-h-screen">
      <div className="bg-black/70 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-white pt-10 w-full max-w-6xl">
          <Divider header={"Manage Members"} />
        </div>

        {/* Members Section */}
        <div className="w-full max-w-6xl mt-10 pb-20 space-y-4">
          {member?.length === 0 && (
            <p className="text-center text-gray-300 py-10 text-lg">
              No members found
            </p>
          )}

          {member?.map((item) => (
            <div
              key={item?._id}
              className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-lg text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={item.photoUrl} alt={item?.name} />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{item?.name}</p>
                  <p className="text-gray-300 text-sm">{item?.email}</p>
                </div>
              </div>

              {/* Action */}
              <div className="w-full sm:w-auto flex sm:flex-none justify-end">
                <button
                  onClick={() => handleMemberShip(item?._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md w-full sm:w-auto transition-all duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;
