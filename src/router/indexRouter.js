/*
 * @Description: 路由
 * @Author: wanghexing
 * @Date: 2021-12-24 15:02:47
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-03-28 20:52:05
 */
import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom' //HashRouter|# BrowserRouter|无#
import Login from '../views/login/Login'
import Detail from '../views/news/Detail'
import News from '../views/news/News'
import NewSendBox from '../views/sendBox/NewSendBox'

export default function IndexRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/news' element={<News />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/*'
                    element={
                        localStorage.getItem('token') ? <NewSendBox /> : <Navigate to="/login" />  //重定向
                    }
                />
            </Routes>
        </HashRouter>
    )
}
