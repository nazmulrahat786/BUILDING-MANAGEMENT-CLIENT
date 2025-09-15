import { useQuery } from "@tanstack/react-query";
import ApartmentCard from "./ApartmentCard";
import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";
import { useState } from "react";
import Divider from "../../Component/Shared/Divider";

const Apartment = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const axiosPublic = useAxiosPublic();

  const perPageItem = 6;
  const totalApartments = 16; // Ideally, fetch this count from the server
  const totalPages = Math.ceil(totalApartments / perPageItem);
  const pageNumbers = [...Array(totalPages).keys()];

  const { data: apartments, isLoading, refetch } = useQuery({
    queryKey: ["pagination", currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/pagination?page=${currentPage}&size=${perPageItem}`
      );
      return res.data;
    },
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

  const handlePrev = () => {
    if (currentPage > 0) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) handlePageChange(currentPage + 1);
  };

  return (
    <div className="my-20 px-4 md:px-10">
      <Divider header="All Apartments" />

      {/* Apartments Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {Array(perPageItem)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
        </div>
      ) : apartments?.length === 0 ? (
        <p className="text-center mt-10 text-gray-500 text-lg">
          No apartments found 😞
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {apartments.map((item) => (
            <ApartmentCard
              key={item._id}
              apartment={item}
              className="hover:scale-105 hover:shadow-lg transition-transform duration-300"
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-lg transition ${
              currentPage === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#301ad5] text-white hover:bg-[#0d0357]"
            }`}
            aria-label="Previous Page"
          >
            Prev
          </button>

          {/* Page Numbers with Ellipsis */}
          {pageNumbers.map((page) => {
            if (
              page === 0 ||
              page === totalPages - 1 ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === page
                      ? "bg-[#0d0357] border border-[#301ad5] text-white font-bold"
                      : "bg-[#301ad5] text-white hover:bg-[#0d0357]"
                  }`}
                >
                  {page + 1}
                </button>
              );
            } else if (
              page === currentPage - 2 ||
              page === currentPage + 2
            ) {
              return <span key={page}>...</span>;
            } else {
              return null;
            }
          })}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`px-4 py-2 rounded-lg transition ${
              currentPage === totalPages - 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#301ad5] text-white hover:bg-[#0d0357]"
            }`}
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Apartment;
