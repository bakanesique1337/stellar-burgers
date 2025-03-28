import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  order: null,
  loading: false,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrder',
  async (number: number) => getOrderByNumberApi(number)
);

export const burgerOrderSlice = createSlice({
  name: 'burgerOrder',
  initialState,
  selectors: {
    selectOrder: (state) => state.order,
    selectOrderLoading: (state) => state.loading,
    selectOrderError: (state) => state.error
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
      });
  }
});

export const { selectOrder, selectOrderLoading, selectOrderError } =
  burgerOrderSlice.selectors;
export default burgerOrderSlice.reducer;
