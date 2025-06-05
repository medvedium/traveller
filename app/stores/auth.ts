import { create } from 'zustand';
import { getUser, loginUser, logoutUser } from '~/lib/user';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  // Метод для загрузки состояния пользователя
  fetchUser: async () => {
    try {
      const user = await getUser();
      set({ user, isAuthenticated: !!user, loading: false });
    } catch (error) {
      console.error('Ошибка при получении пользователя:', error);
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  // Метод для входа
  login: async (email: string, password: string) => {
    try {
      await loginUser(email, password); // Вызываем функцию входа
      const user = await getUser(); // Получаем данные пользователя после входа
      set({ user, isAuthenticated: !!user, loading: false });
    } catch (error) {
      console.error('Ошибка при входе:', error);
      throw error; // Можно выбросить ошибку для обработки в компоненте
    }
  },

  // Метод для выхода
  logout: async () => {
    try {
      await logoutUser(); // Вызываем функцию выхода
      set({ user: null, isAuthenticated: false, loading: false });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      throw error; // Можно выбросить ошибку для обработки в компоненте
    }
  },
}));

export const useIsAuthenticated = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);

  return { isAuthenticated, loading };
};