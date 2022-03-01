/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2021-12-24 10:47:46
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-28 17:45:57
 */
import IndexRouter from './router/indexRouter'
import './App.css';
import { Provider } from 'react-redux'
import {store} from './redux/store';
function App() { 
  return <Provider store={store}><IndexRouter /></Provider>

}
export default App
