import usePaymentHistory from "../../../../Hooks/usePaymentHistory/usePaymentHistory";
import loading from '/public/loading.gif';
import Divider from "../../../../Component/Shared/Divider";
import { useState } from "react";
import { Search } from "lucide-react";

const PaymentHistory = () => {
  const [paymentHistory, isPending] = usePaymentHistory();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (isPending) {
    return <img src={loading} alt="loading" className="mx-auto mt-20" />;
  }

  // Live search filter
  const filteredHistory = paymentHistory.filter((item) =>
    item.month.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = filteredHistory.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  return (
    <div className="bg-gradient-to-br from-blue-900 to-purple-800 min-h-screen py-8 px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="text-white mb-6">
        <Divider header="Payment History" />
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by month..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-[#1c1f27cc] rounded-2xl shadow-xl p-2">
        <table className="min-w-[600px] w-full text-white table-auto">
          <thead>
            <tr className="text-lg font-semibold bg-blue-900/70">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Floor</th>
              <th className="px-4 py-2 text-left">Apartment</th>
              <th className="px-4 py-2 text-left">Block</th>
              <th className="px-4 py-2 text-left">Room</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Month</th>
              <th className="px-4 py-2 text-left">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedHistory.length ? (
              paginatedHistory.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-blue-800/40 transition-colors even:bg-[#2a2d36b9]"
                >
                  <td className="px-4 py-2">{startIndex + i + 1}</td>
                  <td className="px-4 py-2">{item?.floorNo}</td>
                  <td className="px-4 py-2">{item?.apartmentNo}</td>
                  <td className="px-4 py-2">{item?.blockName}</td>
                  <td className="px-4 py-2">{item?.RoomNo}</td>
                  <td className="px-4 py-2 font-semibold text-green-400">${item?.amount}</td>
                  <td className="px-4 py-2">{item?.month}</td>
                  <td className="px-4 py-2">{item?.Date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-red-400">
                  No records found 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {paginatedHistory.length ? (
          paginatedHistory.map((item, i) => (
            <div
              key={i}
              className="bg-[#1c1f27cc] text-white rounded-2xl shadow-xl p-4 space-y-2"
            >
              <div className="flex justify-between font-semibold">
                <span># {startIndex + i + 1}</span>
                <span className="text-green-400">${item?.amount}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><strong>Floor:</strong> {item?.floorNo}</div>
                <div><strong>Apartment:</strong> {item?.apartmentNo}</div>
                <div><strong>Block:</strong> {item?.blockName}</div>
                <div><strong>Room:</strong> {item?.RoomNo}</div>
                <div><strong>Month:</strong> {item?.month}</div>
                <div><strong>Date:</strong> {item?.Date}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-red-400">
            No records found 🚫
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm ${
                currentPage === i + 1
                  ? "bg-blue-700 text-white"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
