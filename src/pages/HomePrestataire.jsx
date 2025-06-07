import  { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import Jobs from '../components/JobListing';

const HomePrestataire = () => {

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
      <Header />
                                                
      {/* Contenu principal */}
      <div className="bg-bgcustom-green py-12 flex-grow">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
          {/* Texte d'information */}
          <div 
            className={`lg:w-1/2 mb-8 lg:mb-0 transform transition-transform duration-1000 ease-out ${
              isVisible ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <h1 className="text-4xl font-bold text-white mb-4">4536+ Jobs listed</h1>
            <h2 className="text-3xl font-bold text-white mb-4">Find your Dream Job</h2>
            <p className="text-white mb-6">
              We provide online instant cash loans with quick approval that suit your term length
            </p>
            <button className="bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded">
              Upload Your Resume
            </button>
          </div>

          {/* Section image */}
          <div 
            className={`hidden lg:block lg:w-1/2 transform transition-transform duration-1000 ease-out ${
              isVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <img 
              src="/prestataire3.png"  
              alt="Job Listings" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Section de recherche */}
<div className="bg-gray-50 py-8 shadow-sm">
  <div className="container mx-auto px-4 text-center">
    {/* Barre de recherche */}
    <div className="flex flex-col md:flex-row items-center justify-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
      <input 
        type="text" 
        placeholder="Search keyword" 
        className="border border-gray-300 rounded-full px-6 py-3 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-bgcustom-green transition duration-300 shadow-sm"
      />
      <select 
        className="border border-gray-300 rounded-full px-6 py-3 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm"
      >
        <option>Location</option>
        <option>New York</option>
        <option>Los Angeles</option>
        <option>San Francisco</option>
      </select>
      <select 
        className="border border-gray-300 rounded-full px-6 py-3 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm"
      >
        <option>Category</option>
        <option>Marketing</option>
        <option>Administration</option>
        <option>Engineering</option>
      </select>
      <button className="bg-bgcustom-green hover:bg-white hover:text-bgcustom-green hover:border-bgcustom-green border-2 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
        Find Job
      </button>
    </div>
    
    {/* Popular Search */}
    <div className="my-6">
      {/* Titre */}
      <p className="text-gray-600 text-lg mb-4">Popular Search:</p>

      {/* Boutons de recherche populaire */}
      <div className="flex flex-wrap space-x-2">
        {['Design & Creative', 'Marketing', 'Administration', 'Teaching & Education', 'Engineering', 'Software & Web', 'Telemarketing'].map((category, index) => (
          <a 
            key={index} 
            href="#" 
            className="border-2 hover:border-bgcustom-green text-bgcustom-green  hover:text-blue-500 transition duration-300 text-sm px-4 py-2 rounded-lg cursor-pointer focus:outline-none"
            style={{ minWidth: '150px', textAlign: 'center' }}
          >
            {category}
          </a>
        ))}
      </div>
    </div>
  </div>
</div>
            {/* Categories */}
            <Categories/>

             {/* Jobs Listing */}
             <Jobs/>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePrestataire;
