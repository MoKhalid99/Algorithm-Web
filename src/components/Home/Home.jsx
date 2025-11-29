// Import Link for navigation between routes
import { Link } from "react-router-dom";

// Import images used in the home page
import img01 from "../../assets/image/Screenshot 2025-11-23 144013.png";
import img02 from "../../assets/image/Screenshot 2025-11-23 144047.png";
import img03 from "../../assets/image/Screenshot 2025-11-23 144133.png";

// Import useContext hook to access React context
import { useContext } from "react";
import { AuthContext } from "../Context/Context"; // Import authentication context

// Home component: main landing page of the education platform
export default function Home() {
  // Get the authentication token from AuthContext to check if user is logged in
  let { token } = useContext(AuthContext);

  return (
    <>
      {/* Main container with a gradient background */}
      <div className="[background:linear-gradient(to_right,#213f63,#121247)]">
        {/* Center content horizontally and vertically */}
        <div className="flex items-center text-center justify-center">
          {/* Inner container with max width, top margin, and white text */}
          <div className="w-[95%] mt-40 lg:w-[70%] mx-auto text-white">
            {/* Section for heading and button, flex layout on medium screens */}
            <div className="md:flex justify-between items-center">
              {/* Left section: heading and description */}
              <div className="space-y-6">
                <h1 className="text-4xl font-bold">
                  Welcome to Our Education Academy
                </h1>
                <p className="text-lg">
                  Let's start your career here; you will find all courses you need
                </p>
              </div>

              <br />
              <br />

              {/* Right section: Start button, changes based on login status */}
              <div>
                {token ? (
                  // If user is logged in, link to the main page
                  <Link
                    to="/Main"
                    className="bg-[#5C7BA3] px-10 py-4 text-lg rounded-full"
                  >
                    Start now
                  </Link>
                ) : (
                  // If user is not logged in, link to login page
                  <Link
                    to="/Login"
                    className="bg-[#5C7BA3] px-10 py-4 text-lg rounded-full"
                  >
                    Start now
                  </Link>
                )}
              </div>
            </div>

            {/* Decorative horizontal lines */}
            <hr className="mt-10 w-[25%] mx-auto border-4" />
            <hr className="mb-10" />

            {/* Section displaying images of courses/resources */}
            <div className="md:flex justify-between mt-10 py-4 md:pb-10 space-y-7 md:space-y-0">
              {/* Image 1 */}
              <img
                src={img01}
                alt="education"
                className="md:w-[30%] rounded-lg shadow-lg"
              />
              {/* Image 2 */}
              <img
                src={img02}
                alt="education"
                className="md:w-[30%] rounded-lg shadow-lg"
              />
              {/* Image 3 */}
              <img
                src={img03}
                alt="education"
                className="md:w-[30%] rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
