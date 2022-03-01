/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-23 11:28:49
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-28 17:46:35
 */
import { createStore, combineReducers } from 'redux'
import { CollapsedReduxer } from './reducer/CollapsedReduxer'
import { LoadingReduxer } from './reducer/LoadingReduxer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
    key: 'kerwin',
    storage,
}
const reducer = combineReducers({
    CollapsedReduxer,
    LoadingReduxer
})
const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer)
let persistor = persistStore(store)
export { store, persistor }