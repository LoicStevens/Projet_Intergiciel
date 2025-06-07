import  { useState, useEffect } from 'react';

const HeaderHome = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // État du popup
   
    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className=" absolute top-0 left-0 w-full bg-transparent p-4 z-50">
      {/* Barre de progression */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="h-1 bg-bgcustom-green fixed top-0 left-0 z-50"
      ></div>

      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <img src="/logo.png" alt="Jobox Logo" className="h-24" />
        </div>

        {/* Menu */}
        <nav className="hidden md:flex space-x-6 text-white">
          <div className="relative group">
            <a href='/' className="flex items-center">Home</a>
          </div>

          {/* Dropdown menu Support */}
          <SupportDropdown />

          <div className="relative group">
            <a href='#blog' className="flex items-center">Blog</a>
          </div>
          <div className="relative group">
            <button className="flex items-center" onClick={togglePopup}>Contact Us</button>
          </div>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center space-x-4">
          <a href='/register' className="bg-transparent text-white py-2 px-4 border hover:text-black hover:bg-white flex items-center">
            {/* Icône d'utilisateur pour Sign in */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6zM12 16c-4.418 0-8 3.582-8 8v2h16v-2c0-4.418-3.582-8-8-8z" />
            </svg>
            Sign in
          </a>
          <a href='/login' className="bg-bgcustom-green text-white py-3 px-4 rounded-lg flex items-center">
            {/* Icône de cadenas pour Log In */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a4 4 0 00-4 4v2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-2V6a4 4 0 00-4-4z" />
            </svg>
            Log In
          </a>
        </div>
      </div>
    </header>


    
  );
};


const SupportDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center">
        Support
        <svg className="ml-1 w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.707a1 1 0 011.414 0L10 11l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 bg-white text-black mt-2 rounded-md shadow-lg py-2 z-50 transition-all duration-300 ease-in-out">
          <a href="/faq" className="block px-4 py-2 hover:bg-gray-200">FAQ</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">About</a>
          <a href="#test" className="block px-4 py-2 hover:bg-gray-200">Testimonials</a>
          <a href="/faq" className="block px-4 py-2 hover:bg-gray-200">Help Center</a>
        </div>
      )}
    </div>
  );
};

export default HeaderHome;
