import { configureStore, combineReducers} from '@reduxjs/toolkit';

import userReducer from './reducers/userReducer';
// import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const reducers = combineReducers({
  user: userReducer,
  UI: uiReducer,
  // data: dataReducer,
  
})

export const store = configureStore({
  reducer: reducers,
  initialState,
    
  })