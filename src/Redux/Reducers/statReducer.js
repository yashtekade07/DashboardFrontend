import { createReducer } from '@reduxjs/toolkit';

export const statReducer = createReducer({ stats: [] }, (builder) => {
  builder
    .addCase('getStatsRequest', (state) => {
      state.loading = true;
    })
    .addCase('getStatsSuccess', (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.message = action.payload.message;
    })
    .addCase('getStatsFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('clearError', (state) => {
      state.error = null;
    })
    .addCase('clearMessage', (state) => {
      state.message = null;
    });
});

export const callEntryReducer = createReducer({ callEntry: [] }, (builder) => {
  builder
    .addCase('getCallEntryRequest', (state) => {
      state.loading = true;
    })
    .addCase('getCallEntrySuccess', (state, action) => {
      state.loading = false;
      state.callEntry = action.payload.callEntries;
      state.message = action.payload.message;
    })
    .addCase('getCallEntryFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('clearError', (state) => {
      state.error = null;
    })
    .addCase('clearMessage', (state) => {
      state.message = null;
    });
});
