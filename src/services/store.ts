import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { burgerIngredientsSlice } from './slices/burgerIngredientsSlice';
import { userSlice } from './slices/userSlice';
import { feedsSlice } from './slices/feedsSlice';
import { burgerOrderSlice } from './slices/burgerOrderSlice';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorSlice.reducer,
  ingredients: burgerIngredientsSlice.reducer,
  burgerOrder: burgerOrderSlice.reducer,
  user: userSlice.reducer,
  feeds: feedsSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
