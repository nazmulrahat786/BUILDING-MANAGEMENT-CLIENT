
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4">
      {/* Big error code */}
        <div className="text-9xl animate-bounce font-extrabold text-gray-800 dark:text-gray-200">404</div>
      

      {/* Message */}
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
        Oops! Page not found.
      </h2>

      <p className="mt-2 text-gray-500 dark:text-gray-400 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
 
      {/* Action buttons */}
      <div className="mt-6 flex gap-4">
        <Link to="/">
          <button className="btn btn-primary">Go Home</button>
        </Link>
    
      </div>

      {/* Fun Illustration / Emoji */}
     
    </div>
  );
};

export default ErrorPage;
