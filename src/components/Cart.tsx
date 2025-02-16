import { useStore } from '../store/useStore';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, addOrder, user } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | null>(null);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    const order = {
      id: Math.random().toString(36).substr(2, 9),
      items: cart,
      total,
      status: 'preparing' as const,
      otp: Math.random().toString().substr(2, 6),
      createdAt: new Date()
    };

    addOrder(order);
    clearCart();
    navigate(`/orders/${order.id}`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          to="/restaurants" 
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Restaurants
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  from {item.restaurantName}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(0, item.quantity - 1))
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <div className="flex justify-between font-bold text-xl mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`px-4 py-2 rounded ${
                    paymentMethod === 'upi'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  UPI
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`px-4 py-2 rounded ${
                    paymentMethod === 'card'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  Card
                </button>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold"
            >
              {user ? 'Proceed to Payment' : 'Login to Place Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}