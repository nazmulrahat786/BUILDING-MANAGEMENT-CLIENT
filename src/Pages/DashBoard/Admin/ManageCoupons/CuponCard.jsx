import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosSecure from '../../../../Hooks/AxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CuponCard = ({ item, refetch }) => {
  const axiosSecret = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete coupon
  const handleCouponDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "To Delete This Coupon",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecret.delete(`/cupons/${id}`).then(res => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Coupon has been deleted.",
              icon: "success"
            });
          }
        });
      }
    });
  }

  // Update coupon
  const handleCouponUpdate = e => {
    e.preventDefault();
    const cuponCode = e.target.cupon.value;
    const discount = e.target.discount.value;
    const description = e.target.description.value;
    const cupon = { cuponCode, discount, description };

    axiosSecret.put(`/cupons/${item?._id}`, cupon).then(res => {
      if (res?.data?.modifiedCount) {
        refetch();
        toast.success('Your Coupon has been updated successfully.');
        setIsModalOpen(false);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    });
  }

  return (
    <>
      {/* Table Row for Desktop */}
      <tr className="hidden md:table-row text-center border border-gray-700">
        <th>{item?._id}</th>
        <td>{item?.cuponCode}</td>
        <td>{item?.discount}%</td>
        <td>{item?.description}</td>
        <td>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            className="btn btn-error btn-sm"
            onClick={() => handleCouponDelete(item?._id)}
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Card for Mobile */}
      <div className="md:hidden bg-gray-800 text-white rounded-xl shadow-lg p-4 mb-4 mx-2">
        <p><span className="font-semibold">ID:</span> {item?._id}</p>
        <p><span className="font-semibold">Coupon:</span> {item?.cuponCode}</p>
        <p><span className="font-semibold">Discount:</span> {item?.discount}%</p>
        <p><span className="font-semibold">Description:</span> {item?.description}</p>
        <div className="flex gap-2 mt-3">
          <button
            className="btn btn-primary flex-1"
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-error flex-1"
            onClick={() => handleCouponDelete(item?._id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/50">
          <div className="bg-white text-black rounded-xl shadow-xl w-full max-w-lg p-6 relative">
            <button
              className="absolute right-3 top-3 text-xl font-bold text-gray-700 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-4">Edit Coupon</h3>

            <form className="space-y-4" onSubmit={handleCouponUpdate}>
              <div>
                <label className="font-semibold block mb-1">Coupon</label>
                <input
                  type="text"
                  name="cupon"
                  className="input input-bordered w-full"
                  defaultValue={item?.cuponCode}
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  className="input input-bordered w-full"
                  defaultValue={item?.discount}
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full"
                  defaultValue={item?.description}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full mt-2">
                Update Coupon
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      )}
    </>
  );
};

CuponCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    cuponCode: PropTypes.string,
    discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default CuponCard;
