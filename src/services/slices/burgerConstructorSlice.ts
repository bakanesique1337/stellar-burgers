import {
  TConstructorIngredient,
  TIngredient,
  IngredientType,
  TOrder
} from '@utils-types';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

type TBurgerConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TBurgerConstructorState = {
  items: TBurgerConstructorItems;
  loading: boolean;
  modalData: TOrder | null;
  error: string | null;
};

const burgerConstructorItemsInitialState = {
  bun: null,
  ingredients: []
};

const initialState: TBurgerConstructorState = {
  items: burgerConstructorItemsInitialState,
  loading: false,
  modalData: null,
  error: null
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  selectors: {
    selectConstructorItems: (sliceState) => sliceState.items,
    selectConstructorLoading: (sliceState) => sliceState.loading,
    selectConstructorModalData: (sliceState) => sliceState.modalData,
    selectConstructorError: (sliceState) => sliceState.error
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === IngredientType.BUN) {
          state.items.bun = action.payload;
        } else {
          state.items.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    deleteIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.items.ingredients = state.items.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    reorderIngredients: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const ingredients = [...state.items.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.items.ingredients = ingredients;
    },
    resetConstructor: () => initialState
  },
  extraReducers(builder) {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.items = burgerConstructorItemsInitialState;
        state.modalData = action.payload.order;
      });
  }
});

export const {
  selectConstructorItems,
  selectConstructorLoading,
  selectConstructorModalData,
  selectConstructorError
} = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  reorderIngredients,
  deleteIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
