import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import ProductCards from "../shop/ProductCards";
import ShopFiltering from "../shop/ShopFiltering";


const filters = {
  categories : ['all', 'tshirts', 'panjabi', 'jewellery' , 'cosmetics'],
  priceRanges: [
    
   {label: 'under 50', min:100, max:400},
   {label: '50 - 100', min:400, max:800},
   {label: '100 - 200', min:800, max:1200},
   {label: '200 and above', min:1200, max: Infinity},
  ]
};

const CategoryPage = () => {

  const { categoryName } = useParams();


   const[filtersState , setFiltersState] = useState({
          category : categoryName,
          priceRange : ''
      });

  
      const [currentPage , setCurrentPage] = useState(1);
      const [ProductsPerPage] = useState(8);
  
    
      const { category , priceRange} = filtersState;
      let minPrice = 0;
      let maxPrice = Infinity;

  
       [minPrice , maxPrice] = priceRange.split('-').map(Number);


       const clearFilters = () => {
        setFiltersState({
          category : categoryName,
            priceRange : ''
        })}
        

  // Fetch products based on category
  const {
    data: { products = [], totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    
        category: categoryName,
 
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage ,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const startProduct = (currentPage - 1) * ProductsPerPage + 1 ;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      {/* Category Header */}

      <section className=" w-44 ">

            <nav className="text-gray-600 text-sm">
                <span className="text-blue-500 hover:underline cursor-pointer">Home</span>
                <span className=""> / </span>
                <span className="font-medium text-gray-800">{categoryName}</span>
            </nav>
    
      </section>

            <h3 className='text-xl font-medium mb-4 ml-3'> Showing {startProduct} - {endProduct} of {totalProducts} results.</h3>

      <section>

            <div className='flex flex-col md:flex-row md:gap-12 gap-8 ml-3'>
                    {/* LEFT SIDE */}
                    <ShopFiltering
                        filters={filters}
                        filtersState={filtersState}
                        setFiltersState={setFiltersState}
                        clearFilters={clearFilters}
                    
                    />

              {/* Handling Loading & Error States */}
                <div className="">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <p className="text-gray-500 text-lg">Loading products...</p>
                    </div>
                  ) : error ? (
                    <div className="flex justify-center items-center h-40">
                      <p className="text-red-500 text-lg">Failed to load products. Please try again.</p>
                    </div>
                  ) : products.length === 0 ? (
                    <div className="flex justify-center items-center h-40">
                      <p className="text-gray-500 text-lg">No products found in this category.</p>
                    </div>
                  ) : (
                    <ProductCards products={products} />
                  )}
                </div>


            </div>




  
      </section>
    </>
  );
};

export default CategoryPage;
