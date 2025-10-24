
import { useFetchAllProductsQuery } from '@/redux/features/products/productsApi';
import { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import ProductCards from '../shop/ProductCards';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const ProductsPerPage = 10; // Increase for more products per page

    // Fetch products with a limit
    const { data: { products = [], totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({ limit: ProductsPerPage });

    // Run search when the button is clicked
    const handleSearch = () => {
        if (!products || products.length === 0) return; // Ensure products are available before searching
    
        setIsSearching(true);
        const query = searchQuery.toLowerCase();
        
        const filtered = products.filter(
            (product) =>
                (product.name?.toLowerCase() || '').includes(query) || 
                (product.description?.toLowerCase() || '').includes(query)
        );
        
        setFilteredProducts(filtered);
        setIsSearching(false);
    };

    // Reset search results when the query is empty
    useEffect(() => {
        if (searchQuery === '') {
            setFilteredProducts(products);
        }
    }, [searchQuery, products]);

    const handleClearSearch = () => {
        setSearchQuery('');
        setFilteredProducts(products);
    };

    return (
        <>
            {/* Header Section */}
            <section className="section__container bg-gradient-to-r from-blue-500 to-teal-500 py-20 text-white text-center">
                <h2 className="text-4xl font-bold mb-4">Search Products</h2>
                <p className="text-lg max-w-2xl mx-auto">
                    Find the perfect product by searching with keywords in the name or description.
                </p>
            </section>

            {/* Search Section */}
            <section className="section__container py-16">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for products..."
                            className="w-full p-4 pl-12 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                        <FiSearch className="absolute left-4 top-5 text-gray-400" size={20} />
                        {searchQuery && (
                            <button onClick={handleClearSearch} className="absolute right-4 top-3 text-gray-400">
                                <FiX size={20} />
                            </button>
                        )}
                    </div>

                    <button
                        onClick={handleSearch}
                        className="w-full md:w-auto py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    >
                        Search
                    </button>
                </div>

                {/* Loading & Error Handling */}
                {isLoading && <p className="text-center mt-8 text-lg">Loading products...</p>}
                {error && <p className="text-center mt-8 text-red-500">Failed to load products.</p>}

                {/* Search Results */}
                {!isLoading && (
                    <div className="mt-10">
                        {filteredProducts.length > 0 ? (
                            <>
                                <p className="text-gray-600 text-center mb-4">
                                    Showing {filteredProducts.length} of {totalProducts} products
                                </p>
                                <ProductCards products={filteredProducts} />
                            </>
                        ) : (
                            <p className="text-center text-lg text-gray-500">
                                No products found for "{searchQuery}"
                            </p>
                        )}
                    </div>
                )}
            </section>
        </>
    );
};

export default Search;
