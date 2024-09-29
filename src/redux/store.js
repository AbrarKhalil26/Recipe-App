import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import profileReducer from './slice/profileSlice'
import globalReducer from './slice/globalSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    global: globalReducer,
})
const store = configureStore({
    reducer: rootReducer,
})

export default store;