import { useState } from 'react';

import Loading from '../../components/Loading';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';


    const filters = {
       categories : ['all', 'tshirts', 'panjabi', 'jewellery' , 'cosmetics'],
    //   colors : ['all', 'black' ,'red','gold' , 'blue' ,'silver' , 'biege' , 'green'],
       priceRanges: [
        {label: 'under 50', min:100, max:400},
        {label: '50 - 100', min:400, max:800},
        {label: '100 - 200', min:800, max:1200},
        {label: '200 and above', min:1200, max: Infinity},
       ]
    };


const ShopPage = () => {
    //const [products ,setProducts] = useState(productsData);

    const[filtersState , setFiltersState] = useState({
        category : 'all',
        //color : 'all',
        priceRange : ''
    });

    const [currentPage , setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(8);

    //const { category , color , priceRange} = filtersState;
    const { category , priceRange} = filtersState;

     let minPrice = 0;
    let maxPrice = Infinity;

     [minPrice , maxPrice] = priceRange.split('-').map(Number);
   {/*
   
    
    if (priceRange) {
        if (priceRange === '0 - $50') {
            minPrice = 0;
            maxPrice = 50; // For 'under $50'
        } else {
            [minPrice, maxPrice] = priceRange.split('-').map(Number);
        }
    }
    
    */} 


    const {data: {products = [], totalPages , totalProducts}= {},error , isLoading} = useFetchAllProductsQuery({
        category: category!== 'all' ? category: '',
        //color: color!== 'all'? color:'',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage ,

    })
    console.log(products)

  {/*  const applyFilters = () =>{

        let filteredProducts = productsData;


        // FILTER BY CATEGORY

        if( filtersState.category && filtersState.category!== 'all'){

            filteredProducts = filteredProducts.filter(product =>product.category === filtersState.category)

        }

        // FILTER BY COLOR

        if( filtersState.color && filtersState.color!== 'all'){

            filteredProducts = filteredProducts.filter(product => product.color === filtersState.color)

        }

        // FILTER BY PRICE


        if(filtersState.priceRange){

            const[minPrice , maxPrice]= filtersState.priceRange.split('-').map(Number);
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice)

        }

        setProducts(filteredProducts)
   }

   useEffect(()=>{
        applyFilters();


   },[filtersState]); */}
 
   // CLEAR FILTERS

   const clearFilters = () => {
    setFiltersState({
        category : 'all',
        color : 'all',
        priceRange : ''
    })

   }

 //// HANDLE PAGE CHANGE

 const handlePageChange= (pageNumber) => {
    if(pageNumber > 0 && pageNumber <= totalPages){
        setCurrentPage(pageNumber)
    }
 }



   if(isLoading) return <Loading/>
   if(error) return <div>Error loading Products</div>


 const startProduct = (currentPage - 1) * ProductsPerPage + 1 ;
 const endProduct = startProduct + products.length - 1;
    
  return (
   <>
    <section className=" w-44 ">

            <nav className="text-gray-600 text-sm">
                <span className="text-blue-500 hover:underline cursor-pointer">Home</span>
                <span className=""> / </span>
                <span className="font-medium text-gray-800">Shop</span>
            </nav>
    
    </section>
    
            <h3 className='text-xl font-medium mb-4 ml-3'> Showing {startProduct} - {endProduct} of {totalProducts} results.</h3>


        <section  >
            <div className='flex flex-col md:flex-row md:gap-12 gap-8 ml-3'>
                {/* LEFT SIDE */}
                <ShopFiltering 
                    filters={filters}
                    filtersState={filtersState}
                    setFiltersState={setFiltersState}
                    clearFilters={clearFilters}
                
                
                />


                {/* RIGHT SIDE */}
                <div>   
                   
                    <ProductCards products={products}/>


                    {/* PAGINATION */}
                            {

                                products.length > 0 &&  <div className='mt-6 flex justify-center'>
                        <button disabled={currentPage == 1} onClick={()=>handlePageChange(currentPage-1)} className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2'>Previous</button>

                            {
                               
                                     [...Array(totalPages)].map((_, index) => (
                                        <button onClick={()=> handlePageChange(index+1)} key={index} className={`px-4 py-2 ${currentPage === index+1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}>
                                            {index+1}

                                        </button>
                                     ))
                                
                            }


                        <button disabled={currentPage==totalPages} onClick={()=> handlePageChange(currentPage+1)} className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2'>Next</button>
                    </div>
                            }
                     
                   
                </div>
            </div>
        </section>
   </>
  )
}

export default ShopPage
