import useAllpaymenthistory from "../../../../Hooks/useAllpaymentHistory/useAllpaymenthistory";
import loading from '/public/loading.gif'
import Divider from "../../../../Component/Shared/Divider";
import { useState } from "react";

const AllPaymentHistory = () => {
    const [allpaymentHistory, isPending] = useAllpaymenthistory();
    const [dateValue, setDateValue] = useState([]);

    const handlesearch = (e) => {
        e.preventDefault();
        const data = e.target.dataSearch.value;
        setDateValue(data);
    };

    if (isPending) {
        return <img src={loading} alt="loading" className="mx-auto mt-20" />;
    }

    const monthsearch = allpaymentHistory.filter(item => item.month === dateValue);

    return (
        <div className="bg-cover bg-gradient-to-br from-blue-900 to-purple-800 min-h-screen">
            <div className="bg-[#0606068a] min-h-screen">
                <div className="text-white pt-10">
                    <Divider header={'Payment History'} />
                </div>
                <div className="-mt-16 pb-20">
                    <div className="bg-[#11123567] mt-20 px-4 md:px-14 py-10 md:py-16 space-y-4 text-white rounded-2xl mx-3 md:mx-10">
                        
                        {/* search form */}
                        <form onSubmit={handlesearch} className="flex flex-col md:flex-row justify-end gap-2 md:gap-0">
                            <input
                                type="text"
                                name="dataSearch"
                                placeholder="search month.."
                                className="rounded-xl md:rounded-l-xl px-3 py-2 text-black w-full md:w-auto"
                            />
                            <input
                                type="submit"
                                value="search"
                                className="bg-blue-800 text-white px-5 py-2 rounded-xl md:rounded-r-xl hover:bg-blue-900 w-full md:w-auto"
                            />
                        </form>

                        {/* table for desktop, cards for mobile */}
                        <div className="overflow-x-auto hidden md:block">
                            <table className="table w-full">
                                <thead>
                                    <tr className="text-lg font-semibold font-sans text-white">
                                        <th>#</th>
                                        <th>FloorNo</th>
                                        <th>Apartment No</th>
                                        <th>Block Name</th>
                                        <th>Room No</th>
                                        <th>Amount</th>
                                        <th>Month</th>
                                        <th>Payment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(monthsearch.length ? monthsearch : allpaymentHistory)?.map((item, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item?.floorNo}</td>
                                            <td>{item?.apartmentNo}</td>
                                            <td>{item?.blockName}</td>
                                            <td>{item?.RoomNo}</td>
                                            <td>{item?.amount}</td>
                                            <td>{item?.month}</td>
                                            <td>{item?.Date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* mobile card view */}
                        <div className="space-y-4 md:hidden">
                            {(monthsearch.length ? monthsearch : allpaymentHistory)?.map((item, i) => (
                                <div key={i} className="bg-[#1b1c2a] p-4 rounded-xl shadow-md">
                                    <p className="font-semibold">#{i + 1}</p>
                                    <p><span className="font-semibold">Floor:</span> {item?.floorNo}</p>
                                    <p><span className="font-semibold">Apartment:</span> {item?.apartmentNo}</p>
                                    <p><span className="font-semibold">Block:</span> {item?.blockName}</p>
                                    <p><span className="font-semibold">Room:</span> {item?.RoomNo}</p>
                                    <p><span className="font-semibold">Amount:</span> ${item?.amount}</p>
                                    <p><span className="font-semibold">Month:</span> {item?.month}</p>
                                    <p><span className="font-semibold">Date:</span> {item?.Date}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPaymentHistory;
