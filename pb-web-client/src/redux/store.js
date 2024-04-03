import { configureStore, combineReducers} from '@reduxjs/toolkit';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
})

const store = configureStore({
  reducers,
  initialState,
    
  })