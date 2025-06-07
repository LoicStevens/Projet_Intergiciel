import { FaFacebookF, FaTwitter, FaRss, FaGoogle, FaDribbble } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black font-sans text-white py-10">
      <div className="container mx-auto text-center md:text-left">
        {/* Upper section with links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-1">
          <img src="logo.png" alt="JobOs" className="h-12" />
            <p className="text-sm">Solution of Unemployment</p>
          </div>

          <div className="col-span-1">
            <ul>
              <li>Help center</li>
              <li>Pre-sale FAQs</li>
              <li>Support</li>
            </ul>
          </div>

          <div className="col-span-1">
            <ul>
              <li><a href="">Services</a></li>
              <li>testimognals</li>
            </ul>
          </div>

          <div className="col-span-1">
            <ul>
              <li>Showcase</li>
              <li>Widgetkit</li>
              <li>Support</li>
            </ul>
          </div>

          <div className="col-span-1">
            <ul>
              <li><a href="">About Us</a></li>
              <li><a href="">Contact Us</a></li>
              <li>Affiliates</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-6"></div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-white hover:text-gray-400">
            <FaFacebookF />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaTwitter />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaRss />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaGoogle />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaDribbble />
          </a>
        </div>

        {/* Copyright text */}
        <p className="text-sm text-gray-400">©Copyright. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
