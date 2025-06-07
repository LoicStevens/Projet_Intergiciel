import  { useState, useEffect } from 'react';
import CreateJob from './CreateJob'; // Ton formulaire existant
import Header from './Header'; // Si tu veux garder le header ici aussi

// Exemple d'appel backend (à adapter plus tard pour qu’il récupère les annonces de l’utilisateur connecté)
const fetchUserAnnouncements = async () => {
  const response = await fetch("http://localhost:9990/api/announcements/client/1"); // Remplacer 1 par l'ID dynamique
  if (!response.ok) throw new Error('Erreur lors de la récupération des annonces');
  return await response.json();
};

const MyAnnouncementsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  const handleToggleForm = () => setShowForm(prev => !prev);

  useEffect(() => {
    // Appel pour récupérer les annonces
    const loadAnnouncements = async () => {
      try {
        const data = await fetchUserAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error(error);
        alert("Erreur de chargement des annonces");
      }
    };
    loadAnnouncements();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <Header />

      <div className="max-w-5xl mx-auto px-4">
        {/* BOUTON CREER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mes Annonces</h1>
          <button
            onClick={handleToggleForm}
            className="bg-bgcustom-green text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            {showForm ? "Masquer le formulaire" : "Créer une annonce"}
          </button>
        </div>

        {/* FORMULAIRE */}
        {showForm && (
          <div className="mb-8">
            <CreateJob />
          </div>
        )}

        {/* LISTE DES ANNONCES */}
        <h2 className="text-xl font-semibold mb-4">Annonces créées</h2>
        <div className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map((job, index) => (
              <div key={index} className="flex justify-between items-center border hover:border-bgcustom-green bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg text-3xl">
                    🛠️
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-gray-500">
                      📍 {job.location} | 💼 {job.projectType}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <a href={`/detail/${job.id}`} className="bg-bgcustom-green text-white px-4 py-2 rounded-lg shadow hover:bg-white hover:text-bgcustom-green border hover:border-bgcustom-green">
                    Voir
                  </a>
                  <p className="text-gray-400 text-sm mt-2">Prix: ${job.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aucune annonce trouvée.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAnnouncementsPage;
