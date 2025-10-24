import { useCreateOrderMutation } from '@/redux/features/orders/orderApi';
import { useUpdateStockMutation } from '@/redux/features/products/productsApi';
import { useState } from 'react';
import ReactPixel from "react-facebook-pixel";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Checkout = () => {
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [bkashNumberLastDigit, setBkashNumberLastDigit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState('');

  const myBkashNumber = '01705776033'; // Your bKash Number

  const location = useLocation();
  const { cartProduct } = location.state || {}; 
  const user = useSelector((state) => state.auth.user);

  const products = cartProduct.slice(0, -1);
  const { grandTotal } = cartProduct[cartProduct.length - 1] || {};

  const groupedProducts = products.reduce((acc, product) => {
    const existingProduct = acc.find((p) => p._id === product._id);

    if (existingProduct) {
        existingProduct.sizes.push({
            size: product.selectedSize,
            quantity: product.quantity,
        });
    } else {
        acc.push({
            ...product,
            sizes: [{ size: product.selectedSize, quantity: product.quantity }],
        });
    }
    return acc;
}, []);

  console.log(groupedProducts)


  const navigate = useNavigate();

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setErrorMessage('');
    setBkashNumberLastDigit('');
    setDeliveryCharge(0);
    setDeliveryOption('');
  };

  const handleDeliveryChange = (option, charge) => {
    setDeliveryOption(option);
    setDeliveryCharge(charge);
  };


  const [createOrder, { isLoading, error }] = useCreateOrderMutation();


  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const [updateStock] = useUpdateStockMutation();




  const handleUpdateStock =  async () => {


    groupedProducts.map(async (product) => {  

      try {
        const response =  await updateStock({id: product?._id, sizes:product.sizes }).unwrap();
        console.log(response)
        alert("Updated order status");
       
    } catch (error) {
        console.error("Failed to update order status:", error);
    }


    })

   
}
 


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || !address || !postalCode || !phone) {
      setErrorMessage('Please enter your city, full address, postal code , phone number.');
      return;
    }
    if (paymentMethod === 'bkash' && bkashNumberLastDigit.length !== 11) {
      setErrorMessage('অনুগ্রহ করে আপনার ১১-সংখ্যার বিকাশ মোবাইল নম্বর প্রবেশ করুন।');
      return;
    }
    if (paymentMethod === 'cash' && deliveryOption ==='') {
     setErrorMessage('Please choose a delivery option');
      return;
    }
    
    ReactPixel.track("Purchase", {
     
      buyer: user.username, 
      products, 
      amount: calculateTotalPrice(),
      city:city,
      address:address,
      phone:phone,
      postalCode:postalCode,
      discountAmount: grandTotal,
      paymentMethod,
    
      deliveryCharge,
    });

    const newOrder = {
      userId: user._id, // Replace with the actual user ID
      buyer: buyerName, // Replace with the actual user ID
      products: groupedProducts,
      email: user.email, // Replace with user's email
      amount: calculateTotalPrice(),
      city:city,
      address:address,
      phone:phone,
      postalCode:postalCode,
      discountAmount: grandTotal,
      paymentMethod,
      bkashNumberLastDigit: paymentMethod === "bkash" ? bkashNumberLastDigit : null,
      deliveryCharge,
    };

    try {
      for (const product of groupedProducts) {
        await updateStock({ id: product?._id, sizes: product.sizes }).unwrap();
    }
      const response = await createOrder(newOrder).unwrap();
      alert(`Order confirmed! Order ID: ${response.order._id}`);
      navigate("/dashboard/track-order");
    } catch (err) {
      console.error("Order creation failed", err);
      alert("Failed to place order. Please try again.");
    }


    alert(`Order confirmed! Total: ${grandTotal + deliveryCharge} BDT`);
    navigate('/dashboard/track-order'); 
  };




  return (
    <div className="checkout-container bg-gray-100 min-h-screen py-10 px-5 sm:px-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Checkout</h2>

        {/* City and Address Inputs */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Details</h3>
          <div className="space-y-4">
            <Input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              placeholder="আপনার নাম *"
              required
            />
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="জেলা সিলেক্ট করুন *"
              required
            />
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="সম্পূর্ণ ঠিকানা - বাসা , এলাকার নাম , থানা , জেলা "
              required
            />
            <Input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="ডাক কোড"
              required
            />
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="ফোন নাম্বার *"
              required
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Order</h3>
          <div className="space-y-6">
            {products.map((product) => (
              <div key={product._id} className="flex border-b pb-4">
                <div className="w-1/4">
                  <img src={product.images[0]} alt={product.name} className="w-full rounded-lg" />
                </div>
                <div className="w-3/4 pl-4">
                  <h4 className="text-xl font-bold text-gray-800">{product.name}</h4>
            
                  <p className="text-sm text-gray-600">Size: {product.selectedSize}</p>
              
                  <div className="mt-2">
                    <span className="text-lg font-medium text-gray-800">{product.price} BDT</span>
                    <span className="text-sm text-gray-500 ml-2 line-through">{product.oldPrice} BDT</span>
                    <p className="text-sm text-gray-600 mt-1">Quantity: {product.quantity}</p>
                  </div>
                  <div className="mt-2 text-lg font-semibold text-gray-800">
                    Total: {product.price * product.quantity} BDT
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right flex flex-col">
          {
            grandTotal == calculateTotalPrice() ? 
           <>
           <span className="text-xl font-semibold text-gray-800">Grand Total: {calculateTotalPrice()} BDT</span>
      
            <span className="text-xl font-semibold text-gray-800">
              Total with Delivery: {grandTotal + deliveryCharge} BDT
            </span>
           </> : 
           <>
           <span className="text-xl font-semibold text-gray-800">Grand Total: {calculateTotalPrice()} BDT</span>
            <span className="text-xl font-semibold text-gray-800">Discounted Total: {grandTotal} BDT</span>
            <span className="text-xl font-semibold text-gray-800">
              Total with Delivery: {grandTotal + deliveryCharge} BDT
            </span>
           </> 
          }
          </div>
        </div>

        {/* Payment Method Selection */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Select Payment Method</h3>
          <div className="flex justify-center space-x-6 mb-8">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => handlePaymentMethodChange('cash')}
              />
              <span className="text-lg font-medium text-gray-700">Cash on Delivery</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="bkash"
                checked={paymentMethod === 'bkash'}
                onChange={() => handlePaymentMethodChange('bkash')}
              />
              <span className="text-lg font-medium text-gray-700">bKash</span>
            </label>
          </div>

          {/* Delivery Charge Options for COD */}
          {paymentMethod === 'cash' && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Choose Delivery Location:</h3>
              <label className="flex items-center space-x-3 mb-3">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="insideDhaka"
                  checked={deliveryOption === 'insideDhaka'}
                  onChange={() => handleDeliveryChange('insideDhaka', 60)}
                />
                <span className="text-lg font-medium text-gray-700">Inside Dhaka - 60 BDT</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="outsideDhaka"
                  checked={deliveryOption === 'outsideDhaka'}
                  onChange={() => handleDeliveryChange('outsideDhaka', 120)}
                />
                <span className="text-lg font-medium text-gray-700">Outside Dhaka - 120 BDT</span>
              </label>
            </div>
          )}

          {/* bKash Payment Details */}
          {paymentMethod === 'bkash' && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                <div className="bg-gray-50 p-6 rounded-lg mb-4 shadow-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Choose Delivery Location:</h3>
              <label className="flex items-center space-x-3 mb-3">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="insideDhaka"
                  checked={deliveryOption === 'insideDhaka'}
                  onChange={() => handleDeliveryChange('insideDhaka', 60)}
                />
                <span className="text-lg font-medium text-gray-700">Inside Dhaka - 60 BDT</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="outsideDhaka"
                  checked={deliveryOption === 'outsideDhaka'}
                  onChange={() => handleDeliveryChange('outsideDhaka', 120)}
                />
                <span className="text-lg font-medium text-gray-700">Outside Dhaka - 120 BDT</span>
              </label>
            </div>

              <p className="text-lg font-medium text-gray-700 mb-3">এই নাম্বারে টাকা পাঠান - <strong>{myBkashNumber}</strong>, তারপর যে নাম্বারটি ব্যবহার করে পেমেন্ট করেছেন তা আমাদের দিন এবং অর্ডার নিশ্চিত করুন।</p>
              <Input
                type="text"
                value={bkashNumberLastDigit}
                onChange={(e) => setBkashNumberLastDigit(e.target.value)}
                placeholder="আপনার বিকাশ ফোন নম্বরটি লিখুন।"
                required
              />
               
            </div>
          )}

          {/* Submit Button */}
          <p className="text-lg font-medium text-red-500 mb-3">{errorMessage}</p>
          <div className="flex justify-center">
            <Button type="submit" className="w-full py-3 bg-primary text-white rounded-md text-lg font-semibold">
              Confirm Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
