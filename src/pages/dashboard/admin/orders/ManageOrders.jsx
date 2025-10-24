import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { useDeleteOrderByIdMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/orderApi';
import UpdateOrderModal from './UpdateOrderModal';

const ManageOrders = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filterStatus, setFilterStatus] = useState(""); // State for filtering orders
    const { data, isLoading, error, refetch } = useGetAllOrdersQuery();
    const [deleteOrderById] = useDeleteOrderByIdMutation();

    if (isLoading) return <Loading />;
    if (error) return <div>Failed to fetch orders!</div>;

    let orders = data.data || [];

    // Filter orders by selected status
    if (filterStatus) {
        orders = orders.filter(order => order.status === filterStatus);
    }

    // Separate orders with and without bKash
    const ordersWithBkash = orders.filter(order => order?.bkashNumberLastDigit);
    const ordersWithoutBkash = orders.filter(order => !order?.bkashNumberLastDigit);

    const handleDeleteClick = async (orderId) => {
        try {
            await deleteOrderById(orderId).unwrap();
            alert(`Deleted order ${orderId}`);
            refetch();
        } catch (error) {
            console.error("Failed to delete order:", error);
        }
    };

    const handleEdit = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <section className="p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Manage Orders</h2>

            {/* Filter by Status */}
            <div className="mb-4 flex flex-col md:flex-row items-center md:justify-between gap-4">
                <label className="text-md font-semibold">Filter by Status:</label>
                <select
                    className="p-2 border rounded-md"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="pending_verification">pending_verification</option>
                    <option value="cancelled">cancelled</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Responsive Layout for Orders */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Orders with bKash */}
                <div className="w-full lg:w-1/2">
                    <h3 className="text-lg font-semibold mb-2 text-center lg:text-left">Orders with bKash</h3>
                    <OrdersTable orders={ordersWithBkash} handleEdit={handleEdit} handleDeleteClick={handleDeleteClick} />
                </div>

                {/* Orders without bKash */}
                <div className="w-full lg:w-1/2">
                    <h3 className="text-lg font-semibold mb-2 text-center lg:text-left">Orders without bKash</h3>
                    <OrdersTable orders={ordersWithoutBkash} handleEdit={handleEdit} handleDeleteClick={handleDeleteClick} />
                </div>
            </div>

            {/* Update Order Modal */}
            {selectedOrder && (
                <UpdateOrderModal order={selectedOrder} isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
        </section>
    );
};

export default ManageOrders;

// OrdersTable Component (Reusable)
const OrdersTable = ({ orders, handleEdit, handleDeleteClick }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-3 border-b">Order ID</th>
                        <th className="py-2 px-3 border-b">Customer</th>
                        <th className="py-2 px-3 border-b">Status</th>
                        <th className="py-2 px-3 border-b">Date</th>
                        <th className="py-2 px-3 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="py-4 text-center text-gray-500">
                                No orders found
                            </td>
                        </tr>
                    ) : (
                        orders.map((order, index) => (
                            <tr key={index} className="border-b text-center md:text-left">
                                <td className="py-2 px-3 flex flex-col">
                                    {order._id}
                                    {order?.bkashNumberLastDigit ? (
                                        <span className="font-semibold">Bkash - {order?.bkashNumberLastDigit}</span>
                                    ) : null}
                                </td>
                                <td className="py-2 px-3">{order?.email}</td>
                                <td className="py-2 px-3">
                                    <span className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-2 px-3">{new Date(order?.updatedAt).toLocaleDateString()}</td>
                                <td className="py-2 px-3 space-x-2 flex justify-center md:justify-start">
                                    <Link to={`/dashboard/manage-orders/orders/${order._id}`} className="text-blue-500 hover:underline">
                                        View
                                    </Link>
                                    <button onClick={() => handleEdit(order)} className="text-green-500 hover:underline">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteClick(order?._id)} className="text-red-500 hover:underline">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

// Get status color
const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500';
        case 'processing':
            return 'bg-blue-500';
        case 'shipped':
            return 'bg-green-500';
        case 'completed':
            return 'bg-gray-500';
        default:
            return 'bg-gray-300';
    }
};
