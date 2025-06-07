import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { updateProfile } from '../api/profileService';
import 'jspdf-autotable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileAlt, faFolderOpen, faCog } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // Récupérer le profil depuis localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    const user = JSON.parse(localStorage.getItem('user'));
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else if (user?.id) {
      navigate('/profile-completion');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!profile) {
    return <div>Chargement...</div>;
  }

  const renderSection = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection profile={profile} />;
      case 'cv':
        return <CVResumeSection profile={profile} />;
      case 'portfolio':
        return <PortfolioSection portfolio={profile.portfolio} />;
      case 'settings':
        return <SettingsSection profile={profile} setProfile={setProfile} />;
      default:
        return <ProfileSection profile={profile} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto py-10 px-6">
        <div className="bg-white shadow rounded-lg p-8 flex items-center justify-between">
          <div className="mr-6">
            <img
              src={profile.photo || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="rounded-full w-28 h-28 shadow-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-semibold text-gray-800">{profile.name}</h3>
            <p className="text-gray-500 text-lg">Prestataire</p>
          </div>
          <div className="text-gray-700">
            <p><strong>Disponibilité :</strong> Temps plein</p>
            <p><strong>Ville :</strong> {profile.city}</p>
            <p><strong>Prix :</strong> {profile.price || 'Non spécifié'}</p>
          </div>
        </div>

        <div className="flex mt-5 border-b-2 border-gray-200">
          {[
            { name: 'profile', icon: faUser },
            { name: 'cv', icon: faFileAlt },
            { name: 'portfolio', icon: faFolderOpen },
            { name: 'settings', icon: faCog },
          ].map((tab) => (
            <button
              key={tab.name}
              className={`px-5 py-2 flex items-center ${activeTab === tab.name ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab.name)}
            >
              <FontAwesomeIcon icon={tab.icon} className="mr-2" />
              {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-5">{renderSection()}</div>
      </div>
    </div>
  );
};

// Profile Section
const ProfileSection = ({ profile }) => {
  const sections = [
    {
      title: 'personalInfo',
      displayTitle: 'Informations Personnelles',
      description: 'Vos informations personnelles.',
      fields: [
        { label: 'Nom', value: profile.name },
        { label: 'Ville', value: profile.city },
        { label: 'Email', value: profile.email },
        { label: 'Date de Naissance', value: profile.birthDate },
      ],
    },
    {
      title: 'skillsExperience',
      displayTitle: 'Compétences et Expérience',
      description: 'Vos compétences et expérience professionnelle.',
      fields: [
        { label: 'Compétences', value: profile.skills },
        { label: 'Langues', value: profile.languages },
        { label: 'Description', value: profile.description },
      ],
    },
    {
      title: 'professionalDetails',
      displayTitle: 'Détails Professionnels',
      fields: [
        { label: 'Portfolio', value: profile.portfolio || 'Non spécifié' },
        { label: 'Prix', value: profile.price || 'Non spécifié' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1 text-white p-6 rounded-lg bg-gray-800">
        {sections[0].fields.map((field, index) => (
          <div key={index} className="mb-4">
            <strong className="block">{field.label}:</strong>
            <span className="text-gray-300">{field.value}</span>
          </div>
        ))}
      </div>
      <div className="col-span-3 bg-gray-50 p-6 rounded-lg">
        {sections.slice(1).map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{section.displayTitle}</h3>
            {section.fields.map((field, idx) => (
              <p key={idx}>
                <strong>{field.label}:</strong> {field.value}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileSection.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    birthDate: PropTypes.string,
    skills: PropTypes.string,
    languages: PropTypes.string,
    description: PropTypes.string,
    portfolio: PropTypes.string,
    price: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

// CV/Resume Section
const CVResumeSection = ({ profile }) => {
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">CV/Resume</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aperçu du CV */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-2">Aperçu du CV</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            {profile.photo && (
              <img
                src={profile.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
            )}
            <h5 className="text-xl font-semibold text-gray-800 text-center">{profile.name}</h5>
            <p className="text-gray-600 text-center">{profile.city}</p>
            <p className="text-gray-600 text-center">{profile.email}</p>
            <hr className="my-4 border-gray-200" />
            <h6 className="text-md font-medium text-gray-700">Compétences</h6>
            <p className="text-gray-600">{profile.skills}</p>
            <h6 className="text-md font-medium text-gray-700 mt-4">Langues</h6>
            <p className="text-gray-600">{profile.languages}</p>
            <h6 className="text-md font-medium text-gray-700 mt-4">Description</h6>
            <p className="text-gray-600">{profile.description}</p>
            <h6 className="text-md font-medium text-gray-700 mt-4">Détails Professionnels</h6>
            <p className="text-gray-600">Portfolio : {profile.portfolio || 'Non spécifié'}</p>
            <p className="text-gray-600">Prix : {profile.price || 'Non spécifié'}</p>
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-col justify-center items-center">
          <a
            href="/cv-preview"
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md shadow-md"
          >
            Voir le CV
          </a>
        </div>
      </div>
    </div>
  );
};

CVResumeSection.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    birthDate: PropTypes.string,
    skills: PropTypes.string,
    languages: PropTypes.string,
    description: PropTypes.string,
    portfolio: PropTypes.string,
    price: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

// Portfolio Section
const PortfolioSection = ({ portfolio }) => (
  <div className="p-6 bg-white shadow rounded-lg">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio</h3>
    {portfolio ? (
      <div className="bg-gray-100 p-4 text-center rounded-lg shadow">
        <a href={portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Voir le portfolio : {portfolio}
        </a>
      </div>
    ) : (
      <p className="text-gray-600">Aucun portfolio spécifié.</p>
    )}
  </div>
);

PortfolioSection.propTypes = {
  portfolio: PropTypes.string,
};

// Settings Section
const SettingsSection = ({ profile, setProfile }) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    city: profile.city || '',
    email: profile.email || '',
    birthDate: profile.birthDate || '',
    skills: profile.skills || '',
    languages: profile.languages || '',
    description: profile.description || '',
    portfolio: profile.portfolio || '',
    price: profile.price || '',
    photo: null,
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('birthDate', formData.birthDate);
      formDataToSend.append('skills', formData.skills);
      formDataToSend.append('languages', formData.languages);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('portfolio', formData.portfolio);
      formDataToSend.append('price', formData.price);
      if (formData.photo) {
        formDataToSend.append('file', formData.photo);
      }

      await updateProfile(userId, formDataToSend);

      const updatedProfile = {
        ...profile,
        ...formData,
        photo: formData.photo ? URL.createObjectURL(formData.photo) : profile.photo,
      };
      localStorage.setItem('profile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);

      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      alert('Erreur lors de la mise à jour du profil.');
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mettre à jour le profil</h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Entrez votre nom"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ville</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Entrez votre ville"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Entrez votre email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date de Naissance</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Compétences</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Entrez vos compétences"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Langues</label>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Entrez vos langues parlées"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Entrez une description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Portfolio</label>
          <input
            type="text"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Entrez l'URL de votre portfolio"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prix</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Entrez votre prix"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo de profil</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md"
          type="submit"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

SettingsSection.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    birthDate: PropTypes.string,
    skills: PropTypes.string,
    languages: PropTypes.string,
    description: PropTypes.string,
    portfolio: PropTypes.string,
    price: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  setProfile: PropTypes.func.isRequired,
};

export default ProfilePage;