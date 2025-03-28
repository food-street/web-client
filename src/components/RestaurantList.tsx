import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { CachedImage } from './CachedImage';

// Mock data - replace with actual API call
const mockRestaurants = [
  {
    id: '1',
    name: 'Empire Restaurant',
    cuisine: 'South Indian',
    image: 'https://storage.cloud.google.com/food-street-images/restaurants/empire.png',
    categories: [
      {
        id: 'cat1',
        name: 'Starters',
        items: [
          {
            id: '1',
            name: 'Crispy Fish',
            description: 'Crunchy small strips of fish, deep fried.',
            price: 199,
            image: 'https://placehold.co/600x400'
          },
          {
            id: '2',
            name: 'Paneer Tikka',
            description: '',
            price: 10.99,
            image: 'https://placehold.co/600x400'
          }
        ]
      },
      {
        id: 'cat2',
        name: 'Sides',
        items: [
          {
            id: '3',
            name: 'French Fries',
            description: 'Crispy golden fries',
            price: 4.99,
            image: 'https://placehold.co/600x400'
          },
          {
            id: '4',
            name: 'Onion Rings',
            description: 'Crispy battered onion rings',
            price: 5.99,
            image: 'https://placehold.co/600x400'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Popeyes',
    cuisine: 'Continental',
    image: 'https://storage.cloud.google.com/food-street-images/restaurants/popeyes.png',
    categories: [
      {
        id: 'cat3',
        name: 'Pizzas',
        items: [
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
      },
      {
        id: 'cat4',
        name: 'Pasta',
        items: [
          {
            id: '6',
            name: 'Spaghetti Carbonara',
            description: 'Creamy pasta with bacon and egg',
            price: 11.99,
            image: 'https://placehold.co/600x400'
          },
          {
            id: '7',
            name: 'Penne Arrabbiata',
            description: 'Spicy tomato sauce with garlic',
            price: 10.99,
            image: 'https://placehold.co/600x400'
          }
        ]
      }
    ]
  }
];

export default function RestaurantList() {
  const { setRestaurants, restaurants } = useStore();

  useEffect(() => {
    // Replace with actual API call
    setRestaurants(mockRestaurants);
  }, [setRestaurants]);

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
            <CachedImage
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