// Import
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import useCupon from "../../../../Hooks/useCupon/useCupon";
import CuponCard from "./cuponCard";
import Divider from "../../../../Component/Shared/Divider";
import loading from "/loading.gif";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCoupons = () => {
  const axiosSecret = useAxiosSecure();
  const [cupons, isPending, refetch] = useCupon();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loading} alt="loading..." className="w-24" />
      </div>
    );
  }

  const handleManageCoupon = async (e) => {
    e.preventDefault();
    const cuponCode = e.target.cupon.value.trim();
    const discount = parseFloat(e.target.discount.value);
    const description = e.target.description.value.trim();

    if (!cuponCode || !discount || !description) {
      toast.error("⚠️ All fields are required!");
      return;
    }

    const newCoupon = { cuponCode, discount, description };

    try {
      const res = await axiosSecret.post("/cupons", newCoupon);
      if (res.data.insertedId) {
        refetch();
        e.target.reset();
        toast.success("✅ Successfully created a new coupon!");
        setIsModalOpen(false);
      } else {
        toast.error("❌ Failed to create coupon");
      }
    } catch (err) {
      toast.error("❌ Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="bg-cover bg-gradient-to-br from-blue-900 to-purple-800 min-h-screen">
      <div className="bg-[#060606cc] min-h-screen px-6 md:px-20 py-12">
        <div className="bg-[#111235a9] p-6 md:p-10 rounded-3xl shadow-lg">
          <div className="text-white text-center">
            <Divider header={"Coupon Management"} />
          </div>

          <div className="text-center mt-6">
            <button
              className="btn btn-primary px-6"
              onClick={() => setIsModalOpen(true)}
            >
              ➕ Create Coupon
            </button>
          </div>

          <div className="mt-10">
            <div className="text-white mb-4">
              <Divider header={"Available Coupons"} />
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="table w-full text-white">
                <thead>
                  <tr className="bg-[#1f2937] text-lg">
                    <th>ID</th>
                    <th>Coupon</th>
                    <th>Discount</th>
                    <th>Description</th>
                    <th colSpan="2" className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cupons?.map((item) => (
                    <CuponCard key={item._id} item={item} refetch={refetch} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden mt-6">
              {cupons?.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#1f2937aa] text-white rounded-xl p-4 shadow-md"
                >
                  <h3 className="font-semibold text-lg">{item.cuponCode}</h3>
                  <p className="mt-1">
                    Discount:{" "}
                    <span className="badge badge-success">{item.discount}%</span>
                  </p>
                  <p className="mt-1 text-sm">{item.description}</p>
                  <div className="flex gap-2 mt-3">
                    <CuponCard item={item} refetch={refetch} isMobile={true} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg relative w-full max-w-md p-6">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-4 text-gray-800">
              Create a New Coupon
            </h3>

            <form className="space-y-4" onSubmit={handleManageCoupon}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Coupon Code
                </label>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="input input-bordered w-full mt-1"
                  required
                  name="cupon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Discount (%)
                </label>
                <input
                  type="number"
                  placeholder="Enter discount"
                  className="input input-bordered w-full mt-1"
                  required
                  name="discount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  placeholder="Description"
                  className="textarea textarea-bordered w-full mt-1"
                  name="description"
                  required
                />
              </div>

              <button className="btn btn-primary w-full mt-4" type="submit">
                ✅ Save Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
