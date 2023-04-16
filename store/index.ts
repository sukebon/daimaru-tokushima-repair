import { create } from 'zustand';
import { EditedProfile, EditedTask } from '../types';
import { Session } from '@supabase/supabase-js';

type State = {
  session: Session | null;
  setSession: (payload: Session | null) => void;
  isLoading: boolean;
  setIsLoading: (payload: boolean) => void;
  editedProfile: EditedProfile;
  updateEditedProfile: (payload: EditedProfile) => void;
  resetEditedProfile: () => void;
};

const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  isLoading: false,
  setIsLoading: (payload) => set({ isLoading: payload }),
  editedProfile: { username: '', email: '', favorites: '', avatar_url: '' },
  updateEditedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        email: payload.email,
        favorites: payload.favorites,
        avatar_url: payload.avatar_url,
      },
    }),
  resetEditedProfile: () =>
    set({
      editedProfile: {
        username: '',
        email: '',
        favorites: '',
        avatar_url: '',
      },
    }),
}));

export default useStore;
