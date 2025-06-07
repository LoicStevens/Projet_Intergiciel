import { useState, useEffect } from 'react';

const DashboardClient = () => {
  const [user, setUser] = useState(null); // État pour stocker les données de l'utilisateur
  const [errorMessage, setErrorMessage] = useState('');
  const [orders, setOrders] = useState([]); // Commandes fictives
  const [notifications, setNotifications] = useState([]); // Notifications fictives

  // Récupérer les données du client depuis localStorage au montage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setErrorMessage('');
      } catch (error) {
        console.error('Erreur lors du parsing de localStorage:', error);
        setUser(null);
        setErrorMessage('Erreur lors de la récupération du profil.');
        localStorage.removeItem('user'); // Supprimer les données invalides
      }
    } else {
      setErrorMessage('Aucun utilisateur connecté.');
    }
  }, []); // Dépendance vide pour exécuter une seule fois au montage

  // Simuler des commandes et notifications (à remplacer par des appels API réels si nécessaire)
  useEffect(() => {
    // Exemple de données fictives pour les commandes
    setOrders([
      { id: 1, service: 'Développement Web', date: '2025-06-01', status: 'En cours' },
      { id: 2, service: 'IA Consulting', date: '2025-05-28', status: 'Terminé' },
    ]);

    // Exemple de données fictives pour les notifications
    setNotifications([
      { id: 1, message: 'Votre commande #1 est en cours de traitement.', date: '2025-06-03' },
      { id: 2, message: 'Nouveau message de votre prestataire.', date: '2025-06-02' },
    ]);
  }, []);

  // Extraire les champs du profil
  const userName = user?.name || 'Client';
  const userLocation = user?.location || 'Non spécifié';
  const userEmail = user?.email || 'Non spécifié';

  return (
    <div className="max-w-6xl mx-auto bg-gray-100 min-h-screen p-6">
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      {/* Section 1 : En-tête/Bienvenue */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Bienvenue, {userName}
            </h1>
            <p className="text-gray-600">
              Aujourd&apos;hui : {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div>
            <img
              src={'https://via.placeholder.com/80'} // Pas de photoPath dans Client, on utilise une image par défaut
              alt="Profile"
              className="rounded-full w-20 h-20"
            />
          </div>
        </div>
      </section>

      {/* Section 2 : Informations personnelles */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Informations Personnelles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Nom :</span> {userName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Localisation :</span> {userLocation}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Email :</span> {userEmail}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 : Commandes ou services récents */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Commandes Récentes</h2>
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Service</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Statut</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.service}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.status === 'En cours' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">Aucune commande récente.</p>
        )}
      </section>

      {/* Section 4 : Notifications */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
        {notifications.length > 0 ? (
          <ul className="space-y-3">
            {notifications.map(notification => (
              <li key={notification.id} className="flex items-center justify-between border-b py-2">
                <div>
                  <p className="text-gray-800">{notification.message}</p>
                  <p className="text-gray-500 text-sm">{notification.date}</p>
                </div>
                <button className="text-blue-500 hover:underline">Voir</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Aucune notification pour le moment.</p>
        )}
      </section>
    </div>
  );
};

export default DashboardClient;