
const WelcomePage = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 min-h-screen">
      {/* Overlay */}
      <div className="bg-black/60 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-3xl animate-fadeIn">
          {/* Title */}
          <img className="w-36 mx-auto" src=".././../../public/welcome.gif" alt="" />
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Welcome to Your Dashboard
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Manage everything in one place — simple, fast, and efficient.
          </p>

          {/* Action Button */}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
