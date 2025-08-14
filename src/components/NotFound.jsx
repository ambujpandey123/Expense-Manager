import { useLocation } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-6xl text-blue-600 lg:text-8xl">
              404
            </h1>

            <h2 className="mt-4 mb-2 text-3xl font-bold text-gray-800 md:text-4xl">
              <span className="text-red-500">Oops!</span> Page Not Found
            </h2>

            <p className="mb-4 text-center text-gray-500 md:text-lg">
              The page you're looking for, <span className="font-semibold text-gray-700">{location.pathname}</span>, doesn't exist.
            </p>

             
            <a
              href="/"
              className="px-6 py-3 rounded-full text-blue-100 bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}