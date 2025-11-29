import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';


// this code involves designing footer section 
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top section */}
        <div className="md:flex md:justify-between md:items-start">
          {/* Logo / Brand */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">CodeAcademy</h2>
            <p className="mt-2 text-gray-400 text-sm">
              Learn programming with tutorials, courses, and challenges.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:flex md:space-x-10">
            <div>
              <h3 className="text-white font-semibold mb-3">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Courses</a></li>
                <li><a href="#" className="hover:text-white">Tutorials</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Community</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">GitHub</a></li>
                <li><a href="#" className="hover:text-white">Newsletter</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Copyright */}
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CodeAcademy. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-white"><FaGithub /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
