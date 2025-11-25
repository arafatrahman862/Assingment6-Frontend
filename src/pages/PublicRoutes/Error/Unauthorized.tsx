import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <>
      <section className="flex items-center justify-center min-h-screen  px-6">
        <div className="w-full max-w-2xl  p-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-red-600 mb-4">
            403 - Unauthorized
          </h1>
          <p className=" text-lg mb-8">
            You don’t have permission to access this page.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-white font-semibold px-6 py-3 hover:bg-primary/90 transition"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
};

export default Unauthorized;
