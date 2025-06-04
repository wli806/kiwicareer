import wishlistSlice from './features/wishlist';
import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './features/filterSlice';
import authSlice from './features/authSlice';
import profileSlice from "./features/profilesSlice";
import resumeSlice from "./features/resumeSlice";
import accountSettingSlice from './features/accountSettingSlice';
import commonSlice from './features/commonSlice';

export const store = configureStore({
  reducer: {
    filter:filterSlice,
    wishlist:wishlistSlice,
    auth:authSlice,
    profile: profileSlice,
    resume: resumeSlice,
    account: accountSettingSlice,
    common: commonSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch