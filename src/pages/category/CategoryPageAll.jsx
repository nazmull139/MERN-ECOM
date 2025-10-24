import { Link } from 'react-router-dom';
import Cosmetic from './categoryWise/Cosmetic';
import Accessory from './categoryWise/accessories';
import Dress from './categoryWise/dress';
import Jewellary from './categoryWise/jewellary';



const CategoryPageAll = () => {

    

  return (
    <div>
    
    
        <div className=' w-[70vw] m-auto'>
            <div className='flex flex-row   border-b-2 border-black/10 border-w mb-5'>
                  <span className=' p-3 font-semibold w-[50%] text-2xl'>Cosmetics</span>
                  <Link 
            to={`/categories/cosmetics`} 
            className="w-[50%] text-end p-3 font-semibold"
        >
            <span className="bg-slate-500 text-white px-3 py-1 rounded-md">
                View All
            </span>
        </Link>
            </div>
           
          
            <Cosmetic />
        </div>

        <div className=' w-[70vw] m-auto'>
            <div className='flex flex-row   border-b-2 border-black/10 border-w mb-5'>
                  <span className=' p-3 font-semibold w-[50%] text-2xl'>Panjabi</span>
                  <Link  to={`/categories/panjabi`} className=' w-[50%]  text-end p-3 font-semibold'> <span className="bg-slate-500 text-white px-3 py-1 rounded-md">
                View All
            </span></Link>
            </div>
            <Accessory/>
        </div>

        <div className=' w-[70vw] m-auto'>
            <div className='flex flex-row   border-b-2 border-black/10 border-w mb-5'>
                  <span className=' p-3 font-semibold w-[50%] text-2xl'>T-Shirts</span>
                  <Link  to={`/categories/tshirts`} className=' w-[50%] text-end p-3 font-semibold'> <span className="bg-slate-500 text-white px-3 py-1 rounded-md">
                View All
            </span></Link>
            </div>
            <Dress/>
        </div> 

        <div className=' w-[70vw] m-auto'>
            <div className='flex flex-row   border-b-2 border-black/10 border-w mb-5'>
                  <span className=' p-3 font-semibold w-[50%] text-2xl'>Jewellery</span>
                  <Link  to={`/categories/jewellery`} className=' w-[50%]  text-end p-3 font-semibold'> <span className="bg-slate-500 text-white px-3 py-1 rounded-md">
                View All
            </span></Link>
            </div>
            <Jewellary/>
        </div>
       
       
    </div>
  )
}

export default CategoryPageAll