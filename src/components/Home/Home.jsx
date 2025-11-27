import { Link } from "react-router-dom";
import img01 from "../../assets/image/Screenshot 2025-11-23 144013.png";
import img02 from "../../assets/image/Screenshot 2025-11-23 144047.png";
import img03 from "../../assets/image/Screenshot 2025-11-23 144133.png";
import { useContext } from "react";
import { AuthContext } from "../Context/Context";
export default function Home() {
  let { token } = useContext(AuthContext);
  return (
    <>
      <div className="[background:linear-gradient(to_right,#213f63,#121247)]">
        <div className="flex items-center text-center justify-center  ">
          <div className="w-[95%] mt-40 lg:w-[70%] mx-auto text-white">
            <div className="md:flex justify-between items-center ">
              <div className="space-y-6 ">
                <h1 className="text-4xl font-bold">
                  Welcome to Our Education Academy
                </h1>
                <p className="text-lg">
                  Lets start your carer here you will find all courses you need
                </p>
              </div>
              <br />
              <br />
              <div>
                {token ? (
                  <Link
                    to="/Main"
                    className="bg-[#5C7BA3] px-10 py-4 text-lg rounded-full"
                  >
                    Start now
                  </Link>
                ) : (
                  <Link
                    to="/Login"
                    className="bg-[#5C7BA3] px-10 py-4 text-lg rounded-full"
                  >
                    Start now
                  </Link>
                )}
              </div>
            </div>

            <hr className="mt-10 w-[25%] mx-auto border-4" />
            <hr className="mb-10" />

            <div className="md:flex justify-between mt-10 py-4 md:pb-10 space-y-7 md:space-y-0 ">
              <img
                src={img01}
                alt="education"
                className="md:w-[30%] rounded-lg shadow-lg"
              />
              <img
                src={img02}
                alt="education"
                className="md:w-[30%] rounded-lg shadow-lg"
              />
              <img
                src={img03}
                alt="education"
                className="md:w-[30%] rounded-lg shadow-lg "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
