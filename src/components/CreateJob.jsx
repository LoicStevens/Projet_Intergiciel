import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import { FaCloudUploadAlt } from "react-icons/fa";

const CreateJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    projectType: 'FULL_TIME',
    skills: '',
  });
  const [file, setFile] = useState(null); // State for the file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillsArray = formData.skills.split(',').map(skill => skill.trim());

    const dataToSend = new FormData();
    dataToSend.append('clientId', 1); // Replace with dynamic ID later
    dataToSend.append('title', formData.title);
    dataToSend.append('description', formData.description);
    dataToSend.append('price', parseFloat(formData.price));
    dataToSend.append('location', formData.location);
    dataToSend.append('projectType', formData.projectType);
    dataToSend.append('skills', JSON.stringify(skillsArray)); // Stringify skills array
    if (file) {
      dataToSend.append('file', file); // Append the file if it exists
    }

    try {
      const response = await fetch("http://localhost:9990/api/announcements", {
        method: "POST",
        body: dataToSend, // Send FormData (no need for Content-Type header; browser sets it automatically)
      });

      if (response.ok) {
        const result = await response.json();
        alert("Annonce créée avec succès !");
        navigate('/announcement');
      } else {
        const errorText = await response.text();
        alert("Erreur lors de la création : " + errorText);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur réseau : " + error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Job Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Machine Learning Specialist"
                className="border border-gray-300 p-2 rounded-lg w-full"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Description</label>
              <textarea
                name="description"
                rows="5"
                placeholder="Describe the job..."
                className="border border-gray-300 p-2 rounded-lg w-full"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 60"
                className="border border-gray-300 p-2 rounded-lg w-full"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Remote, New York, etc."
                className="border border-gray-300 p-2 rounded-lg w-full"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Project Type</label>
              <select
                name="projectType"
                className="border border-gray-300 p-2 rounded-lg w-full"
                value={formData.projectType}
                onChange={handleChange}
                required
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Skills</label>
              <input
                type="text"
                name="skills"
                placeholder="e.g. Java, React, Spring Boot"
                className="border border-gray-300 p-2 rounded-lg w-full"
                value={formData.skills}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="file-upload"
                className="border border-gray-300 p-2 rounded-lg w-full flex items-center justify-center cursor-pointer hover:bg-gray-100"
              >
                <FaCloudUploadAlt className="text-gray-400 mr-2" />
                <span className="text-gray-500">{file ? file.name : "Attach file (optional)"}</span>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*" // Restrict to images
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-bgcustom-green text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Publish Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;