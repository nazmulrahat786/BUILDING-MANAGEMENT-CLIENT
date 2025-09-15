import useAnnouncements from "../../../Hooks/useAnnouncements/useAnnouncements";
import Divider from "../../../Component/Shared/Divider";
import loading from "/public/loading.gif";

const Announcements = () => {
  const [announcement, isPending] = useAnnouncements();

  if (isPending) {
    return <img src={loading} alt="Loading..." className="mx-auto mt-28" />;
  }

  return (
    <div className="bg-cover bg-gradient-to-br from-blue-900 to-purple-800 min-h-screen">
      <div className="bg-[#0606068] min-h-screen">
        <div className="text-white pt-10 px-4 sm:px-6 lg:px-10">
          <Divider header={"All Announcement"} />
        </div>

        <div className="mt-10 pb-20 px-2 sm:px-6 lg:px-14 space-y-4">
          {announcement?.map((item, i) => (
            <div
              key={item?._id}
              className="bg-[#11123567] p-4 sm:p-6 rounded-2xl text-white shadow-md"
            >
              {/* Desktop Table Layout */}
              <div className="hidden sm:block">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-lg sm:text-xl font-semibold border-b border-white">
                      <th className="px-2 py-2">#</th>
                      <th className="px-2 py-2">Title</th>
                      <th className="px-2 py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 py-2">{i + 1}</td>
                      <td className="px-2 py-2">{item?.title}</td>
                      <td className="px-2 py-2">{item?.description}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout */}
              <div className="sm:hidden space-y-1">
                <p>
                  <span className="font-semibold text-white">#:</span> {i + 1}
                </p>
                <p>
                  <span className="font-semibold text-white">Title:</span> {item?.title}
                </p>
                <p>
                  <span className="font-semibold text-white">Description:</span> {item?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
