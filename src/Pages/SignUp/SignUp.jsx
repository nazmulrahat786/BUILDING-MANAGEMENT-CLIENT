import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import auth from '../../FireBase/FireBase.config';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/AxiosPublic/useAxiosPublic';
import logo from '/mainlogo.png';
import { motion } from 'framer-motion';

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { handleSignUp } = useAuth();
  const navigate = useNavigate();

const handleSignUpForm = (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const photoUrl = form.photourl.value;
  const password = form.password.value;

  // Password validation: At least 6 chars, 1 uppercase, 1 lowercase
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!passwordRegex.test(password)) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Password must contain at least 6 characters, one uppercase, and one lowercase letter.",
      showConfirmButton: true,
    });
    return; // stop form submission
  }

  handleSignUp(email, password)
    .then(() => {
      updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl })
        .then(() => {
          const userInfo = { name, email, photoUrl, role: "user" };
          axiosPublic.post('/users', userInfo)
            .then(res => {
              if (res.data.insertedId) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Successfully signed up",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/');
              }
            });
        })
        .catch(() => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong. Please try again",
            showConfirmButton: false,
            timer: 1500
          });
        });
    })
    .catch(() => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong. Please try again",
        showConfirmButton: false,
        timer: 1500
      });
    });
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Thunder Logo" className="w-48 mb-2" />
          <h1 className="text-3xl font-bold text-white tracking-wide">Sign Up</h1>
        </div>

        <form onSubmit={handleSignUpForm} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="input input-bordered w-full bg-white/20 border-gray-300 placeholder-gray-200 text-white rounded-lg focus:ring-blue-400 focus:border-blue-400 transition duration-300 hover:bg-white/30"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="input input-bordered w-full bg-white/20 border-gray-300 placeholder-gray-200 text-white rounded-lg focus:ring-blue-400 focus:border-blue-400 transition duration-300 hover:bg-white/30"
          />
          <input
            type="text"
            name="photourl"
            placeholder="Photo URL"
            required
            className="input input-bordered w-full bg-white/20 border-gray-300 placeholder-gray-200 text-white rounded-lg focus:ring-blue-400 focus:border-blue-400 transition duration-300 hover:bg-white/30"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="input input-bordered w-full bg-white/20 border-gray-300 placeholder-gray-200 text-white rounded-lg focus:ring-blue-400 focus:border-blue-400 transition duration-300 hover:bg-white/30"
          />
          <button
            type="submit"
            className="btn btn-primary w-full py-2 text-lg font-semibold hover:bg-blue-700 transition duration-300 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-4 text-white">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="px-3 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        <p className="text-center text-white text-sm mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
