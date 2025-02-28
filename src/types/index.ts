// User-related types
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  organizationId?: string;
  createdAt: Date;
  subscription: SubscriptionType;
}





export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  ORGANIZATION_ADMIN = 'organization_admin'
}

export enum SubscriptionType {
  FREE = 'free',
  PRO = 'pro',
  ORGANIZATION = 'organization'
}

// File-related types
export interface FileItem {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  ipfsHash: string;
  encryptionKey?: string;
  createdAt: Date;
  lastAccessed?: Date;
  isStarred: boolean;
  isShared: boolean;
  ownerId: string;
  sharedWith?: string[];
  parentFolderId?: string;
}

export interface Folder {
  id: string;
  name: string;
  createdAt: Date;
  parentId?: string;
  ownerId: string;
  isShared: boolean;
  sharedWith?: string[];
}

// Organization-related types
export interface Organization {
  id: string;
  name: string;
  logoUrl?: string;
  adminIds: string[];
  memberIds: string[];
  subscription: OrganizationSubscription;
  createdAt: Date;
}

export interface OrganizationSubscription {
  type: SubscriptionType.ORGANIZATION;
  seats: number;
  storageLimit: number;
  features: string[];
  expiresAt: Date;
}

export interface OrganizationInvite {
  id: string;
  email: string;
  role: UserRole;
  organizationId: string;
  invitedBy: string;
  status: 'pending' | 'accepted' | 'rejected';
  expiresAt: Date;
}

export interface OrganizationDepartment {
  id: string;
  name: string;
  organizationId: string;
  leaderId: string;
  memberIds: string[];
  storageLimit: number;
}

// API and Integration types
export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: Date;
  lastUsed?: Date;
  permissions: string[];
  userId: string;
}

export interface AppIntegration {
  id: string;
  name: string;
  description: string;
  icon: string;
  isEnabled: boolean;
  permissions: string[];
  userId: string;
  apiUrl?: string;
}

// AI Integration types
export interface AIAnalysis {
  fileId: string;
  summary: string;
  tags: string[];
  entities: string[];
  sentiment: number;
  language: string;
  createdAt: Date;
}

export interface AIPlugin {
  id: string;
  name: string;
  provider: string;
  capabilities: string[];
  apiEndpoint: string;
  isEnabled: boolean;
  config: Record<string, any>;
}

// Integration Marketplace types
export interface MarketplaceApp {
  id: string;
  name: string;
  description: string;
  category: string;
  publisher: string;
  rating: number;
  installCount: number;
  icon: string;
  pricing: {
    type: 'free' | 'paid' | 'subscription';
    price?: number;
    trial?: number;
  };
}

// Storage and Pricing types
export interface StorageQuota {
  total: number;
  used: number;
  remaining: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  storageLimit: number;
  isPopular?: boolean;
}