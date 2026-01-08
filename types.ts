
export enum UserRole {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  credits: number;
  referrals: number;
  joinedAt: string;
  lastCreditReset?: string;
  subscriptionEnd?: string;
  vaultPin?: string;
  preferredVoice?: string;
  lockSecretChats?: boolean;
  biometricEnabled?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  thought?: string; 
  timestamp: number;
  type?: 'text' | 'image' | 'analysis';
  imageUrl?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  isSecret: boolean;
  folderId?: string;
  updatedAt: number;
  model?: string; 
}

export interface Folder {
  id: string;
  name: string;
  icon?: string;
}

export interface VaultItem {
  id: string;
  type: 'password' | 'note' | 'seed';
  title: string;
  content: string;
  timestamp: number;
}

export interface Snippet {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

export enum AppView {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  CHAT = 'CHAT',
  VAULT = 'VAULT',
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS',
  LEGAL = 'LEGAL',
  TASKS = 'TASKS',
  SUPPORT = 'SUPPORT',
  SECURITY_ACTIVITY = 'SECURITY_ACTIVITY',
  SNIPPETS = 'SNIPPETS',
  ABOUT = 'ABOUT'
}
