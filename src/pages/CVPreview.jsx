import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import logo from '../../public/logo.png';
import defaultProfileImage from '../../public/prestataire3.png';
import { getProfileById } from '../api/profileService';

const CVPreview = () => {
  const [leftSectionBgColor, setLeftSectionBgColor] = useState('#1f2937');
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [titleColor, setTitleColor] = useState('#f97316');
  const [textColor, setTextColor] = useState('#4b5563');
  const [bulletStyle, setBulletStyle] = useState('•');
  const cvRef = useRef();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('prestataireProfile');
    const defaultProfile = {
      personalInfo: { name: '', city: '', email: '', birthDate: '', photoPath: '' },
      skillsExperience: { skills: '', languages: '', description: '' },
      professionalDetails: { portfolio: '', price: '', experience: '' },
      availability: '',
    };
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (
          parsed.personalInfo &&
          parsed.skillsExperience &&
          parsed.professionalDetails &&
          typeof parsed.personalInfo.name === 'string'
        ) {
          setPhotoPreview(parsed.personalInfo.photoPath || null);
          return parsed;
        }
        console.warn('Données de localStorage invalides, utilisation des valeurs par défaut');
      } catch (e) {
        console.error('Erreur lors du parsing de prestataireProfile:', e);
      }
    }
    return defaultProfile;
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;
    console.log('userId:', userId);

    if (userId) {
      console.log('Appel de getProfileById avec userId:', userId);
      getProfileById(userId)
        .then(data => {
          console.log('Données reçues:', data);
          console.log('photoPath reçu de l\'API:', data.photoPath);
          const transformedData = {
            personalInfo: {
              name: data.name || '',
              city: data.city || '',
              email: data.email || '',
              birthDate: data.birthDate || '',
              photoPath: data.photoPath || '',
            },
            skillsExperience: {
              skills: data.skills || '',
              languages: data.languages || '',
              description: data.description || '',
            },
            professionalDetails: {
              portfolio: data.portfolio || '',
              price: data.price || '',
              experience: data.experience || '',
            },
            availability: data.availability || '',
          };
          console.log('Données transformées:', transformedData);
          setProfile(transformedData);
          setPhotoPreview(data.photoPath || null);
          localStorage.setItem('prestataireProfile', JSON.stringify(transformedData));
          setErrorMessage('');
        })
        .catch(err => {
          console.error('Erreur récupération profil:', err);
          setErrorMessage(`Erreur lors de la récupération du profil : ${err.message}`);
          localStorage.removeItem('user');
        });
    } else {
      console.log('Aucun userId trouvé dans localStorage');
      setErrorMessage('Aucun utilisateur connecté.');
    }
  }, []);

  useEffect(() => {
    console.log('État profile mis à jour:', profile);
    console.log('photoPreview:', photoPreview);
    console.log('profile.personalInfo.photoPath:', profile.personalInfo.photoPath);
  }, [profile, photoPreview]);

  useEffect(() => {
    const savedStyles = localStorage.getItem('cvStyles');
    if (savedStyles) {
      const styles = JSON.parse(savedStyles);
      setLeftSectionBgColor(styles.leftSectionBgColor || '#1f2937');
      setFontFamily(styles.fontFamily || 'sans-serif');
      setTitleColor(styles.titleColor || '#f97316');
      setTextColor(styles.textColor || '#4b5563');
      setBulletStyle(styles.bulletStyle || '•');
    }
  }, []);

  const handlePhotoChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setPhotoPreview(dataUrl);
        setProfile((prevProfile) => ({
          ...prevProfile,
          personalInfo: { ...prevProfile.personalInfo, photoPath: dataUrl },
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
      setProfile((prevProfile) => ({
        ...prevProfile,
        personalInfo: { ...prevProfile.personalInfo, photoPath: '' },
      }));
    }
  };

  const resetStyles = () => {
    setLeftSectionBgColor('#1f2937');
    setFontFamily('sans-serif');
    setTitleColor('#f97316');
    setTextColor('#4b5563');
    setBulletStyle('•');
    localStorage.setItem('cvStyles', JSON.stringify({
      leftSectionBgColor: '#1f2937',
      fontFamily: 'sans-serif',
      titleColor: '#f97316',
      textColor: '#4b5563',
      bulletStyle: '•',
    }));
  };

  const downloadCV = () => {
    html2canvas(cvRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      });

      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const topMargin = 20;
      const bottomMargin = 10;
      const pageContentHeight = pageHeight - topMargin - bottomMargin;

      let scaledImgHeight = imgHeight;
      if (imgHeight > pageContentHeight) {
        const scaleFactor = pageContentHeight / imgHeight;
        scaledImgHeight = imgHeight * scaleFactor;
      }

      pdf.setFontSize(10);
      pdf.text(`CV de ${profile.personalInfo.name || 'Prestataire'}`, 10, 10);
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 150, 10);

      pdf.addImage(imgData, 'PNG', 10, topMargin, imgWidth, scaledImgHeight);

      const logoWidth = 30;
      const logoHeight = 10;
      const logoY = topMargin + scaledImgHeight + 5;

      if (logoY + logoHeight > pageHeight - bottomMargin) {
        pdf.addPage();
      }

      pdf.addImage(logo, 'PNG', pdf.internal.pageSize.width - logoWidth - 10, logoY, logoWidth, logoHeight);

      pdf.setFontSize(8);
      pdf.text(`Page 1`, pdf.internal.pageSize.width / 2, pageHeight - 10, { align: 'center' });

      pdf.save(`${profile.personalInfo.name || 'Prestataire'}_CV_${new Date().toISOString().split('T')[0]}.pdf`);
    });
  };

  console.log('Valeurs affichées dans le rendu:', {
    name: profile.personalInfo?.name,
    city: profile.personalInfo?.city,
    email: profile.personalInfo?.email,
    skills: profile.skillsExperience?.skills,
    languages: profile.skillsExperience?.languages,
    description: profile.skillsExperience?.description,
    portfolio: profile.professionalDetails?.portfolio,
    price: profile.professionalDetails?.price,
    availability: profile.availability,
    photoPath: profile.personalInfo?.photoPath,
    photoPreview,
  });

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-10 p-6" style={{ fontFamily }}>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <div className="flex flex-wrap justify-between mb-6">
        <div className="flex items-center">
          <label className="block text-sm font-bold mr-2">Couleur section gauche:</label>
          <input
            type="color"
            value={leftSectionBgColor}
            onChange={(e) => setLeftSectionBgColor(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <label className="block text-sm font-bold mr-2">Police globale:</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {['sans-serif', 'serif', 'monospace', 'Arial', 'Georgia', 'Courier New', 'Tahoma', 'Verdana', 'Comic Sans MS', 'Impact'].map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="block text-sm font-bold mr-2">Couleur des titres:</label>
          <input
            type="color"
            value={titleColor}
            onChange={(e) => setTitleColor(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <label className="block text-sm font-bold mr-2">Couleur du texte:</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <label className="block text-sm font-bold mr-2">Style de puces:</label>
          <select
            value={bulletStyle}
            onChange={(e) => setBulletStyle(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="•">Point</option>
            <option value="→">Flèche</option>
            <option value="■">Carré</option>
            <option value="★">Étoile</option>
          </select>
        </div>

        <button
          onClick={resetStyles}
          className="mt-2 bg-gray-500 text-white py-2 px-4 rounded"
        >
          Réinitialiser Styles
        </button>

        <button
          onClick={downloadCV}
          className="mt-2 bg-bgcustom-green text-white py-2 px-4 rounded"
        >
          Download CV
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6" ref={cvRef}>
        <div
          className="col-span-1 text-white p-6 rounded-lg"
          style={{ backgroundColor: leftSectionBgColor }}
        >
          <div className="mb-6">
            <img
              src={photoPreview || defaultProfileImage}
              alt="Profile"
              className="rounded-full w-32 h-32 mx-auto"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={(e) => handlePhotoChange(e.target.files[0])}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase border-b border-gray-700 pb-1 mb-3" style={{ color: titleColor }}>
              Informations
            </h3>
            <p className="text-sm">{profile.personalInfo.city || 'Ville'}</p>
            <p className="text-sm">{profile.personalInfo.email || 'Email'}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase border-b border-gray-700 pb-1 mb-3" style={{ color: titleColor }}>
              Compétences
            </h3>
            <ul className="text-sm space-y-1">
              {(profile.skillsExperience.skills || 'Compétences non spécifiées').split(',').map((skill, index) => (
                <li key={index}>{bulletStyle} {skill.trim()}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase border-b border-gray-700 pb-1 mb-3" style={{ color: titleColor }}>
              Langues
            </h3>
            <ul className="text-sm space-y-1">
              {(profile.skillsExperience.languages || 'Langues non spécifiées').split(',').map((lang, index) => (
                <li key={index}>{bulletStyle} {lang.trim()}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase border-b border-gray-700 pb-1 mb-3" style={{ color: titleColor }}>
              Disponibilité
            </h3>
            <p className="text-sm">{profile.availability || 'Non spécifiée'}</p>
          </div>
        </div>

        <div className="col-span-3 bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold" style={{ color: titleColor }}>
                {profile.personalInfo.name || 'Prénom Nom'}
              </h1>
              <p className="text-sm" style={{ color: textColor }}>
                {profile.personalInfo.city || 'Ville'}
              </p>
              <p className="text-sm" style={{ color: textColor }}>
                {profile.personalInfo.email || 'Email'}
              </p>
            </div>
            <div>
              <img
                src={photoPreview || 'https://via.placeholder.com/80'}
                alt="Profile"
                className="rounded-full w-20 h-20"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold" style={{ color: titleColor }}>Profil Professionnel</h3>
            <p className="text-sm" style={{ color: textColor }}>
              {profile.skillsExperience.description || 'Description professionnelle non spécifiée'}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold" style={{ color: titleColor }}>Détails Professionnels</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold" style={{ color: textColor }}>Expérience</p>
                <p className="text-sm" style={{ color: textColor }}>
                  {profile.professionalDetails.experience || '0'} années {/* Corrigé : professionalDetails au lieu de personalInfo */}
                </p>
                <p className="text-sm" style={{ color: textColor }}>
                  Portfolio: {profile.professionalDetails.portfolio || 'Non spécifié'}
                </p>
                <p className="text-sm" style={{ color: textColor }}>
                  Prix: {profile.professionalDetails.price || 'Non spécifié'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;