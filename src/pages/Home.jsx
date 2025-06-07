
import  { useState, useEffect } from 'react';
import HeaderClient from '../components/HeaderClient';
import Footer from '../components/Footer';

import AffiliatePartners from '../components/AffiliatePartners';
import Categories from '../components/Categories';
const Home = () => {
   
    const [isVisible, setIsVisible] = useState(false);

    // Activer l'animation après que le composant ait été monté
    useEffect(() => {
      setTimeout(() => {
        setIsVisible(true);
      }, 500); // Délai pour déclencher l'animation (0.5 seconde après le chargement)
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <HeaderClient />

            {/* Contenu principal */}
            <div className="flex-grow bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-bgcustom-green text-white py-12">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12">
                    {/* Text Section */}
                        <div 
                        className={`lg:w-1/2 mb-8 lg:mb-0 transform transition-transform duration-1000 ease-out ${
                        isVisible ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        <h1 className="text-3xl lg:text-5xl text-black font-bold mb-4">
                            Find & Hire Expert Freelancers
                        </h1>
                        <p className="text-lg lg:text-xl mb-6">
                            Work with the best freelance talent from around the world on our secure, flexible and cost-effective platform.
                        </p>

                        {/* Search Bar */}
                        <div className="flex items-center bg-white rounded-full p-2 lg:w-3/4 shadow-lg mb-6">
                            <input
                                type="text"
                                placeholder="What skill are you looking for?"
                                className="flex-grow px-4 py-2 text-black outline-none rounded-l-full"
                            />
                            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-bgcustom-green">
                                Search
                            </button>
                        </div>

                        {/* CTA Button */}
                        <div>
                            <button className="bg-black text-white py-2 px-6 rounded-full ">
                                Post a Job - It&apos;s Free
                            </button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div 
            className={`hidden lg:block lg:w-1/2 transform transition-transform duration-1000 ease-out ${
              isVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
                        <img
                            src="client.png"
                            alt="Expert Freelancer"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            </div>

         {/* Services Section */}
        
            <Categories/>
        
            {/* Statistics Section */}
            <div className="bg-white py-8">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between px-6 lg:px-12 text-center lg:text-left">
                    <div className="lg:w-1/4 mb-6 lg:mb-0">
                        <h2 className="text-2xl font-bold">800,000</h2>
                        <p>Employers Worldwide</p>
                    </div>
                    <div className="lg:w-1/4 mb-6 lg:mb-0">
                        <h2 className="text-2xl font-bold">1 Million</h2>
                        <p>Paid Invoices</p>
                    </div>
                    <div className="lg:w-1/4 mb-6 lg:mb-0">
                        <h2 className="text-2xl font-bold">$250 Million</h2>
                        <p>Paid to Freelancers</p>
                    </div>
                    <div className="lg:w-1/4">
                        <h2 className="text-2xl font-bold">99%</h2>
                        <p>Customer Satisfaction Rate</p>
                    </div>
                </div>
            </div>
        </div>

                {/* Partner section */}
                <div> 
                    <AffiliatePartners/>
                </div>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
