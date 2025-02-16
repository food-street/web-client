import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { orders } = useStore();
  
  const order = orders.find(o => o.id === id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          to="/orders" 
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Orders
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Order #{order.id}</h2>
          <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-800">
            {order.status}
          </span>
        </div>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">from {item.restaurantName}</p>
              </div>
              <div className="text-right">
                <p>{item.quantity} x ${item.price.toFixed(2)}</p>
                <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold mb-2">Collection OTP: {order.otp}</p>
            <p className="text-sm text-gray-600">
              Show this OTP when collecting your order from each restaurant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}