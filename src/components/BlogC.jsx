import { useState } from 'react';
import { AiOutlineLike, AiOutlineFileImage, AiOutlineClose } from 'react-icons/ai';
import { FiFileText } from 'react-icons/fi';
import { MdTitle } from 'react-icons/md';
import HeaderClient from '../components/HeaderClient';

const Blog = () => {
  const initialBlogPosts = [
    {
      image: "/public/home.png",
      date: "15 Jan",
      title: "Go inks pact for new 35-storey office",
      description: "That dominion stars lights dominion divide years for fourth have don't stars is that he earth it first without heaven in place seed it second morning saying.",
      categories: ["Trading", "Lifestyle"],
      likes: 25,
    },
    {
      image: "image_url_2.jpg",
      date: "15 Jan",
      title: "Google inks pact for new 35-storey office",
      description: "That dominion stars lights dominion divide years for fourth have don't stars is that he earth it first without heaven in place seed it second morning saying.",
      categories: ["Travel", "Lifestyle"],
      likes: 12,
    }
  ];

  const recentPosts = [
    { title: "From life was you fish...", date: "January 12, 2019" },
    { title: "The Amazing Hubble", date: "02 Hours ago" },
    { title: "Astronomy Or Astrology", date: "03 Hours ago" },
    { title: "Asteroids telescope", date: "01 Hours ago" }
  ];

  const categories = [
    { name: "Restaurant food", count: 37 },
    { name: "Travel news", count: 10 },
    { name: "Modern technology", count: 3 },
    { name: "Product", count: 11 },
    { name: "Inspiration", count: 21 }
  ];

  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialBlogPosts);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', description: '', image: null });

  // Fonction pour incrémenter les likes
  const handleLike = (index) => {
    const updatedPosts = [...blogPosts];
    updatedPosts[index].likes += 1;
    setBlogPosts(updatedPosts);
  };

  // Gestion de l'entrée du nouvel article de blog
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewBlog((prevBlog) => ({
      ...prevBlog,
      image: URL.createObjectURL(file) // Prévisualisation de l'image
    }));
  };

  // Fonction pour filtrer les articles par mot-clé
  const handleSearch = () => {
    const lowerKeyword = searchKeyword.toLowerCase();
    const filtered = blogPosts.filter(post => 
      post.title.toLowerCase().includes(lowerKeyword) ||
      post.description.toLowerCase().includes(lowerKeyword) ||
      post.categories.some(category => category.toLowerCase().includes(lowerKeyword))
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderClient />

      <div className="container mx-auto py-10 max-w-7xl">
        <div className="flex flex-col md:flex-row">
          {/* Blog Post section */}
          <div className="md:w-2/3">
            {/* Bouton pour poster un nouveau blog */}
            <div className="flex justify-start mb-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-bgcustom-green text-white px-4 py-2 rounded-md "
              >
                Post Blog
              </button>
            </div>

            {filteredPosts.map((post, index) => (
              <div key={index} className="my-6 border border-gray-300 shadow-lg bg-white rounded-md overflow-hidden">
                <img className="w-full h-64 object-cover" src={post.image} alt={post.title} />
                <div className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-bgcustom-green text-white rounded-full px-3 py-1">
                      {post.date}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold my-2">{post.title}</h2>
                  <p className="text-gray-600">{post.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-3 text-sm text-gray-500">
                      {post.categories.map((category, idx) => (
                        <span key={idx}>{category}</span>
                      ))}
                    </div>
                    <div 
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleLike(index)}
                    >
                      <AiOutlineLike className="text-gray-600" size={24} />
                      <span>{post.likes} Likes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar section */}
          <div className="md:w-1/3 md:pl-6">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search Keyword"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none"
              />
              <button onClick={handleSearch} className="mt-2 bg-bgcustom-green text-white w-full py-2 rounded">SEARCH</button>
            </div>

            {/* Category Section */}
            <div className="bg-white shadow-md p-4 rounded mb-6">
              <h3 className="text-lg font-semibold mb-4">Category</h3>
              <ul className="text-gray-600">
                {categories.map((category, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{category.name}</span>
                    <span>{category.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="bg-white shadow-md p-4 rounded">
              <h3 className="text-lg font-semibold mb-4">Recent Post</h3>
              <ul className="text-gray-600">
                {recentPosts.map((post, idx) => (
                  <li key={idx} className="mb-4">
                    <h4 className="text-sm font-semibold">{post.title}</h4>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour créer un nouveau blog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create a New Blog Post</h2>
              <AiOutlineClose
                className="cursor-pointer"
                size={24}
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <div className="space-y-4">
              {/* Champ pour le titre */}
              <div className="flex items-center space-x-2 border-b border-gray-300 pb-2">
                <MdTitle size={24} className="text-gray-500" />
                <input
                  type="text"
                  name="title"
                  placeholder="Blog Title"
                  value={newBlog.title}
                  onChange={handleInputChange}
                  className="w-full outline-none"
                />
              </div>

              {/* Champ pour la description */}
              <div className="flex items-center space-x-2 border-b border-gray-300 pb-2">
                <FiFileText size={24} className="text-gray-500" />
                <textarea
                  name="description"
                  placeholder="Blog Description"
                  value={newBlog.description}
                  onChange={handleInputChange}
                  className="w-full outline-none h-20"
                />
              </div>

              {/* Champ pour l'image */}
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <AiOutlineFileImage size={24} className="text-gray-600 mr-2" />
                <label className="text-gray-500 cursor-pointer">
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full outline-none hidden"
                  />
                  <span>Upload Image</span>
                </label>
              </div>

              {/* Aperçu de l'image sélectionnée */}
              {newBlog.image && (
                <img src={newBlog.image} alt="Preview" className="mt-4 w-full h-32 object-cover" />
              )}

              {/* Bouton pour soumettre */}
              <button
                className="bg-bgcustom-green text-white px-4 py-2 rounded-md w-full hover:bg-black"
                onClick={() => {
                  // Logique d'ajout du blog ici (e.g., appel API)
                  console.log('New Blog:', newBlog);
                  setIsModalOpen(false); // Fermer le modal après soumission
                }}
              >
                Submit Blog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
