export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  otp: string;
  createdAt: Date;
}

export interface FoodCourt {
  id: string;
  name: string;
  location: string;
  image: string;
  restaurants: Restaurant[];
}

export interface User {
  phoneNumber: string;
  orders: Order[];
}