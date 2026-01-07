export interface FoodListing {
  id: string;
  title: string;
  description: string;
  category: 'raw' | 'cooked';
  quantity: string;
  imageUrl: string;
  expiresAt: Date;
  createdAt: Date;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  donor: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    totalDonations: number;
  };
  status: 'available' | 'claimed' | 'completed' | 'expired';
  claimedBy?: string;
  distance?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  totalDonations: number;
  totalClaims: number;
  badges: string[];
  joinedAt: Date;
}

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  points: 1250,
  totalDonations: 28,
  totalClaims: 15,
  badges: ['Early Adopter', 'Super Donor', 'Community Hero'],
  joinedAt: new Date('2024-06-15'),
};

export const mockListings: FoodListing[] = [
  {
    id: '1',
    title: 'Fresh Vegetable Curry',
    description: 'Homemade vegetable curry with rice. Serves 4-5 people. Made fresh this morning.',
    category: 'cooked',
    quantity: '4 servings',
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
    expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    location: {
      address: '123 Main Street, Downtown',
      lat: 40.7128,
      lng: -74.006,
    },
    donor: {
      id: 'donor-1',
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      totalDonations: 45,
    },
    status: 'available',
    distance: 0.8,
  },
  {
    id: '2',
    title: 'Organic Fruits Basket',
    description: 'Assorted organic fruits - apples, oranges, and bananas. All fresh from local farmers market.',
    category: 'raw',
    quantity: '2 kg',
    imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop',
    expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    location: {
      address: '456 Oak Avenue, Westside',
      lat: 40.7148,
      lng: -74.013,
    },
    donor: {
      id: 'donor-2',
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      totalDonations: 67,
    },
    status: 'available',
    distance: 1.2,
  },
  {
    id: '3',
    title: 'Homemade Pasta & Sauce',
    description: 'Fresh homemade pasta with marinara sauce. Perfect for a family dinner.',
    category: 'cooked',
    quantity: '6 servings',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2c2?w=400&h=300&fit=crop',
    expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    location: {
      address: '789 Elm Street, Eastside',
      lat: 40.7108,
      lng: -74.001,
    },
    donor: {
      id: 'donor-3',
      name: 'Sofia Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      rating: 5.0,
      totalDonations: 89,
    },
    status: 'available',
    distance: 0.5,
  },
  {
    id: '4',
    title: 'Fresh Bread Loaves',
    description: 'Three loaves of freshly baked sourdough bread. Baked this morning!',
    category: 'cooked',
    quantity: '3 loaves',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    location: {
      address: '321 Baker Lane, Northside',
      lat: 40.7158,
      lng: -74.008,
    },
    donor: {
      id: 'donor-4',
      name: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      totalDonations: 32,
    },
    status: 'available',
    distance: 1.8,
  },
  {
    id: '5',
    title: 'Assorted Vegetables',
    description: 'Fresh vegetables including carrots, potatoes, onions, and tomatoes.',
    category: 'raw',
    quantity: '5 kg',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    location: {
      address: '555 Green Street, Southside',
      lat: 40.7098,
      lng: -74.015,
    },
    donor: {
      id: 'donor-5',
      name: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      rating: 4.6,
      totalDonations: 21,
    },
    status: 'available',
    distance: 2.3,
  },
];

export const mockClaims = [
  {
    id: 'claim-1',
    listingId: '1',
    listing: mockListings[0],
    status: 'pending' as const,
    claimedAt: new Date(),
    pickupCode: 'FD-2024-001',
  },
];

export const mockDonations = mockListings.slice(0, 3).map(listing => ({
  ...listing,
  donor: mockUser,
}));
