import { configureStore } from '@reduxjs/toolkit';

import { rootMiddleware } from './middlewares';
import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: rootMiddleware,
});
