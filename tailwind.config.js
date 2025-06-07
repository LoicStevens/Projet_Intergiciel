export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Chemin vers vos fichiers sources React
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': 'rgba(44, 131, 134, 0.897)', // Ajoute la couleur ici avec le nom que tu veux
        'bgcustom-green': 'rgba(44, 131, 134, 0.999)', // Ajoute la couleur ici avec le nom que tu veux
      },
    },
  },
  plugins: [],
}
