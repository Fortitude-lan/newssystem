/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-23 11:28:49
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-23 14:02:03
 */
import { createStore, combineReducers } from 'redux'
import { CollapsedReduxer } from './reducer/CollapsedReduxer'
const reduxer = combineReducers({
    CollapsedReduxer
})

const store = createStore(reduxer)
export default store