import { create } from 'zustand';
import { AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>(() => ({

  login: async () => {
    try {
    
      window.location.replace('http://localhost:3000');
      
    } catch {
      window.location.replace('/login');
    }
  },

  logout: async () => {
    localStorage.removeItem('user');
    window.location.replace('/login')
  },
}));
