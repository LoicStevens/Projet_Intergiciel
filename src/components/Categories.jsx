

const categories = [
  { name: 'Design & Creative', positions: 50 },
  { name: 'Marketing', positions: 50 },
  { name: 'Telemarketing', positions: 50 },
  { name: 'Software & Web', positions: 50 },
  { name: 'Administration', positions: 50 },
  { name: 'Teaching & Education', positions: 50 },
  { name: 'Engineering', positions: 50 },
  { name: 'Garments / Textile', positions: 50 },
];

const Categories = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 hhover:border- lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center border hover:border-bgcustom-green">
              <span className="bg-green-100 text-gray-500 px-4 py-1 rounded-full font-semibold text-sm inline-block mb-4">
                {category.positions} Available position
              </span>
              <h3 className="text-lg hover:text-bgcustom-green hover:underline hover:cursor-pointer font-semibold text-gray-800">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
