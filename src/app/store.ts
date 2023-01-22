import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import breedReducer from '../breeds/breedsSlice';

export const store = configureStore({
  reducer: {
    breeds: breedReducer,
  },
});







export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
