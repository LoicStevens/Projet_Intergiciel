import { useState, useEffect } from 'react';
import { getProfileById, updateProfile } from '../api/profileService';
import { useNavigate } from 'react-router-dom';

const ProfileCompletion = () => {
  const [profile, setProfile] = useState({
    personalInfo: { name: '', city: '', email: '', birthDate: '', photo: '' },
    skillsExperience: { skills: '', languages: '', description: '' },
    professionalDetails: { portfolio: '', price: '' },
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  const sections = [
    {
      title: 'personalInfo',
      displayTitle: 'Informations Personnelles',
      description: 'Renseignez vos informations personnelles. Ces détails nous aident à mieux vous connaître.',
      fields: [
        { label: 'Nom', type: 'text', key: 'name' },
        { label: 'Ville', type: 'text', key: 'city' },
        { label: 'Email', type: 'email', key: 'email' },
        { label: 'Date de Naissance', type: 'date', key: 'birthDate' },
      ],
    },
    {
      title: 'skillsExperience',
      displayTitle: 'Compétences et Expérience',
      description: 'Décrivez vos compétences, vos langues parlées, et une brève description de votre parcours.',
      fields: [
        { label: 'Compétences', type: 'textarea', key: 'skills' },
        { label: 'Langues', type: 'text', key: 'languages' },
        { label: 'Description', type: 'textarea', key: 'description' },
      ],
    },
    {
      title: 'professionalDetails',
      displayTitle: 'Détails Professionnels',
      description: 'Partagez votre portfolio et vos tarifs.',
      fields: [
        { label: 'Portfolio', type: 'text', key: 'portfolio' },
        { label: 'Prix', type: 'number', key: 'price' },
      ],
    },
  ];

  const handleInputChange = (field, value) => {
    if (field === 'photo') {
      const file = value;
      setProfile((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [field]: file,
        },
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      if (file) reader.readAsDataURL(file);
    } else {
      setProfile((prev) => ({
        ...prev,
        [sections[currentSection].title]: {
          ...prev[sections[currentSection].title],
          [field]: value,
        },
      }));
    }
  };

const handleNext = async () => {
  if (currentSection < sections.length) {
    setCurrentSection((prev) => prev + 1);
  } else {
    try {
      document.querySelector('button.bg-green-500').disabled = true;

      // Validation des champs obligatoires
      const requiredFields = ['name', 'email', 'city', 'birthDate', 'skills', 'languages', 'description'];
      const missingFields = requiredFields.filter(
        (field) => !profile.personalInfo[field] && !profile.skillsExperience[field]
      );
      if (missingFields.length > 0) {
        alert(`Veuillez remplir tous les champs obligatoires : ${missingFields.join(', ')}`);
        return;
      }

      // Validation du format de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(profile.personalInfo.email)) {
        alert('Veuillez entrer un email valide.');
        return;
      }

      // Validation du format de birthDate
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(profile.personalInfo.birthDate)) {
        alert('La date de naissance doit être au format yyyy-MM-dd.');
        return;
      }

      // Validation de price
      if (profile.professionalDetails.price && isNaN(parseFloat(profile.professionalDetails.price))) {
        alert('Le prix doit être un nombre valide.');
        return;
      }

      const formData = new FormData();
      formData.append('name', profile.personalInfo.name);
      formData.append('email', profile.personalInfo.email);
      formData.append('city', profile.personalInfo.city);
      formData.append('birthDate', profile.personalInfo.birthDate);
      formData.append('skills', profile.skillsExperience.skills);
      formData.append('languages', profile.skillsExperience.languages);
      formData.append('description', profile.skillsExperience.description);
      formData.append('portfolio', profile.professionalDetails.portfolio || '');
      formData.append('price', profile.professionalDetails.price || '');

      if (profile.personalInfo.photo) {
        formData.append('file', profile.personalInfo.photo);
      }

      console.log('Données envoyées:', Object.fromEntries(formData));
      const updatedProfile = await updateProfile(userId, formData); // Récupérer la réponse de l'API

      // Mettre à jour le state avec photoPath
      const newProfile = {
        ...profile,
        personalInfo: {
          ...profile.personalInfo,
          photo: null, // Supprimer l'objet File
          photoPath: updatedProfile.photoPath || profile.personalInfo.photoPath || '', // Utiliser photoPath du serveur
        },
      };
      setProfile(newProfile);

      // Stocker dans localStorage
      localStorage.setItem('profile', JSON.stringify(newProfile));

      // Mettre à jour photoPreview pour l'affichage local
      if (updatedProfile.photoPath) {
        setPhotoPreview(`http://localhost:8083/Uploads/${updatedProfile.photoPath}`);
      }

      alert('Profil complété avec succès !');
      navigate('/home-prestataire');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Une erreur est survenue : ${errorMessage}`);
      console.log('Détails de l\'erreur:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    } finally {
      document.querySelector('button.bg-green-500').disabled = false;
    }
  }
};
  const handleBack = () => {
    if (currentSection > 0) setCurrentSection((prev) => prev - 1);
  };

  const renderVerificationSection = () => (
    <div>
      <h3 className="text-lg font-bold mb-4 text-custom-green">Veuillez vérifier vos informations :</h3>
      <div className="mb-4">
        <h4 className="font-semibold">Informations Personnelles</h4>
        <p>Nom : {profile.personalInfo.name}</p>
        <p>Ville : {profile.personalInfo.city}</p>
        <p>Email : {profile.personalInfo.email}</p>
        <p>Date de Naissance : {profile.personalInfo.birthDate}</p>
        {photoPreview && <img src={photoPreview} alt="Profile" className="w-32 h-32 rounded-full mt-4 mx-auto" />}
      </div>
      <div className="mb-4">
        <h4 className="font-semibold">Compétences et Expérience</h4>
        <p>Compétences : {profile.skillsExperience.skills}</p>
        <p>Langues : {profile.skillsExperience.languages}</p>
        <p>Description : {profile.skillsExperience.description}</p>
      </div>
      <div>
        <h4 className="font-semibold">Détails Professionnels</h4>
        <p>Portfolio : {profile.professionalDetails.portfolio}</p>
        <p>Prix : {profile.professionalDetails.price}</p>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfileById(userId);
        setProfile({
          personalInfo: {
            name: profile.name || '',
            city: profile.city || '',
            email: profile.email || '',
            birthDate: profile.birthDate || '',
            photo: '',
          },
          skillsExperience: {
            skills: profile.skills || '',
            languages: profile.languages || '',
            description: profile.description || '',
          },
          professionalDetails: {
            portfolio: profile.portfolio || '',
            price: profile.price || '',
          },
        });
        if (profile.photoPath) setPhotoPreview(profile.photoPath);
      } catch (error) {
        console.error('Erreur lors du chargement du profil :', error);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-full mx-auto mt-10">
      <div className="flex justify-center mb-6">
        <img src="logo.png" alt="Logo" className="h-16" />
      </div>

      {/* Étapes */}
      <div className="flex justify-around mb-6">
        {sections.map((_, i) => (
          <div key={i} className="flex items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-lg ${
              currentSection === i ? 'bg-custom-green' : 'bg-gray-300'}`}>
              {i + 1}
            </div>
            {i < sections.length - 1 && <div className="w-20 h-1 bg-gray-300 mx-2"></div>}
          </div>
        ))}
        <div className="flex items-center">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-lg ${
            currentSection === sections.length ? 'bg-custom-green' : 'bg-gray-300'}`}>
            ✔
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
        {currentSection < sections.length ? sections[currentSection].displayTitle : 'Vérification des Informations'}
      </h2>

      <p className="text-center text-gray-600 mb-6">
        {currentSection < sections.length ? sections[currentSection].description : 'Confirmez que toutes vos informations sont correctes.'}
      </p>

      {currentSection === 0 && (
        <div className="flex justify-center mb-6">
          <label htmlFor="photo-upload" className="relative cursor-pointer">
            <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">Ajouter une Photo</span>
              )}
            </div>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleInputChange('photo', e.target.files[0])}
            />
          </label>
        </div>
      )}

      <div className="mb-4">
        {currentSection < sections.length ? (
          sections[currentSection].fields.map((field) => (
            <div key={field.key} className="mb-6">
              {field.type === 'textarea' ? (
                <textarea
                  placeholder={field.label}
                  className="p-4 border border-gray-300 rounded-lg w-full h-32 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={profile[sections[currentSection].title][field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.label}
                  className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={profile[sections[currentSection].title][field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                />
              )}
            </div>
          ))
        ) : (
          renderVerificationSection()
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {currentSection > 0 && (
          <button
            onClick={handleBack}
            className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500"
          >
            Retour
          </button>
        )}
        <button
          onClick={handleNext}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 ml-auto"
        >
          {currentSection < sections.length ? 'Suivant' : 'Valider'}
        </button>
      </div>
    </div>
  );
};

export default ProfileCompletion;
