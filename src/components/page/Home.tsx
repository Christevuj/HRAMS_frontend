import JobCards from "./JobCards";

const BG_IMAGE_URL = "/bg.jpg";

const Home = () => {
  return (
    <div className="relative w-full h-auto min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BG_IMAGE_URL})`,
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-24 text-center text-white">
        <h2 className="text-xl font-semibold">HRAMS Portal</h2>
        <h1 className="text-3xl font-bold md:text-5xl">
          Welcome to UIC Human Resource Applicant Management System
        </h1>
        <p className="mt-2 max-w-2xl text-gray-200 md:text-lg">
          Welcome to the HRAMS Portal of the Human Resource Office at the
          University of the Immaculate Conception (UIC). This platform allows
          applicants to submit their required documents securely and
          efficiently.
        </p>
      </div>

     
      <section className="relative z-10 mt-8 bg-white px-4 py-12">
        <div className="container mx-auto max-w-100xl text-left pl-50">
          <h2 className="mb-4 text-xl font-bold md:text-2xl">Get Started!</h2>
          <p className="text-gray-700 md:text-lg">
            1. Choose The Job Position
          </p>
          <p className="text-gray-700 md:text-lg">
            2. Upload the Required Information and Documents
          </p>
          <p className="text-gray-700 md:text-lg">
            3. Submit and Wait for HR Confirmation
          </p>

         
          <p className="text-gray-700 md:text-lg mt-8">
            Your Journey Starts Here. Simple. Secure. Fast
          </p>
        </div>

        {/* Job Listings */}
        <div className="mt-12">
          <JobCards />
        </div>
      </section>
    </div>
  );
};

export default Home;
