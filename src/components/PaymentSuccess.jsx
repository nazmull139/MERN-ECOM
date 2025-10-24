import axios from 'axios';
import { useState } from 'react';
import { getBaseUrl } from '../utils/baseURL';
import Loading from './Loading';
import TimeLineStep from './TimeLineStep';

const steps = [
  {
      status: 'pending_verification',
      label: 'pending_verification',
      description: 'Your order has been created and is awaiting processing.',
      icon: { iconName: 'edit-2-line', bgColor: 'red-500', textColor: 'gray-800' },
  },
  {
      status: 'cancelled',
      label: 'cancelled',
      description: 'Your order has been created and is awaiting processing.',
      icon: { iconName: 'edit-2-line', bgColor: 'red-500', textColor: 'gray-800' },
  },

  {
      status: 'processing',
      label: 'Processing',
      description: 'Your order is currently being processed.',
      icon: { iconName: 'loader-line', bgColor: 'yellow-500', textColor: 'yellow-800' },
  },
  {
      status: 'shipped',
      label: 'Shipped',
      description: 'Your order has been shipped.',
      icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-100' },
  },
  {
      status: 'completed',
      label: 'Completed',
      description: 'Your order has been successfully completed.',
      icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'white' },
  },
];


const PaymentSuccess = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);




  const fetchOrder = async () => {
    if (!orderId) {
      setError('Please enter a valid Order ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${getBaseUrl()}/api/orders/order/${orderId}`);
      console.log(response)
      if (response?.data) {
        setOrder(response.data);
      }
    } catch (err) {
      setError('Order not found. Please check your Order ID.');
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };
//console.log(order)

if(isLoading) return <Loading/>

  const isCompleted =(status) =>{

    const statuses = ['pending_verification', 'cancelled', "processing" , "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status)

  }
  const isCurrent = (status) => order.status === status 
  
  return (
    <div className='section__container rounded p-6'>


<div className='mb-4'>
        <input
          type='text'
          className='p-2 border rounded w-full'
          placeholder='Enter Order ID'
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={fetchOrder} className='mt-2 px-4 py-2 bg-blue-600 text-white rounded'>
          Track Order
        </button>
      </div>
      


{order && (

  <div>
    <h2 className='text-2xl font-semibold mb-4'>
        Payment {order?.status}
      </h2>
      <p className='mb-4'>Order Id : {order?._id}</p>
      <p className='mb-8 '>Status : <span className='font-bold text-4xl'>{order?.status}</span></p>

      <ol className='sm:flex items-center relative'>
        {
          steps.map((step,index)=>(
            <TimeLineStep key={index} step={step} order={order}
             isCompleted={isCompleted(step.status)} 
             isCurrent={isCurrent(step.status)} 
             isLastStep={index === steps.length - 1} icon={step.icon}
              description={step.description}  />

          ))
        }
      </ol>
  </div>


)}
      
    </div>
  )
}

export default PaymentSuccess

{/*
import { getBaseUrl } from '@/utils/baseURL';
import axios from 'axios';
import { useState } from 'react';
import Loading from './Loading';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    if (!orderId) {
      setError('Please enter a valid Order ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${getBaseUrl()}/api/orders/order/${orderId}`);
      console.log(response)
      if (response?.data) {
        setOrder(response.data);
      }
    } catch (err) {
      setError('Order not found. Please check your Order ID.');
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='section__container p-6 rounded'>
      <h2 className='text-2xl font-semibold mb-4'>Track Your Order</h2>
      <div className='mb-4'>
        <input
          type='text'
          className='p-2 border rounded w-full'
          placeholder='Enter Order ID'
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={fetchOrder} className='mt-2 px-4 py-2 bg-blue-600 text-white rounded'>
          Track Order
        </button>
      </div>
      
      {isLoading && <Loading />}
      {error && <p className='text-red-500'>{error}</p>}
      
      {order && (
        <div className='mt-6 p-4 border rounded'>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Total Amount:</strong> {order.amount} TK</p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
*/}