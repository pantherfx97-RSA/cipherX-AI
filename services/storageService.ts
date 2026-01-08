
import { ChatSession, User, VaultItem, Folder, UserRole, Snippet } from '../types';

const STORAGE_KEYS = {
  USER: 'cipherx_user',
  SESSIONS: 'cipherx_sessions',
  VAULT: 'cipherx_vault',
  FOLDERS: 'cipherx_folders',
  SNIPPETS: 'cipherx_snippets'
};

export const storageService = {
  getUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    if (!data) return null;
    let user = JSON.parse(data);

    // Daily Credit Reset Logic
    const now = new Date();
    const lastReset = user.lastCreditReset ? new Date(user.lastCreditReset) : new Date(0);
    
    // If it's a new day, reset credits to 5 if user is FREE
    if (user.role === UserRole.FREE && (now.getDate() !== lastReset.getDate() || now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear())) {
      user.credits = 5;
      user.lastCreditReset = now.toISOString();
      storageService.saveUser(user);
    }

    return user;
  },
  
  saveUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getSessions: (): ChatSession[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  },

  saveSessions: (sessions: ChatSession[]) => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  getVault: (): VaultItem[] => {
    const data = localStorage.getItem(STORAGE_KEYS.VAULT);
    return data ? JSON.parse(data) : [];
  },

  saveVault: (items: VaultItem[]) => {
    localStorage.setItem(STORAGE_KEYS.VAULT, JSON.stringify(items));
  },

  getFolders: (): Folder[] => {
    const data = localStorage.getItem(STORAGE_KEYS.FOLDERS);
    return data ? JSON.parse(data) : [];
  },

  saveFolders: (folders: Folder[]) => {
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
  },

  getSnippets: (): Snippet[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SNIPPETS);
    return data ? JSON.parse(data) : [];
  },

  saveSnippets: (snippets: Snippet[]) => {
    localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(snippets));
  },

  // Add referral Logic
  addReferral: (user: User): User => {
    const newUser = {
      ...user,
      referrals: (user.referrals || 0) + 1,
      credits: (user.credits || 0) + 20
    };
    storageService.saveUser(newUser);
    return newUser;
  }
};
