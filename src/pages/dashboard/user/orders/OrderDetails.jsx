import { useParams } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import TimeLineStep from '../../../../components/TimeLineStep';
import { useGetOrderByIdQuery } from '../../../../redux/features/orders/orderApi';


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





const OrderDetails = () => {
    const {orderId} = useParams();
    const {data , isLoading , error} = useGetOrderByIdQuery(orderId);
    if(isLoading) return <Loading/>
    if(error) return <div>Something went wrong! Failed to fetch your orders</div> 

    const order = data?.data || {};
console.log(data)


 
const isCompleted = (status) => {
  const statuses = ['pending_verification', 'cancelled', "processing" , "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(data.status)
  }
  const isCurrent = (status) => data.status === status


  return (
    <div className='section__container rounded p-6'>
    <h2 className='text-2xl font-semibold mb-4'>Payment <span className='font-bold'>{data?.status}</span></h2>
    <p className='mb-4'>Order Id: {data?._id}</p>
    <p className='mb-8'>Status: {data?.status}</p>

    <ol className='sm:flex items-center relative'>
      {
        steps.map((step, index) => (
          <TimeLineStep key={index} 
          step={step}
          order={data}
          isCompleted={isCompleted(step.status)}
          isCurrent={isCurrent(step.status)}
          isLastStep={index === steps.length - 1}
          icon={step.icon}
          description={step.description}
          />
        ))
      }
    </ol>

  </div>
  )
}

export default OrderDetails