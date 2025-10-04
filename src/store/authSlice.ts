import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';

export type AuthUser = {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'creator';
  name?: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: (() => {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  })(),
  token: localStorage.getItem('auth_token'),
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (
    payload: { email: string; password: string; selectedRole?: 'admin' | 'user' | 'creator' },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post('/auth/login', {
        email: payload.email,
        password: payload.password,
      });
      const data = res.data;
      if (!data?.success) throw new Error(data?.message || 'Login failed');
      const { user, token } = data.data ?? data;
      if (payload.selectedRole && user?.role && payload.selectedRole !== user.role) {
        throw new Error(`Selected role (${payload.selectedRole}) does not match your account role (${user.role}).`);
      }
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      return { user, token } as { user: AuthUser; token: string };
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Login failed');
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (
    payload: { name: string; email: string; password: string; role: 'user' | 'creator'; handle?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post('/auth/register', payload);
      const data = res.data;
      if (!data?.success) throw new Error(data?.message || 'Registration failed');
      const { user, token } = data.data ?? data;
      if (token) localStorage.setItem('auth_token', token);
      if (user) localStorage.setItem('auth_user', JSON.stringify(user));
      return { user: user ?? null, token: token ?? null } as { user: AuthUser | null; token: string | null };
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    },
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Login failed';
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Registration failed';
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;


