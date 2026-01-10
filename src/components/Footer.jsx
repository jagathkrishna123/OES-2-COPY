import React from "react";
import { BsMailbox } from "react-icons/bs";
import {  FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { SlSocialInstagram } from "react-icons/sl";



export default function Footer() {
  return (
    <footer className=" py-10 mt-10 text-gray-700">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-semibold mb-3 font-momo">YourWebsite</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Empowering students with technology, innovation, and learning.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Events</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
          <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
            <MdEmail size={18} /> yourmail@example.com
          </p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400"><FaFacebook/></a>
            <a href="#" className="hover:text-pink-400"><SlSocialInstagram /></a>
            <a href="#" className="hover:text-blue-300"><FaLinkedin/></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} YourWebsite. All Rights Reserved.
      </div>
    </footer>
  );
}