import { configureStore } from '@reduxjs/toolkit';
import { callEntryReducer } from './Reducers/statReducer.js';

export default configureStore({
  reducer: {
    callEntry: callEntryReducer,
  },
});
