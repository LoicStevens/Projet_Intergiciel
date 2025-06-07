import axios from 'axios';

const PROFILE_API_BASE_URL = 'http://localhost:8083/api/prestataires';

export const getProfileById = async (id) => {
  try {
    const response = await axios.get(`${PROFILE_API_BASE_URL}/${id}`);
    console.log('Données reçues de getProfileById:', response.data); // Ajout pour débogage
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil :', error);
    throw error;
  }
};

export const createProfile = async (profileData) => {
  try {
    const response = await axios.post(PROFILE_API_BASE_URL, profileData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du profil :', error);
    throw error;
  }
};

export const updateProfile = async (id, profileData) => {
  try {
    // Débogage : afficher le contenu de FormData
    for (let [key, value] of profileData.entries()) {
      console.log(`Clé: ${key}, Valeur: ${value}`);
    }
    const response = await axios.put(`${PROFILE_API_BASE_URL}/${id}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil :', error);
    throw error;
  }
};