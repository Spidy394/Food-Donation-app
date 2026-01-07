import type { Request } from 'express';

// ============================================
// USER TYPES
// ============================================

export enum UserRole {
  DONOR = 'donor',
  VOLUNTEER = 'volunteer',
  NGO = 'ngo',
}

export interface IUser {
  userId: string; // Firebase UID
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  address: string;
  city: string;
  state: string;
  pincode: string;
  points?: number; // For donors
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// FOOD LISTING TYPES
// ============================================

export enum FoodCategory {
  RAW = 'raw',
  COOKED = 'cooked',
}

export enum ListingStatus {
  AVAILABLE = 'available',
  CLAIMED = 'claimed',
  COMPLETED = 'completed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

export interface IFoodListing {
  listingId: string;
  donorId: string;
  title: string;
  description: string;
  category: FoodCategory;
  quantity: number;
  unit: string;
  images: string[]; // Firebase Storage URLs
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  address: string;
  city: string;
  state: string;
  pincode: string;
  expiryTime?: Date; // AI-suggested
  aiAnalysis?: {
    suggestedCategory: FoodCategory;
    estimatedExpiryHours: number;
    qualityTips?: string[];
    confidence: number;
  };
  status: ListingStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// ORDER TYPES
// ============================================

export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface IOrder {
  orderId: string;
  listingId: string;
  donorId: string;
  claimerId: string; // NGO or Volunteer
  pickupLocation: {
    type: 'Point';
    coordinates: [number, number];
  };
  pickupAddress: string;
  qrCode?: string; // Generated QR code data
  qrCodeUrl?: string; // QR code image URL
  status: OrderStatus;
  claimedAt: Date;
  completedAt?: Date;
  route?: any; // Google Maps route data
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// FEEDBACK TYPES
// ============================================

export interface IFeedback {
  feedbackId: string;
  orderId: string;
  donorId: string;
  claimerId: string;
  rating: number; // 1-5
  comment?: string;
  pointsAwarded: number;
  createdAt: Date;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export enum NotificationType {
  NEW_LISTING = 'new_listing',
  ORDER_CLAIMED = 'order_claimed',
  ORDER_IN_PROGRESS = 'order_in_progress',
  ORDER_COMPLETED = 'order_completed',
  FEEDBACK_RECEIVED = 'feedback_received',
}

export interface INotification {
  notificationId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  metadata?: any;
  isRead: boolean;
  createdAt: Date;
}

// ============================================
// REQUEST EXTENSIONS
// ============================================

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    role?: UserRole;
  };
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  status: 'success';
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// GEMINI AI TYPES
// ============================================

export interface GeminiAnalysisRequest {
  images: string[]; // Base64 or URLs
  description: string;
  category?: FoodCategory;
}

export interface GeminiAnalysisResponse {
  suggestedCategory: FoodCategory;
  estimatedExpiryHours: number;
  qualityTips: string[];
  confidence: number;
  reasoning?: string;
}