import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, updateTaxRate } from "../../redux/features/cart/cartSlice";
import { useUseCouponMutation } from "../../redux/features/coupon/couponApi";
import { getBaseUrl } from "../../utils/baseURL";

const OrderSummary = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, selectedItems, totalPrice, discoun, discountRate, grandTotal } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [useCoupon] = useUseCouponMutation();
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [disc, setDisc] = useState(null);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const cartProduct = [
        ...products,
        { grandTotal } // Wrap it in an object
    ];

    const handleProceedToCheckout = () => {
        navigate("/checkout", { state: { cartProduct } });
    };

    const makePayment = async () => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
        const body = { products, userId: user?._id, grandTotal, selectedItems, couponCode: code || undefined };

        try {
            const response = await axios.post(`${getBaseUrl()}/api/orders/create-checkout-session`, body, {
                headers: { "Content-Type": "application/json" },
            });

            const result = stripe.redirectToCheckout({ sessionId: response.data.id });
            if (result.error) {
                console.error("Error redirecting to checkout", result.error);
            }
        } catch (error) {
            console.error("Error creating checkout", error);
        }
    };

    const handleUseCoupon = async () => {
        try {
            const result = await useCoupon({ code }).unwrap();
            setMessage(`Coupon applied: ${result.code}`);
            setDisc(`You got ${result.discount}% discount`);
            dispatch(updateTaxRate(result.discount / 100));
        } catch (err) {
            setMessage(err.data?.error || "Failed to apply coupon");
        }
    };

    return (
        <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <p className="text-gray-600">Selected Items: {selectedItems}</p>
            <p className="text-gray-600">Total Price: {totalPrice.toFixed(2)} BDT</p>
            <p className="text-gray-600">Discount ({discountRate * 100}%): {discoun.toFixed(2)} BDT</p>

            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                />
                <button onClick={handleUseCoupon} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Apply Coupon
                </button>
                {message && <p className="text-green-600 mt-2">{message}</p>}
                {disc && <p className="text-green-600">{disc}</p>}
            </div>

            <h3 className="text-lg font-bold mt-4">Grand Total: {grandTotal.toFixed(2)} BDT</h3>

            <div className="mt-6 space-y-2">
                <button
                    onClick={handleClearCart}
                    className="bg-red-500 px-4 py-2 text-white w-full rounded flex items-center justify-center"
                >
                    Clear Cart
                </button>
                <button
                    onClick={handleProceedToCheckout}
                    className="bg-green-500 px-4 py-2 text-white w-full rounded flex items-center justify-center"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;
