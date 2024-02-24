import { configureStore } from '@reduxjs/toolkit';
import { callEntryReducer, statReducer } from './Reducers/statReducer.js';

export default configureStore({
  reducer: {
    stat: statReducer,
    callEntry: callEntryReducer,
  },
});
