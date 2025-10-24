import { useEffect, useState } from "react";
import { FiAlignLeft } from "react-icons/fi";
const ShopFiltering = ({ filters, setFiltersState, filtersState, clearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="w-64 py-2  text-black font-semibold rounded-lg flex items-center  gap-2"
          >
           <FiAlignLeft size={20} /> Show Sidebar
          </button>

          {/* Sidebar for Mobile */}
          <div
            className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg p-6 space-y-6 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 text-xl"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold">Filters</h3>

            {/* Categories */}
            <FilterSection title="Categories">
              {filters.categories.map((category) => (
                <FilterRadio
                  key={category}
                  name="category"
                  id={category}
                  value={category}
                  checked={filtersState.category === category}
                  onChange={() => setFiltersState({ ...filtersState, category })}
                />
              ))}
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range">
              {filters.priceRanges.map((range) => (
                <FilterRadio
                  key={range.label}
                  name="priceRange"
                  id={range.label}
                  value={`${range.min}-${range.max}`}
                  checked={filtersState.priceRange === `${range.min}-${range.max}`}
                  onChange={() => setFiltersState({ ...filtersState, priceRange: `${range.min}-${range.max}` })}
                />
              ))}
            </FilterSection>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="w-full py-2 text-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
            >
              Clear All Filters
            </button>
          </div>

          {/* Overlay */}
          {isOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            ></div>
          )}
        </>
      ) : (
        <div className="w-64 p-4 bg-white shadow-lg rounded-xl space-y-6">
          <h3 className="text-xl font-semibold">Filters</h3>

          {/* Categories */}
          <FilterSection title="Categories">
            {filters.categories.map((category) => (
              <FilterRadio
                key={category}
                name="category"
                id={category}
                value={category}
                checked={filtersState.category === category}
                onChange={() => setFiltersState({ ...filtersState, category })}
              />
            ))}
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range">
            {filters.priceRanges.map((range) => (
              <FilterRadio
                key={range.label}
                name="priceRange"
                id={range.label}
                value={`${range.min}-${range.max}`}
                checked={filtersState.priceRange === `${range.min}-${range.max}`}
                onChange={() => setFiltersState({ ...filtersState, priceRange: `${range.min}-${range.max}` })}
              />
            ))}
          </FilterSection>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full py-2 text-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </>
  );
};

const FilterSection = ({ title, children }) => (
  <div className="space-y-2">
    <h4 className="font-medium text-lg">{title}</h4>
    <hr className="border-gray-300" />
    <div className="flex flex-col space-y-2">{children}</div>
  </div>
);

const FilterRadio = ({ name, id, value, checked, onChange }) => (
  <label className="flex items-center space-x-2 cursor-pointer capitalize">
    <input
      type="radio"
      name={name}
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className="accent-blue-500"
    />
    <span>{value}</span>
  </label>
);

export default ShopFiltering;