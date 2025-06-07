import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('PRESTATAIRE'); // correspond à l'enum Java
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: role.toUpperCase() // pour correspondre à l'enum Java (CLIENT, PRESTATAIRE)
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Inscription réussie :", data);

        // Stockage de la session
        localStorage.setItem('user', JSON.stringify(data));
// Redirection selon le rôle
if (data.role === 'CLIENT') {
   try {
          const clientProfileResponse = await fetch('http://localhost:8083/api/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: data.id,
              name: data.name,
              email: data.email,
              location: data.location,
            })
          });

    if (clientProfileResponse.ok) {
      console.log("✅ Profil client créé");
     navigate('/home-client');
    } else {
      console.error("❌ Erreur création profil client :", await clientProfileResponse.text());
    }
  } catch (clientProfileError) {
    console.error("🚨 Erreur réseau création profil client :", clientProfileError);
  }
  
} else if (data.role === 'PRESTATAIRE') {
  // Création du profil prestataire
  try {
    const profileResponse = await fetch('http://localhost:8083/api/prestataires', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email,
        city: "",
        skills: "",
        location: "",
        experience: "",
        availability: ""
      })
    });

    if (profileResponse.ok) {
      console.log("✅ Profil prestataire créé");
      navigate('/profil-completion'); // Redirection vers la page de profil
    } else {
      console.error("❌ Erreur création profil :", await profileResponse.text());
    }
  } catch (profileError) {
    console.error("🚨 Erreur réseau création profil :", profileError);
  }
}

} else {
console.error("❌ Erreur :", data.message || "Erreur inconnue");
}
} catch (error) {
console.error("🚨 Erreur réseau :", error);
} finally {
setLoading(false);
}};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img src="logo.png" alt="JobOs" className="h-12" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Registration
        </h2>

        <div className="flex justify-around mb-6">
          <button
            onClick={() => setRole('PRESTATAIRE')}
            className={`flex items-center p-2 border rounded-lg w-full justify-center mx-1 ${
              role === 'PRESTATAIRE' ? 'bg-custom-green text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <span className="mr-2">🛠️</span>
            I’m Provider
          </button>
          <button
            onClick={() => setRole('CLIENT')}
            className={`flex items-center p-2 border rounded-lg w-full justify-center mx-1 ${
              role === 'CLIENT' ? 'bg-custom-green text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <span className="mr-2">👤</span>
            I’m Customer
          </button>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-custom-green"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-custom-green"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-custom-green"
                required
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600">
                👁
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md focus:outline-none ${
              loading ? 'bg-gray-400' : 'bg-custom-green hover:bg-green-600 text-white'
            }`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          You already have an account?{' '}
          <Link to="/login" className="text-custom-green hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
