import React from "react";
import img01 from "../../assets/image/imgi_3_b9c6dfb8-6289-4943-b68f-f8a12da1338f.png";
import img02 from "../../assets/image/imgi_4_ca2004ad-0cb1-4bd4-a032-30b656b57e9c.png";
import img03 from "../../assets/image/imgi_5_3b7a39f8-b27a-4eb0-a161-bb8ad0e44429.png";
import img04 from "../../assets/image/imgi_6_904d79f1-a0d6-4b0a-b1aa-989857cb2d81.png";
import img05 from "../../assets/image/imgi_7_6983e5a3-9903-40ef-93e3-5be2e4067fcb.png";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

/*

Key Explanations:

Grid Layout: The main features (Chatting, Contact, Courses, etc.) are arranged using a responsive CSS grid.

Hover Effects: Each card scales and adds shadow when hovered using Tailwind CSS transform and transition.

Dropdowns: Both "Collage Courses" and "Student Material" use group-hover to show hidden dropdown menus.

Icons: FontAwesome icons are used for visual cues and social media links.

Responsiveness: The layout adapts for mobile, tablet, and desktop using Tailwind's responsive utilities (md:, lg:).

Backgrounds: The main container and inner card use background images with bg-cover, bg-center, and bg-no-repeat.



*/
export default function Main() {
  // Dropdown menu items
  const LevelsDropdownItems = [
    { name: "Level 01", link: "/Level01" },
    { name: "Level 02", link: "/Level02" },
    { name: "Games", link: "/Games" },
  ];

  return (
    <>
      <div className="bg-cover bg-center bg-no-repeat bg-(image:--backgrounds-MainBackGround) h-screen text-white">
        <div className="pt-44 ">
          <div className="bg-(image:--backgrounds-MainBackGround02) bg-cover bg-center bg-no-repeat w-[70%] md:w-[40%] mx-auto p-10 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
              {/* Chatting */}
              <Link
                to="/Chatting"
                className="flex flex-col items-center justify-center text-center  transform transition duration-500 hover:scale-110 hover:shadow-lg"
              >
                <img src={img05} alt="Chatting" className="mx-auto" />
                <p>Chatting</p>
              </Link>

              {/* Contact US */}
              <Link
                to="/ContactUS"
                className="flex flex-col items-center justify-center text-center  transform transition duration-500 hover:scale-110 hover:shadow-lg "
              >
                <img src={img02} alt="Contact US" className="mx-auto" />
                <p>Contact US</p>
              </Link>

              {/* Extra Courses */}
              <Link
                to="/ExtraCourses"
                className="flex flex-col items-center justify-center text-center  transform transition duration-500 hover:scale-110 hover:shadow-lg"
              >
                <img src={img03} alt="Extra Courses" className="mx-auto" />
                <p>Extra Courses</p>
              </Link>

              {/* Collage Courses */}
              <div className="relative group w-max">
                {/* Dropdown Toggle */}
                <Link
                  to="#"
                  className="flex flex-col items-center justify-center text-white font-semibold px-4 py-2 transition-all duration-500 hover:scale-110"
                >
                  <img
                    src={img04}
                    alt="Collage Courses"
                    className="w-16 h-16 object-cover rounded-md mb-2"
                  />
                  <span className="flex items-center space-x-1">
                    <span>Collage Courses</span>
                    <FontAwesomeIcon
                      icon={faSortDown}
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  </span>
                </Link>

                {/* Dropdown Menu */}
                <ul className="absolute left-0 top-full w-[180px] bg-white text-black shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {LevelsDropdownItems.map((item, index) => (
                    <li key={index} className="p-2 transition-all duration-300">
                      <Link to={item.link}> {item.name}</Link>
                      <hr className="text-gray-300" />
                    </li>
                  ))}
                </ul>
              </div>

              {/*About Me  */}
              <Link
                to="/AboutMe"
                className="flex flex-col items-center justify-center text-center transform transition duration-500 hover:scale-110 hover:shadow-lg"
              >
                <FontAwesomeIcon
                  icon={faComment}
                  className="text-5xl text-white"
                />
                <p>About Me</p>
              </Link>

              {/* Student Material */}
              <div className="relative group w-max">
                {/* Dropdown Toggle */}
                <Link
                  to="#"
                  className="flex flex-col items-center justify-center text-white font-semibold px-4 py-2 transition-all duration-500 hover:scale-110"
                >
                  <img
                    src={img01}
                    alt="Student Materials"
                    className="mx-auto"
                  />

                  <span className="flex items-center space-x-1">
                    <span> Student Material</span>
                    <FontAwesomeIcon
                      icon={faSortDown}
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  </span>
                </Link>

                {/* Dropdown Menu */}
                <ul className="absolute left-0 top-full w-[180px] bg-white text-black shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {LevelsDropdownItems.map((item, index) => (
                    <li key={index} className="p-2 transition-all duration-300">
                      <Link to={item.link}> {item.name}</Link>
                      <hr className="text-gray-300" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center space-x-20 text-2xl pt-12 lg:pt-40">
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faFacebookF} />
          </div>
        </div>
      </div>
    </>
  );
}
