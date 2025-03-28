import { TOrder, TUser } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  orders: TOrder[];
  loading: boolean;
  error: string | undefined;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  orders: [],
  loading: false,
  error: undefined
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const logout = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.clear();
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

export const getUserOrders = createAsyncThunk(
  'user/getsUserOrders',
  getOrdersApi
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  resetPasswordApi
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUserOrders: (state) => state.orders,
    selectUserLoading: (state) => state.loading,
    selectUserError: (state) => state.error
  },
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : undefined;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : undefined;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.user = null;
        state.orders = [];
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : undefined;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : undefined;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.error = '';
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : '';
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
      });
  }
});

export const {
  selectUser,
  selectIsAuthChecked,
  selectIsAuthenticated,
  selectUserOrders,
  selectUserLoading,
  selectUserError
} = userSlice.selectors;
export const { authChecked } = userSlice.actions;
export default userSlice.reducer;
