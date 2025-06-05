import { create } from 'zustand'

type State = {
	isAuthenticated: boolean;
	userName?: string;
}

type Actions = {
	loginUser: (userName: string) => void;
}

export const usePersonStore = create<State & Actions>((set) => ({
	isAuthenticated: false,
	userName: '',

	loginUser: (userName: string) => set((state) => ({ ...state, isAuthenticated: true, userName: userName })),
}))
