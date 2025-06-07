import { useState } from 'react';

const FilterComponent = () => {
  // States for each filter
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [experience, setExperience] = useState('');
  const [jobType, setJobType] = useState('');
  const [qualification, setQualification] = useState('');
  const [gender, setGender] = useState('');
  const [priceRange, setPriceRange] = useState([750, 24600]);

  // Reset all filters
  const resetFilters = () => {
    setKeyword('');
    setLocation('');
    setCategory('');
    setExperience('');
    setJobType('');
    setQualification('');
    setGender('');
    setPriceRange([750, 24600]);
  };

  return (
    <>
      {/* FilterComponent for larger screens */}
      <div className="hidden lg:block bg-white p-4 shadow-lg rounded-lg w-64">
        <h2 className="text-lg font-semibold mb-4">Filter</h2>

        {/* Search keyword */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location dropdown */}
        <div className="mb-4">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Location</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        </div>

        {/* Category dropdown */}
        <div className="mb-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Category</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        {/* Experience dropdown */}
        <div className="mb-4">
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Experience</option>
            <option value="0-2">0-2 years</option>
            <option value="2-5">2-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        {/* Job type dropdown */}
        <div className="mb-4">
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>

        {/* Qualification dropdown */}
        <div className="mb-4">
          <select
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Qualification</option>
            <option value="Bachelor">Bachelor&apos;s</option>
            <option value="Master">Master&apos;s</option>
          </select>
        </div>

        {/* Gender dropdown */}
        <div className="mb-4">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Price range */}
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block">Price range:</label>
          <input
            type="range"
            min="750"
            max="24600"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]} / Year</span>
          </div>
        </div>

        {/* Reset button */}
        <div>
          <button
            onClick={resetFilters}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Search bar for mobile screens */}
      <div className="block lg:hidden">
        <input
          type="text"
          placeholder="Search keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </>
  );
};

export default FilterComponent;
