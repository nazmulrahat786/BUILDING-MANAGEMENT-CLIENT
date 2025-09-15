import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import img1 from "../../../../assets/HomeBanner/pro.jpg";
import Divider from "../../../../Component/Shared/Divider";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();

  const handleAnnouncement = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value.trim();
    const description = form.description.value.trim();

    if (!title || !description) {
      Swal.fire({
        icon: "warning",
        title: "Please fill out all fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const announcementInfo = { title, description };
    axiosSecure.post("/makeannouncement", announcementInfo).then((res) => {
      if (res.data.insertedId) {
        form.reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Announcement created successfully 🎉",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    });
  };

  return (
    <div
   
      className="bg-cover bg-gradient-to-br from-blue-900 to-purple-800 bg-center min-h-screen"
    >
      <div className="bg-black/70 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-white pt-16">
          <Divider header={"Make Announcement"} />
        </div>

        {/* Form Section */}
        <div className="flex-1 flex items-center justify-center pb-16 px-4">
          <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleAnnouncement} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-white font-semibold text-lg mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter announcement title"
                  className="w-full p-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-semibold text-lg mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Write details here..."
                  className="w-full p-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                  required
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-300 shadow-md"
                >
                  Submit Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
