import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { useGetOrderByIdQuery } from '../../../../redux/features/orders/orderApi';

const ViewOrder = () => {
  const { orderId } = useParams();
  const { data, isLoading, error } = useGetOrderByIdQuery(orderId);
  console.log(data)
const printRef = useRef();


  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">Failed to fetch order.</div>;
  if (!data) return <div className="text-red-500">No order data found.</div>;

//console.log(data)
  


const handlePrint = () => {
  const printContent = printRef.current.innerHTML;
  const styles = document.head.innerHTML; // Capture existing styles

  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>Order Receipt</title>
        ${styles} <!-- Inject existing styles -->
      </head>
      <body class="bg-white p-8">
        <div class="max-w-4xl mx-auto shadow-lg rounded-lg border border-gray-200">
          ${printContent}
        </div>
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() { window.close(); };
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

  return (
    <div ref={printRef} className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Receipt</h1>
        <p className="text-sm text-gray-500">
          Order ID: <span className="font-mono text-gray-700">{data._id}</span>
        </p>
        <p className="text-sm text-gray-500">
          Placed on: {new Date(data.createdAt).toLocaleDateString()} at {new Date(data.createdAt).toLocaleTimeString()}
        </p>
      </div>

      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Personal Info */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Customer Details</h2>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Name:</span> {data.buyer}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Email:</span> {data.email}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Phone:</span> 0{data.phone}
          </p>
        </div>

        {/* Address Info */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Shipping Address</h2>
        
          <p className="text-gray-700">
            {data.city},<br />
            {data.address} - {data.postalCode}
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Order Summary</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Status:</span> {data.status ? capitalize(data.status) : "N/A"}
        </p>
        <p className="text-gray-700">
        {
          data?.discountAmount === " "  ?
           <div>
                <span className="font-semibold">Total Amount:</span> {data.amount.toFixed(2)} BDT
          </div> : 
          <div>
     <span className="font-semibold">Total Amount:</span> {data.discountAmount ? data.discountAmount.toFixed(2) : data.amount.toFixed(2)} BDT
          </div>
        }

         
        </p>
      </div>

      {/* Product Details */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Products</h2>
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600">Image</th>
        <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600">Product Data</th>
      </tr>
    </thead>
    <tbody>
      {data?.products?.map((product) => (
        <tr key={product._id} className="hover:bg-gray-50">
          {/* Product Image */}
          <td className="border border-gray-200 px-4 py-2">
            <img
              src={product.images[0]} // Displaying the first image
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
          </td>
          
          {/* Product Name */}
          <td className="border border-gray-200 px-4 py-2">
            <div className="flex flex-col">

              <span className="text-sm text-gray-500">Product ID: {product._id}</span>
              <span className="text-lg font-medium text-gray-800">{product.name}</span>
              

              <td className="p-2">

                 <table className="border border-gray-300 text-center rounded w-full">
                   <thead>
                      <tr className="bg-gray-100">
                         <th className="px-2 py-1 ">Size</th>
                          <th className="px-2 py-1">Quantity</th>
                     </tr>
                  </thead>
                <tbody>
                {product?.sizes.map((s, index) => (
                   <tr key={index}>
                   <td className="px-2 py-1 text-center">{s.size}</td>
                   <td className="px-2 py-1 text-center">{s.quantity}</td>
                 </tr>
                 ))}
               </tbody>
             </table>
            </td>
            
            </div>
          </td>
          

        </tr>
      ))}
    </tbody>
  </table>

</div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">Thank you for shopping with us!</p>
        <p className="text-sm text-gray-400">If you have any issues, please contact support.</p>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Print Order Receipt
        </button>
      </div>
    </div>
  );
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default ViewOrder;