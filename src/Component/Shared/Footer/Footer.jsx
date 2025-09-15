import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";
import logo from "/mainlogo.png";
import useAuth from "../../../Hooks/useAuth";

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-5 lg:px-20 flex flex-col lg:flex-row justify-between items-center gap-10">
      
      {/* Logo & Copyright */}
      <aside className="flex flex-col items-center lg:items-start gap-3">
        <div className="flex flex-col items-center lg:items-start">
          <img src={logo} alt="Thunder Logo" className="h-16 mb-1" />
          <p className="font-sans text-sm tracking-widest text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Homex
          </p>
        </div>
        <p className="text-center lg:text-left text-gray-400 text-sm">
          © 2025 - All rights reserved by Nazmul Rahat
        </p>
      </aside>

      {/* Menu */}
      <nav className="flex flex-col items-center lg:items-start gap-3">
        <h2 className="text-lg font-semibold mb-2">Menu</h2>
        <div className="flex flex-col gap-2">
          <a href="/" className="hover:text-blue-400 transition duration-300">Home</a>
          <a href="/apartment" className="hover:text-blue-400 transition duration-300">Apartment</a>
          
          {!user && (
            <>
              <a href="/login" className="hover:text-blue-400 transition duration-300">Sign In</a>
              <a href="/signup" className="hover:text-blue-400 transition duration-300">Sign Up</a>
            </>
          )}
        </div>
      </nav>

      {/* Social */}
      <nav className="flex flex-col items-center lg:items-start gap-3">
        <h2 className="text-lg font-semibold mb-2">Social</h2>
        <div className="flex gap-4">
          <a href="https://www.facebook.com/rahat78613" className="text-xl hover:text-blue-600 transition duration-300">
            <FaFacebookF />
          </a>
          <a href="mailto:nazmulrahat13@gmail.com" className="text-2xl hover:text-red-500 transition duration-300">
            <MdOutgoingMail />
          </a>
          <a href="www.linkedin.com/in/nazmulrahat786" className="text-xl hover:text-blue-500 transition duration-300">
            <FaLinkedin />
          </a>
        </div>
      </nav>

    </footer>
  );
};

export default Footer;
