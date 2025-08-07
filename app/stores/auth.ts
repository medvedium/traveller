import { create, type StateCreator } from 'zustand';
import { getUser, loginUser, logoutUser } from '~/lib/user';

interface IActions {
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface IInitialState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
}

interface IStoreState extends IInitialState, IActions {}

const initialState: IInitialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const userStore: StateCreator<IStoreState> = (set) => ({
  ...initialState,
  fetchUser: async () => {
    try {
      const user = await getUser();
      set({ user, isAuthenticated: !!user, loading: false });
    } catch (error) {
      console.error('Ошибка при получении пользователя:', error);
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      await loginUser(email, password);
      const user = await getUser();
      set({ user, isAuthenticated: !!user, loading: false });
    } catch (error) {
      console.error('Ошибка при входе:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await logoutUser();
      set({ user: null, isAuthenticated: false, loading: false });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      throw error;
    }
  },
});

export const useAuthStore = create<IStoreState>()(userStore);

export const isAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const storeUser = () => useAuthStore((state) => state.user);
export const isLoading = () => useAuthStore((state) => state.loading);
export const fetchUser = () => useAuthStore.getState().fetchUser;
export const login = (email: string, password: string) =>
  useAuthStore.getState().login(email, password);
export const logout = () => useAuthStore.getState().logout();
