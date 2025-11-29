import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Context";

/*


Key Points:

Auth-aware Navigation:

Shows "Log Out" when token exists.

Shows "Sign In" and "Log In" when user is not logged in.

Logout Behavior:

Clears the token from both localStorage and context.

Redirects user to homepage /.

Responsive Styling:

w-[90%] mx-auto keeps navbar centered.

fixed top-0 keeps navbar at top of page.

flex justify-between aligns brand and links nicely.

Hover Effects:

Links highlight on hover using Tailwind classes like hover:text-blue-600 underline-offset-4 underline.


*/
export default function Navbar() {
  // بعمل ديستركت لل token من ال context
  let { token, setToken } = useContext(AuthContext);

  let navigate = useNavigate();

  // function بتعمل تسجيل للخروج
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  }
  return (
    <>
      <nav className="w-[90%] mx-auto bg-transparent fixed top-0 left-0 right-0 text-white py-6 z-10">
        <div className="flex justify-between items-center">
          <div className="w-[50%]">
            <Link to="/" className="text-3xl">
              Education Academy
            </Link>
          </div>
          <ul className="flex justify-around items-center w-[40%] md:w-[20%] text-lg ">
            {token ? (
              <li className="hover:text-blue-600 underline-offset-4 underline">
                <Link onClick={logout} to="/Login">
                  Login out
                </Link>
              </li>
            ) : (
              <>
                <li className="hover:text-blue-600 underline-offset-4 underline">
                  <Link to="/Register">Sign In</Link>
                </li>
                <li className="hover:text-blue-600 underline-offset-4 underline">
                  <Link to="/Login">Login In</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
