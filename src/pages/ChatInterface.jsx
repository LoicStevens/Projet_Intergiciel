import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import { faPhoneAlt, faVideo, faEllipsisH, faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons';

const ChatInterface = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
        <Header/>
    <div className="flex h-screen bg-gray-100">
        
      {/* Left Sidebar - Chat List */}
      <div className={`w-full md:w-1/4 bg-white p-4 border-r border-gray-200 ${isChatOpen ? 'hidden' : ''} md:block`}>
        {/* Search Bar */}
        <div className="flex items-center mb-6">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-3" />
          <input
            type="text"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-custom-green"
            placeholder="Search..."
          />
        </div>

        {/* Chats Section */}
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Chats</h3>
        <ul>
          <li className="flex items-center justify-between p-2 rounded-md bg-blue-100 mb-2">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleChat}>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-semibold">Felecia Rower</p>
                <p className="text-gray-500 text-sm">I will purchase it for sure. 👍</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">30 Minutes</span>
          </li>

          <li className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 mb-2 cursor-pointer">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleChat}>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-semibold">Waldemar Mannering</p>
                <p className="text-gray-500 text-sm">Refer friends. Get rewards.</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">5 Minutes</span>
          </li>
        </ul>

        {/* Contacts Section */}
        <h3 className="text-lg font-semibold mt-6 mb-4 text-gray-700">Contacts</h3>
        <ul>
          <li className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 mb-2 cursor-pointer">
            <div className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/40"
                alt="Contact"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-semibold">Natalie Maxwell</p>
                <p className="text-gray-500 text-sm">UI/UX Designer</p>
              </div>
            </div>
          </li>
          <li className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 mb-2 cursor-pointer">
            <div className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/40"
                alt="Contact"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-semibold">Jess Cook</p>
                <p className="text-gray-500 text-sm">Business Analyst</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-full md:w-3/4 flex flex-col">
        {/* Chat Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Chat Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-gray-800 font-semibold">Felecia Rower</p>
              <p className="text-sm text-gray-500">NextJS Developer</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="text-gray-500 hover:text-gray-800">
              <FontAwesomeIcon icon={faPhoneAlt} />
            </button>
            <button className="text-gray-500 hover:text-gray-800">
              <FontAwesomeIcon icon={faVideo} />
            </button>
            <button className="text-gray-500 hover:text-gray-800">
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="mb-4">
            <p className="text-gray-600 text-sm mb-1">10:15 AM</p>
            <div className="flex items-start">
              <img
                src="https://via.placeholder.com/40"
                alt="Sender"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div className="bg-custom-green text-white p-3 rounded-lg shadow max-w-xs">
                Yes that's correct documentation file, Design files are included with the template.
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center space-x-4">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Type your message here..."
          />
          <button className="bg-custom-green hover:bg-bgcustom-green text-white px-4 py-2 rounded-lg shadow">
            <FontAwesomeIcon icon={faPaperPlane} /> Send
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChatInterface;
