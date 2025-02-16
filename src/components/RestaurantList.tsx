import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

// Mock data - replace with actual API call
const mockRestaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    cuisine: 'Fast Food',
    image: 'https://placehold.co/600x400',
    menu: [
      {
        id: '1',
        name: 'Classic Burger',
        description: 'Beef patty with lettuce and tomato',
        price: 9.99,
        image: 'https://placehold.co/600x400'
      },
      {
        id: '2',
        name: 'Cheeseburger',
        description: 'Classic burger with cheddar cheese',
        price: 10.99,
        image: 'https://placehold.co/600x400'
      },
      {
        id: '3',
        name: 'Chicken Burger',
        description: 'Grilled chicken with mayo',
        price: 8.99,
        image: 'https://placehold.co/600x400'
      }
    ]
  },
  {
    id: '2',
    name: 'Pizza Express',
    cuisine: 'Italian',
    image: 'https://placehold.co/600x400',
    menu: [
      {
        id: '4',
        name: 'Margherita',
        description: 'Classic tomato and mozzarella',
        price: 12.99,
        image: 'https://placehold.co/600x400'
      },
      {
        id: '5',
        name: 'Pepperoni',
        description: 'Spicy pepperoni with cheese',
        price: 14.99,
        image: 'https://placehold.co/600x400'
      }
    ]
  }
];

export default function RestaurantList() {
  const { setRestaurants, restaurants } = useStore();

  useEffect(() => {
    // Replace with actual API call
    setRestaurants(mockRestaurants);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            to={`/restaurant/${restaurant.id}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{restaurant.name}</h3>
              <p className="text-gray-600">{restaurant.cuisine}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}