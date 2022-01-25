/*
 * @Description: 路由
 * @Author: wanghexing
 * @Date: 2021-12-24 15:02:47
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-25 12:25:13
 */
import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom' //HashRouter|# BrowserRouter|无#
import Login from '../views/login/Login'
import NewSendBox from '../views/sendBox/NewSendBox'

export default function IndexRouter() {
    console.log(localStorage.getItem('token'));
    return (
        <HashRouter>
            <Routes>
                <Route path='/*'
                    element={
                        localStorage.getItem('token') ? <NewSendBox /> : <Navigate to="/login" />  //重定向
                    }
                />
                <Route path='/login' element={<Login />} />
            </Routes>
        </HashRouter>
    )
}
