import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { UserState } from '../interfaces/user';

const initialState: UserState = {
  me: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<UserState['me']>) => {
      state.me = action.payload;
    },
  },
});
