import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CartItem, MenuItem } from '../types';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function RestaurantMenu() {
  const { id } = useParams<{ id: string }>();
  const { restaurants, addToCart, cart, updateQuantity, removeFromCart } = useStore();
  
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return <div className="p-4">Restaurant not found</div>;
  }

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem?.quantity || 0;
  };

  const handleUpdateQuantity = (menuItem: MenuItem, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(menuItem.id);
    } else {
      const cartItem: CartItem = {
        ...menuItem,
        quantity: newQuantity,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
      };
      
      if (getItemQuantity(menuItem.id) === 0) {
        addToCart(cartItem);
      } else {
        updateQuantity(menuItem.id, newQuantity);
      }
    }
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
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{restaurant.name}</h2>
        <p className="text-gray-600">{restaurant.cuisine}</p>
      </div>
      
      {restaurant.categories.map(category => (
        <div key={category.id} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.items.map((item) => {
              const quantity = getItemQuantity(item.id);
              return (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                      {quantity === 0 ? (
                        <button
                          onClick={() => handleUpdateQuantity(item, 1)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item, quantity - 1)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item, quantity + 1)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}