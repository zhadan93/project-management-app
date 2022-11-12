import { AxiosErrorData, SignUpResponse, User, UserInitialState } from '../types/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userService } from '../api/userService';
import { AxiosError } from 'axios';
import { RootState } from './store';
import { tokenService } from '../api/tokenService';

const initialState: UserInitialState = {
  userLoadingStatus: 'idle',
  user: {
    userId: '',
    userName: '',
    login: '',
  },
};

export const getAllUsers = createAsyncThunk('user/getAllUsers', async ({}, { rejectWithValue }) => {
  try {
    const response = await userService.getAllUsers();
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    const errorData = error.response?.data as AxiosErrorData;
    return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
  }
});

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userService.getUserById(id);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      const errorData = error.response?.data as AxiosErrorData;
      return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userService.deleteUser(id);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      const errorData = error.response?.data as AxiosErrorData;
      return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
    }
  }
);

interface updateUserArg {
  id: string;
  userData: SignUpResponse;
}

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, userData }: updateUserArg, { rejectWithValue }) => {
    try {
      const response = await userService.updateUser(id, userData);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      const errorData = error.response?.data as AxiosErrorData;
      return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userLoadingStatus = 'idle';
      state.user = {
        userId: '',
        userName: '',
        login: '',
      };
      tokenService.removeToken();
      userService.removeUserData();
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = { ...action.payload };
      userService.setUserData(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.userLoadingStatus = 'loading';
      })
      .addCase(getUserById.fulfilled, (state) => {
        state.userLoadingStatus = 'succeeded';
        // state.user = { ...action.payload };
        // userService.setUserData(action.payload);
      });
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoadingStatus = (state: RootState) => state.user.userLoadingStatus;

export const { logout, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
