import Swal from "sweetalert2";
import useAgreementUser from "../../../../Hooks/AgreementUser/useAgreementUser";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import Divider from "../../../../Component/Shared/Divider";

const AgreementRequests = () => {
  const [agreement, , refetch] = useAgreementUser();
  const axiosSecure = useAxiosSecure();

  const handleAcceptRequest = (id, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "to Accept this request",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/agreementsRequest?id=${id}&email=${email}`)
          .then((res) => {
            refetch();
            if (res.data.acceptStatus.modifiedCount) {
              Swal.fire("Successfully accepted this Request!", "", "success");
            } else {
              Swal.fire("Something went wrong, please try again", "", "error");
            }
          });
      }
    });
  };

  const handleRejectRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "to reject this request",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/agreementsRejectRequest?id=${id}`).then((res) => {
          refetch();
          if (res.data.modifiedCount) {
            Swal.fire("You rejected this Request!", "", "warning");
          } else {
            Swal.fire("Something went wrong, please try again", "", "error");
          }
        });
      }
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-purple-800 min-h-screen">
      <div className="bg-[#0606068a] min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-10">
        <div className="text-white pt-10 w-full max-w-6xl">
          <Divider header={"Agreement Request"} />
        </div>

        <div className="w-full max-w-6xl mt-10 pb-20 space-y-6">
          {agreement?.map((request, i) => (
            <div
              key={request?._id}
              className="bg-[#11123567] p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              {/* Desktop Table */}
              <div className="hidden sm:block text-white">
                <table className="table-auto w-full border-collapse text-white">
                  <thead>
                    <tr className="text-lg font-semibold border-b border-gray-400 text-white">
                      <th>#</th>
                      <th>User Name</th>
                      <th>User Email</th>
                      <th>Floor</th>
                      <th>Block</th>
                      <th>Room</th>
                      <th>Rent</th>
                      <th>Request Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-[#222c50a1] text-white">
                      <td>{i + 1}</td>
                      <td>{request?.userName}</td>
                      <td>{request?.userEmail}</td>
                      <td>{request?.floorNo}</td>
                      <td>{request?.blockName}</td>
                      <td>{request?.roomNo}</td>
                      <td>{request?.rent}</td>
                      <td>{request?.requestDate}</td>
                      <td className="flex gap-2">
                        {request?.status === "pending" ? (
                          <>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() =>
                                handleAcceptRequest(request?._id, request?.userEmail)
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-error btn-sm"
                              onClick={() => handleRejectRequest(request?._id)}
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <button className="btn btn-success btn-sm">Checked</button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout */}
              <div className="sm:hidden space-y-2 text-white">
                <p>
                  <span className="font-semibold">#:</span> {i + 1}
                </p>
                <p>
                  <span className="font-semibold">Name:</span> {request?.userName}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {request?.userEmail}
                </p>
                <p>
                  <span className="font-semibold">Floor:</span> {request?.floorNo}
                </p>
                <p>
                  <span className="font-semibold">Block:</span> {request?.blockName}
                </p>
                <p>
                  <span className="font-semibold">Room:</span> {request?.roomNo}
                </p>
                <p>
                  <span className="font-semibold">Rent:</span> {request?.rent}
                </p>
                <p>
                  <span className="font-semibold">Request Date:</span>{" "}
                  {request?.requestDate}
                </p>
                <div className="flex flex-col gap-2 mt-2">
                  {request?.status === "pending" ? (
                    <>
                      <button
                        className="btn btn-primary w-full"
                        onClick={() =>
                          handleAcceptRequest(request?._id, request?.userEmail)
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-error w-full"
                        onClick={() => handleRejectRequest(request?._id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-success w-full">Checked</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgreementRequests;
