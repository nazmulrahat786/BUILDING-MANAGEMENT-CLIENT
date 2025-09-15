import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin/useAdmin";
import {
  FaHistory,
  FaHome,
  FaUserAlt,
} from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import {
  MdApartment,
  MdManageAccounts,
  MdOutlineCardGiftcard,
  MdOutlinePayment,
  MdRequestQuote,
} from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import loading from "/loading.gif";

const DashBoardLayOut = () => {
  const [role, isPending] = useAdmin();
  if (isPending) {
    return <img src={loading} alt="loading" className="mx-auto mt-28" />;
  }

  // ---- menu items grouped ----
  const userMenu = (
    <>
      <li>
        <NavLink to={"/dashboard/userProfile"}>
          <FaUserAlt className="text-xl" /> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/announcements"}>
          <GrAnnounce className="text-xl" /> Announcements
        </NavLink>
      </li>
    </>
  );

  const adminMenu = (
    <>
      <li>
        <NavLink to={"/dashboard/adminprofile"}>
          <FaUserAlt className="text-xl" /> Admin Profile
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/manageMembers"}>
          <MdManageAccounts className="text-2xl" /> Manage Members
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/makeAnnouncement"}>
          <GrAnnounce className="text-xl" /> Make Announcement
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/agreementRequests"}>
          <MdRequestQuote className="text-xl" /> Agreement Requests
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/manageCoupons"}>
          <MdOutlineCardGiftcard className="text-xl" /> Manage Coupons
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/allpaymenthistory"}>
          <FaHistory className="text-xl" /> Payment History
        </NavLink>
      </li>
    </>
  );

  const memberMenu = (
    <>
      <li>
        <NavLink to={"/dashboard/memberProfile"}>
          <FaUserAlt className="text-xl" /> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/makePayment"}>
          <MdOutlinePayment className="text-xl" /> Make Payment
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/paymentHistory"}>
          <FaHistory className="text-xl" /> Payment History
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/announcements"}>
          <GrAnnounce className="text-xl" /> Announcements
        </NavLink>
      </li>
    </>
  );

  const sharedMenu = (
    <>
      <div className="divider bg-white/30"></div>
      <li>
        <NavLink to={"/"}>
          <FaHome className="text-xl" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/apartment"}>
          <MdApartment className="text-xl" /> Apartment
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Large devices */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-blue-700 text-white p-5 sticky top-0 min-h-screen">
        <h1 className="text-2xl font-bold tracking-[6px] mb-6 text-center">
          Homex
        </h1>
        <ul className="menu space-y-1 uppercase">
          {role === "user" && userMenu}
          {role === "admin" && adminMenu}
          {role === "member" && memberMenu}
          {sharedMenu}
        </ul>
      </aside>

      {/* Drawer - Small devices */}
      <div className="lg:hidden drawer w-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Top Navbar */}
          <div className="flex items-center justify-between bg-blue-700 text-white px-4 py-3 sticky top-0 z-40">
            <label
              htmlFor="my-drawer"
              className="cursor-pointer flex items-center gap-2"
            >
              <IoMdMenu className="text-2xl" />{" "}
              <span className="font-bold">Menu</span>
            </label>
            <h1 className="text-xl font-bold tracking-wide">Homex</h1>
          </div>

          {/* Main Content */}
          <main className="flex-1  bg-gray-50 overflow-y-auto">
            <Outlet />
          </main>
        </div>

        {/* Drawer Sidebar */}
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-blue-700 text-white w-72 min-h-full flex flex-col">
            {/* header with close btn */}
            <div className="flex items-center justify-between p-4 border-b border-white/30">
              <h1 className="text-lg font-semibold">Dashboard</h1>
              <label htmlFor="my-drawer" className="cursor-pointer">
                <IoClose className="text-2xl" />
              </label>
            </div>
            {/* scrollable menu */}
            <ul className="menu p-4 space-y-1 uppercase flex-1 overflow-y-auto">
              {role === "user" && userMenu}
              {role === "admin" && adminMenu}
              {role === "member" && memberMenu}
              {sharedMenu}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content - Large devices */}
      <main className="hidden lg:block flex-1   min-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayOut;
