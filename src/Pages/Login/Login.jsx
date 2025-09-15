import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/AxiosPublic/useAxiosPublic';
import logo from '/mainlogo.png';
import { motion } from 'framer-motion'; 

const Login = () => {
  const { handleSignIn, handleGoogleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleSignInForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    handleSignIn(email, password)
      .then(() => {
        navigate('/');
        Swal.fire({ title: 'Successfully Signed In', icon: 'success' });
      })
      .catch(() => {
        Swal.fire({ title: 'Your email or password is wrong', icon: 'error' });
      });
  };

  const handleGoogleLogIn = () => {
    handleGoogleSignIn()
      .then((result) => {
        const user = result.user;
        if (user) {
          const userInfo = {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            role: 'user'
          };
          axiosPublic.post('/users', userInfo)
            .then(() => {
              navigate('/');
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully logged in",
                showConfirmButton: false,
                timer: 1500
              });
            });
        }
      })
      .catch(() => {
        Swal.fire({ title: 'Google login failed', icon: 'error' });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8"
      >
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Thunder Logo" className="w-48 mb-2" />
          <h1 className="text-3xl font-bold text-white tracking-wide">Sign In</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSignInForm} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="input input-bordered w-full bg-white/20 border-gray-300 placeholder-gray-200 text-white focus:ring-blue-400 focus:border-blue-400 rounded-lg transition duration-300 ease-in-out hover:bg-white/30"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="input input-bordered w-full bg-white/20 border-gray-300 placeholder-gray-200 text-white focus:ring-blue-400 focus:border-blue-400 rounded-lg transition duration-300 ease-in-out hover:bg-white/30"
          />
          <button
            type="submit"
            className="btn btn-primary w-full py-2 text-lg font-semibold hover:bg-blue-700 transition duration-300 rounded-lg"
          >
            Sign In
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4 text-white">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="px-3 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Google Login */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleLogIn}
          className="flex items-center justify-center gap-3 w-full py-2 mb-4 bg-white/20 rounded-lg cursor-pointer hover:bg-white/30 transition duration-300"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-bold text-white text-lg">Sign In With Google</span>
        </motion.div>

        {/* Signup Link */}
        <p className="text-center text-white text-sm mt-2">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
