import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetReviewsByProductIdQuery } from '@/redux/features/reviews/reviewsApi';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import ReactPixel from "react-facebook-pixel";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import RatingStars from '../../../components/RatingStars';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import ReviewsCard from '../reviews/ReviewsCard';

const SingleProduct = () => {
    const {id} = useParams();
    const dispatch = useDispatch();


    //const {productName} = useParams()
    
    const [productQuantity , setProductQuantity] = useState(1)

    const [availabilityMessage , setAvailabilityMessage ] = useState("");
    const [purchaseProduct , setPurchaseProduct] = useState(false);
    const [selectedImage , setSelectedImage] = useState(0);
    const [address , setAddress] = useState("");
    const [product , setProduct] = useState({});
    //const [productColor , setProductColor] = useState("")
    const [productSize , setProductSize] = useState("")


    const navigate = useNavigate()



    const {data , isLoading , error} = useFetchProductByIdQuery(id);
    const {data: reviewsData} = useGetReviewsByProductIdQuery(id);



    const singleProduct = data?.product || {};
    const productReviews = data?.reviews || [];

    const disabledSizes = singleProduct.disabledSizes || [];
  
    console.log(singleProduct)
    

    const handleAddToCart = (singleProduct) => {
         
       if ( singleProduct.size.length > 0 && productSize === "") {
        alert("Please select a size before adding to cart!");
           ReactPixel.track("AddToCart", {
              content_name: singleProduct.name,
              content_ids: singleProduct._id,
              content_type: "product",
              value: singleProduct.price,
              currency: "BDT"
            });
            
        
        return;
    }
   

    if (productQuantity <= 0) {
        alert("Please increase the quantity before adding to cart!");
        return;
    }
    
        const cartProduct = {
            ...singleProduct, // Keep all existing product details
           // selectedColor: productColor, // Add selected color
            selectedSize: productSize, // Add selected size
            quantity: productQuantity > 0 ? productQuantity : 1, // Ensure at least 1 is added
        };
    
        dispatch(addToCart(cartProduct));
    };
  // const calculateEmi = (price) => Math.round(price / 6)


   const checkAvailibility = async () => {


    {/*if(pinCode.trim() === "" ){
        setAvailabilityMessage("Please Enter a Valid Pincode")
        return
    }
    const res = await axios.get(import.meta.env.VITE_API_URL + `/get-pincode/${pinCode}`)

    const data = await res.data 
    setAvailabilityMessage(data.message)*/}
    
 }





if (isLoading) return <Loading/>

if (error) return <p>Error loading product details</p>




{/*
  return (
   <>
   
   <section className="section__container bg-primary-light">
            <h2 className="section__header capitalize">Single PRoduct</h2>

            <div className='section__subheader space-x-2'>
                
               <span className='hover:text-primary'> <Link to="/">home</Link></span>
               <i className="ri-arrow-right-s-line"></i>
               <span className='hover:text-primary'> <Link to="/shop">shop</Link></span>
               <i className="ri-arrow-right-s-line"></i>
               <span className='hover:text-primary'>{singleProduct.name}</span>


        </div>
        </section>

        <section className='section__container mt-8'> 
            <div className='flex flex-col items-center md:flex-row gap-8 '>
                {/*PRODUCT IMAGE */}
          {/* //////    <div className='md:w-1/2 w-full'>
                <img className='rounded-md w-full h-auto' src={singleProduct.image}></img>
              </div>

              <div className='md:w-1/2 w-full'>
              
                <h3 className='font-semibold text-2xl mb-4'>{singleProduct?.name}</h3>
                <p className='text-xl text-primary mb-4'>${singleProduct.price } {singleProduct?.oldPrice ? <s>${singleProduct?.oldPrice}</s> : null}</p>
                <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>

                {/* ADDITIONAL PRODUCT INFO */}

         {/* //////         <div className='flex flex-col space-y-2'>
                  <p><strong>Category:</strong> {singleProduct.category}</p>
                  <p><strong>Color:</strong> {singleProduct.color}</p>

                  <div className='flex gap-1 items-center'>
                    <strong>Rating:</strong>
                    <RatingStars rating={singleProduct.rating}/>
                  </div>
                </div>

                  <button onClick={(e)=>{
                    e.stopPropagation();
                    handleAddToCart(singleProduct)
                  }} 

                  className='mt-6 px-6 py-3 bg-primary text-white rounded-md'>Add To Cart</button>
              </div>
            </div>
            



        </section>
   

   {/* DISPLAY REVIEWS */}

  {/* //////   <section className='section__container mt-8'>
    <ReviewsCard productReviews ={productReviews}/>
   </section>
   
   </>
  )*/}



  return(
     <>
        <div>
            <main className="w-[93vw] lg:w-[70vw] flex flex-col sm:flex-row justify-start items-start mx-auto  gap-10 my-10 ">
                {/*Left Side */}
                <div className="grid sm:w-[50%] gap-3">
    {/* Main Image */}
    <div className="relative">
        <img 
            src={singleProduct?.images[selectedImage]}
            className="w-full lg:h-[30rem] rounded-xl object-center object-cover border dark:border-none"
        />
        {/* Sale Badge for Main Image */}
        {singleProduct?.oldPrice && (
            <div className="absolute top-3 left-3 bg-slate-300 p-1.5 text-black rounded-md shadow-md">
                Sale !
            </div>
        )}
    </div>

    {/* Thumbnail Images */}
    <div className="grid grid-cols-4 gap-3">
        {singleProduct?.images?.map((url, index) => (
            <div key={index} className="relative">
                <img  
                    src={url} 
                    onClick={() => setSelectedImage(index)}
                    className="rounded-xl filter hover:brightness-50 cursor-pointer transition-all ease-in-out duration-300 border dark:border-none"
                />
                {/* Sale Badge for Thumbnails */}
                {singleProduct?.oldPrice && (
                    <div className="absolute top-2 left-2 bg-slate-300 p-1 text-black rounded-md shadow-md">
                        Sale !
                    </div>
                )}
            </div>
        ))}
    </div>
</div>

                {/*Right Side */}
                <div className="sm:w-[50%] lg:w-[30%]">

                    <div className="pb-5">
                        <h2 className="font-extrabold text-2xl">{singleProduct?.name}</h2>

                        <p className="text-sm my-2">{singleProduct?.description}</p>                     
                        <p  className='font-bold'> {singleProduct.price } BDT {singleProduct?.oldPrice ? <s className='font-mono'>{singleProduct?.oldPrice} BDT</s> : null}</p>
                        
                        <div className="flex items-center">
                        <RatingStars rating={singleProduct?.rating}/>

                            <span className="text-md ml-1">
                                ({reviewsData?.data?.length ? reviewsData?.data?.length :0})
                            </span>
                        </div>
                    </div>
                        
                  { /* <div className="py-5 border-t border-b">
                        <h3 className="font-bold text-xl">Rs.{singleProduct?.price} or Rs.{calculateEmi(singleProduct?.price)}/months</h3>
                        <p className="text-sm">
                            Sugggested payments within 6 months special financing
                        </p>

                    </div> 

                    <div className="py-5 border-b">
                        <h3 className="font-bold text-lg">Choose color</h3>
                        <div className="flex items-center my-2">

                            {
                                singleProduct?.colors?.map((color , index) => (
                                    <Circle
                                    key={index}
                                    fill={color}
                                    strokeOpacity={0.2}
                                    strokeWidth={0.2}
                                    size={40}
                                    onClick={() => setProductColor(color)}
                                    className="cursor-pointer filter hover:brightness-50 " 
                                    />
                                ))
                            }
        
           
                        </div>


                    </div>*/}


<div className="py-5 border-b">
    <h3 className="font-bold text-lg">Choose Size</h3>
    <div className="flex items-center my-2 gap-2">
        {singleProduct?.size?.map((size, index) => {
            const isDisabled = disabledSizes.includes(size);

            return (
                <div
                    key={index}
                    onClick={() => {
                        if (!isDisabled) {
                            setProductSize(size);
                        }
                    }}
                    className={`cursor-pointer border rounded-md px-3 py-2 transition-all ${
                        isDisabled
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed relative"
                            : "hover:bg-gray-200 text-black"
                    }`}
                >
                    {size}
                    {isDisabled && (
                        <span className="absolute top-5 right-0 text-red-600 text-lg font-bold">✖</span>
                    )}
                </div>
            );
        })}
    </div>
</div>


                    <div className="py-5">
                        <div className="flex gap-3 items-center">
                            <div className="flex items-center gap-5 bg-gray-100 rounded-full px-3 py-2 w-fit ">
                            <Minus
                                cursor={"pointer"}
                                onClick={()=> setProductQuantity((qty) =>(qty > 0 ? qty - 1 : 0))}
                            />
                                <span className="text-slate-950">{productQuantity}</span>
                            <Plus 
                                cursor={"pointer"}
                                onClick={()=> setProductQuantity((qty)=> (qty < singleProduct?.stock ? qty + 1 : qty))}
                            />
                            </div>
                            { singleProduct?.stock === 0 && (
                                <div className="grid text-sm font-semibold text-gray-600">
                                    <span>
                                    দুঃখিত, এই পণ্যটি বর্তমানে স্টকে নেই। নতুন স্টক আসার সাথে সাথে আমরা আপডেট করবো। অনুগ্রহ করে পরে আবার চেক করুন অথবা আমাদের সাথে যোগাযোগ করুন।
                                    </span>
                                    
                                </div>
                            )

                            }

                        
                            { singleProduct?.stock - productQuantity > 0 && (
                                <div className="grid text-sm font-semibold text-gray-600">
                                    <span>
                                        Only
                                        <span className="text-yellow-400">{singleProduct?.stock - productQuantity} </span>
                                        left!
                                    </span>
                                    <span>Don't miss it</span>
                                </div>
                            )

                            }
                        </div>

                        <div className="grid gap-3 my-5">
                            <div className="flex gap-3">
                                <Input
                                 placeholder="Enter Your Pincode Here"
                                 onChange={(e)=> setPinCode(e.target.value)}
                                 />
                                <Button onClick={checkAvailibility}>Check Availability</Button>
                            </div>
                            <p className="text-sm px-2">{availabilityMessage}</p>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={() => setPurchaseProduct(!purchaseProduct)}
                            >
                                Buy Now
                            </Button>

                            <Button variant="outline"  onClick={(e)=>{
                                    e.stopPropagation();
                                    handleAddToCart(singleProduct)
                                    
                                }} 
                   disabled={singleProduct?.stock === 0} >Add To Cart</Button>
                        </div>



                        {
                            purchaseProduct && (
                                <div className="my-2 space-y-2">
                                    <Input 
                                        placeholder="Enter Your Address Here..."
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    <Button>Confirm Order</Button>

                                </div>
                            )
                        }
                    </div>

                </div>
            </main>


            {/* Review Section  */}

            <ReviewsCard productReviews ={productReviews}/>
        </div>

    
    </>
  )
 








}

export default SingleProduct