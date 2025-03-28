import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

type TFeedsState = {
  orders: TOrder[];
  totalOrders: number;
  ordersToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedsState = {
  orders: [],
  totalOrders: 0,
  ordersToday: 0,
  loading: false,
  error: null
};

export const getFeeds = createAsyncThunk('feeds/getFeeds', getFeedsApi);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialState,
  selectors: {
    selectFeedsOrders: (state) => state.orders,
    selectTotalOrders: (state) => state.totalOrders,
    selectOrdersToday: (state) => state.ordersToday,
    selectFeedsLoading: (state) => state.loading,
    selectFeedsError: (state) => state.error
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.ordersToday = action.payload.totalToday;
        state.error = null;
      });
  }
});

export const {
  selectFeedsOrders,
  selectOrdersToday,
  selectTotalOrders,
  selectFeedsLoading,
  selectFeedsError
} = feedsSlice.selectors;
export default feedsSlice.reducer;
