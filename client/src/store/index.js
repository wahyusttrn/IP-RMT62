import { configureStore } from '@reduxjs/toolkit';
import { profileReducer } from './profile';
import { collectionReducer } from './collection';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    collection: collectionReducer
  }
});
