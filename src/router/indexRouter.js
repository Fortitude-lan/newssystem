/*
 * @Description: 路由
 * @Author: wanghexing
 * @Date: 2021-12-24 15:02:47
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-14 09:25:55
 */
import React from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom' //HashRouter|# BrowserRouter|无#
import Login from '../views/login/Login'
import NewSendBox from '../views/sendBox/NewSendBox'

export default function IndexRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/*'
                    element={
                        localStorage.getItem('token') ? <NewSendBox /> : <Navigate to="/login" />//重定向
                    }
                />
            </Routes>
        </HashRouter>
    )
}
