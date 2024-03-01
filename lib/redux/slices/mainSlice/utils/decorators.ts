import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReduxDispatch, ReduxState } from '@/lib/redux';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
   state: ReduxState;
   dispatch: ReduxDispatch;
   rejectValue: string;
}>();
