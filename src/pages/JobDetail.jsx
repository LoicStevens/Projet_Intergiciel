import { useState } from 'react';
import Header from "../components/Header";
import { FaFacebook, FaWhatsapp, FaLinkedin, FaCloudUploadAlt, } from "react-icons/fa"; // Import des icônes depuis React Icons

const JobDetail = () => {
  // État pour contrôler l'ouverture de la modale
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Insertion du Header au-dessus */}
      <Header />

      {/* Contenu de la page */}
      <div className="bg-gray-100 py-8 "> {/* Contexte avec fond gris clair pour différencier */}
        
        {/* Conteneur global du job detail, aligné à gauche avec marge */}
        <div className="max-w-6xl  mx-4 p-6 bg-white rounded-lg shadow-lg">
          
          {/* Titre et résumé du poste */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">Machine Learning Specialist</h1>
              <div className="flex items-center text-gray-500 space-x-3">
                <a href="#" className="text-bgcustom-green hover:underline">Remote Staffers, Inc.</a>
                <span>|</span>
                <span>HQ: Des Plaines, Illinois, United States</span>
              </div>
              <div className="flex items-center text-gray-500 space-x-2 mt-2">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded-full">full time</span>
                <span className="text-black">Remote job</span>
                <span className="text-gray-400">1 min ago</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">$60/hr</div>
              <button 
                className="bg-bgcustom-green border hover:border-black text-white px-4 py-2 mt-4 rounded-md hover:bg-white hover:text-black"
                onClick={() => setIsModalOpen(true)}  // Ouvre la modale
              >
                Apply to job
              </button>
            </div>
          </div>

          {/* Description du poste */}
          <div className="mt-6 text-gray-700">
            <p>
              Posting a job on Hubstaff Talent will get your project in front of the most qualified contractors and agencies.
              You will then get applications for the job with the applicant&apos;s details and reasons why they are the best fit for the job.
              You can also search for contractors and invite them to apply.
            </p>
          </div>

          {/* Compétences */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">JOB SKILLS</h3>
            <div className="mt-2">
              <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Desktop Development</span>
            </div>
          </div>

          {/* Exigences */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">REQUIREMENTS</h3>
            <div className="mt-2 text-gray-700">
              <p><strong>Availability:</strong> Full-time (40 hrs/wk)</p>
              <p><strong>Experience level:</strong> Expert (5+ yrs)</p>
              <p><strong>Languages:</strong> English</p>
            </div>
          </div>

          {/* Boutons "Apply" et "Partager" */}
          <div className="mt-8 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span>Share this job:</span>
              {/* Utilisation des icônes pour les boutons de partage */}
              <a href="#" className="text-bgcustom-green hover:underline">
                <FaWhatsapp size={24} />
              </a>
              <a href="#" className="text-bgcustom-green hover:underline">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-bgcustom-green hover:underline">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modale de candidature */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Apply for the job</h2>
            {/* Formulaire de candidature */}
            <form>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your name" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                />
              </div>
              <div className="mt-4">
                <input 
                  type="text" 
                  placeholder="Website/Portfolio link" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                />
              </div>
              <div className="mt-4">
                    <label htmlFor="file-upload" className="border border-gray-300 p-2 rounded-lg w-full flex items-center justify-center cursor-pointer hover:bg-gray-100">
                     <FaCloudUploadAlt className="text-gray-400 mr-2" /> {/* Icône à gauche */}
                     <span className="text-gray-500">Upload CV</span>
                           <input 
                             id="file-upload"
                             type="file" 
                              className="hidden"  // Input caché, seulement accessible via le label
                                  />
                         </label>
                        </div>
              <div className="mt-4">
                <textarea 
                  placeholder="Coverletter" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  rows="5"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-between">
                <button 
                  type="button" 
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                  onClick={() => setIsModalOpen(false)}  // Ferme la modale
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-bgcustom-green text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Apply Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
