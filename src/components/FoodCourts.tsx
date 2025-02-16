import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

// Mock data
const mockFoodCourts = [
  {
    id: 'fc1',
    name: 'Downtown Court',
    location: '123 Main St',
    image: 'https://picsum.photos/seed/food-court/600/400',
    restaurants: []
  },
  {
    id: 'fc2',
    name: 'Mall Food Court',
    location: '456 Shopping Ave',
    image: 'https://placehold.co/600x400',
    restaurants: []
  },
  {
    id: 'fc3',
    name: 'Beach Food Court',
    location: '789 Beach Rd',
    image: 'https://placehold.co/600x400',
    restaurants: []
  }
];

export default function FoodCourts() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Home
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">Available Food Courts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockFoodCourts.map((foodCourt) => (
          <Link
            key={foodCourt.id}
            to="/restaurants"
            onClick={() => useStore.getState().setFoodCourt(foodCourt.id)}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={foodCourt.image}
              alt={foodCourt.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{foodCourt.name}</h3>
              <p className="text-gray-600">{foodCourt.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}