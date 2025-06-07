import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import logo from '../../public/logo.png';

const ViewProfile = () => {
  const cvRef = useRef();

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
  
      pdf.addImage(imgData, 'PNG', 10, topMargin, imgWidth, scaledImgHeight);
      
      const logoWidth = 30;
      const logoHeight = 10;
      const logoY = topMargin + scaledImgHeight + 5;
  
      if (logoY + logoHeight > pageHeight - bottomMargin) {
        pdf.addPage();
      }
  
      pdf.addImage(logo, 'PNG', pdf.internal.pageSize.width - logoWidth - 10, logoY, logoWidth, logoHeight);
      pdf.save('Florian Sapin_Profile.pdf');
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-10 p-6">
      <button
        onClick={downloadCV}
        className="mb-6 bg-bgcustom-green text-white py-2 px-4 rounded"
      >
        Download Profile
      </button>

      <div className="grid grid-cols-4 gap-6" ref={cvRef}>
        <div
          className="col-span-1 text-white p-6 rounded-lg"
          style={{ backgroundColor: '#1f2937' }}
        >
          <div className="mb-6">
            <img
              src="/public/prestataire3.png"
              alt="Profile"
              className="rounded-full w-32 h-32 mx-auto"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase border-b border-gray-700 pb-1 mb-3" style={{ color: '#f97316' }}>
              Formation
            </h3>
            <p className="text-sm">2020</p>
            <p className="text-sm">Master MEEF</p>
            <p className="text-sm">INSPÉ de l&apos;académie de Paris | Paris</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase border-b border-gray-700 pb-1 mb-3" style={{ color: '#f97316' }}>
              Compétences
            </h3>
            <ul className="text-sm space-y-1">
              <li>• Conception des leçons</li>
              <li>• Écoute active</li>
              <li>• Encadrement des travaux pratiques</li>
              <li>• Technologies de l’éducation</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase border-b border-gray-700 pb-1 mb-3" style={{ color: '#f97316' }}>
              Langues
            </h3>
            <p className="text-sm">Anglais - B2</p>
            <p className="text-sm">Espagnol - B2</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase border-b border-gray-700 pb-1 mb-3" style={{ color: '#f97316' }}>
              Centres d&apos;intérêt
            </h3>
            <ul className="text-sm space-y-1">
              <li>• Littérature</li>
              <li>• Cinéma</li>
              <li>• Sports d’équipe</li>
            </ul>
          </div>
        </div>

        <div className="col-span-3 bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold" style={{ color: '#f97316' }}>Florian Sapin</h1>
              <p className="text-sm" style={{ color: '#4b5563' }}>Paris, 75092</p>
              <p className="text-sm" style={{ color: '#4b5563' }}>06 23 94 16</p>
              <p className="text-sm" style={{ color: '#4b5563' }}>florian.sapin@gmail.com</p>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="rounded-full"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold" style={{ color: '#f97316' }}>Profil Professionnel</h3>
            <p className="text-sm" style={{ color: '#4b5563' }}>
              Dévouement envers la promotion de l&apos;apprentissage des élèves à travers des approches différenciées de la pédagogie et de la gestion de classe.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold" style={{ color: '#f97316' }}>Parcours Professionnel</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold" style={{ color: '#4b5563' }}>Septembre 2020 - Actuel</p>
                <p className="text-sm" style={{ color: '#4b5563' }}>École primaire Marie Curie | Chambéry</p>
                <p className="text-sm" style={{ color: '#4b5563' }}>Professeur de mathématiques</p>
                <ul className="text-sm ml-5" style={{ color: '#4b5563' }}>
                  <li>• Évaluer les besoins de chaque élève.</li>
                  <li>• Adapter les contenus pour maximiser l&apos;apprentissage.</li>
                  <li>• Collaborer avec les enseignants sur les projets.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold" style={{ color: '#f97316' }}>Informatique</h3>
            <ul className="text-sm" style={{ color: '#4b5563' }}>
              <li>• Microsoft Office 5/5</li>
              <li>• Zoom 5/5</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold" style={{ color: '#f97316' }}>Certificats</h3>
            <ul className="text-sm" style={{ color: '#4b5563' }}>
              <li>• Certificat de secourisme obtenu en 2020</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
