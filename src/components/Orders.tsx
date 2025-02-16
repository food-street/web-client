import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function Orders() {
  const { orders, user } = useStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p className="mb-4">Please log in to view your orders</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Log In
        </button>
      </div>
    );
  }

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

      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Order #{order.id}</h3>
              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
                {order.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div className="space-y-1">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t flex justify-between font-semibold">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}