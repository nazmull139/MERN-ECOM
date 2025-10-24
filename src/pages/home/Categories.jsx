import { Link } from "react-router-dom";
import category4 from "../../assets/cosmetics-1.jpg";
import category3 from "../../assets/jewewllary-1.jpg";
import category1 from "../../assets/panjabi-1.png";
import category2 from "../../assets/tshirt-1.jpg";

const Categories = () => {
  const categories = [
    { name: "Panjabi", path: "panjabi", image: category1 },
    { name: "T-Shirts", path: "tshirts", image: category2 },
    { name: "Jewellery", path: "jewellery", image: category3 },
    { name: "Cosmetics", path: "cosmetics", image: category4 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/categories/${category.path}`}
            className="group flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Image Container */}
            <div className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 overflow-hidden rounded-full border border-gray-300 dark:border-gray-600">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Category Name */}
            <h4 className="mt-3 text-lg font-semibold text-gray-800 dark:text-white group-hover:text-primary transition-colors duration-300">
              {category.name}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
