import ReactPixel from "react-facebook-pixel";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
const ProductCards = ({products}) => {
//console.log("cards",products)

    //console.log(products.id)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {

    ReactPixel.track("AddToCart", {
      content_name: product.name,
      content_ids: product._id,
      content_type: "product",
      value: product.price,
      currency: "BDT"
    });

    navigate(`/shop/${product._id}`);
console.log( product._id)
  }


  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {
          products.length > 0 ? (  products.map((product,index)=>(


                <div key={index} className="product__card">
                    <div className="relative">

                        <Link to={`/shop/${product._id}`}><img src={product.image ? product.image : product.images[0] } alt="" className=" max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300" ></img></Link>



                    <div className="hover:block absolute top-3 right-3">

                      <button
                      
                        onClick={(e)=> {
                        e.stopPropagation();
                        handleAddToCart(product);


                      }}>



                      <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i>
                      </button>


                    </div>


                    {/* /////////// Sale  /////////// */}

                    {
                      product?.oldPrice ?   <div className="hover:block absolute top-3 left-3">

                    
                      <p className=" bg-primary p-1.5 text-black hover:bg-primary-dark bg-slate-200 ">Sale !</p>
                  


                    </div>
                      
                      : null
                    }
                  
                      
                    </div>

                        <div className="product__card__content">
                            <h4>{product.name}</h4>
                            <p className='font-extrabold'>{product.price } BDT {product?.oldPrice ? <s>{product?.oldPrice} BDT</s> : null}</p>
                            
                            <RatingStars rating={product.rating}/>
                        </div>

                 
                    

               </div>



            ))) : <div> No products found </div>
        }


    </div>
  )
}

export default ProductCards