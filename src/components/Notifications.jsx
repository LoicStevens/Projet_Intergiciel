import { useState, useEffect } from 'react';
import axios from 'axios';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Récupérer les notifications de l'utilisateur
    axios.get('/api/notifications')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des notifications :', error);
      });
  }, []);

  return (
    <div className="relative">
      <button className="relative z-10 w-8 h-8">
        <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.585 15H15m0 0v-2a3 3 0 00-.879-2.121l-3.65-3.649A3 3 0 007.465 5H5.414A2.034 2.034 0 004 6.586V9m6 6v6m4-6v6m-4 0h4" />
        </svg>
      </button>
      {notifications.length > 0 && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="p-2 border-b border-gray-200">
                {notification.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notifications;
