/* eslint-disable @typescript-eslint/no-explicit-any */
import { type StateCreator } from "zustand/vanilla";

interface UserState {
  info?: any | null;
  type?: "applicant" | "admin";
  isAuthenticated?: boolean;
}

export interface UserSlice {
  user: UserState;
  saveUserInfo: (payload: any) => void;
  logoutUser: () => void;
}

const initialState: UserState = {
  info: null,
  isAuthenticated: false,
};

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: initialState,
  saveUserInfo: (payload: any) => {
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        info: payload,
        type: payload.type,
        isAuthenticated: true,
      },
    }));
  },
  logoutUser: () => {
    set((state) => ({
      ...state,
      user: initialState
    }));
  }
});

export default createUserSlice;
