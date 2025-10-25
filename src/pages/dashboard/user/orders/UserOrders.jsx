import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from '../../../../components/Loading'
import { useGetOrdersByEmailQuery } from '../../../../redux/features/orders/orderApi'

const UserOrders = () => {
    const { user } = useSelector((state) => state.auth)
    const { data, isLoading, error } = useGetOrdersByEmailQuery(user?.email)

    if (isLoading) return <Loading />
    if (error) {
        if (error.status === 404) {
            return <div>No orders found for this user.</div>
        }
        return <div>Something went wrong! Failed to fetch your orders.</div>
    }

    const orders = data.data || []
//console.log(orders)
    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">Your Orders</h3>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse text-center">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>View Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {order._id}
                                            <table className="w-full mt-2 border border-gray-200 rounded">
                                                <tbody>
                                                    {order?.products.map((product, pIndex) => (
                                                        <tr key={pIndex} className="border-b">
                                                            <td className="p-2">
                                                                <img 
                                                                    src={product?.images?.[0]} 
                                                                    alt={product?.name} 
                                                                    className="w-12 h-12 object-cover rounded"
                                                                />
                                                            </td>
                                                            <td className="p-2">{product?.name}</td>
                                                            <td className="p-2">
                                                                <table className="border border-gray-300 rounded w-full">
                                                                    <thead>
                                                                        <tr className="bg-gray-100">
                                                                            <th className="px-2 py-1">Size</th>
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
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`p-1 rounded ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                order.status === 'pending' ? 'bg-red-200 text-red-700' :
                                                    order.status === 'processing' ? 'bg-blue-200 text-blue-700' :
                                                        'bg-indigo-100 text-indigo-600'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>{order.discountAmount ? order.discountAmount.toFixed(2) : order.amount.toFixed(2)} BDT</td>
                                        <td>
                                            <Link to={`/orders/${order._id}`} className="text-indigo-500 hover:text-indigo-700">View Order</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserOrders
