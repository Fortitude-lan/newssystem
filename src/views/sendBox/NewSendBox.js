/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2021-12-24 15:17:40
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-14 10:58:59
 */
import React from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import SideMenu from '../../components/sendBox/SideMenu'
import TopHeader from '../../components/sendBox/TopHeader'
import Home from './home/Home'
import NoPermission from './noPermission/NoPermission'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'
//css
import './NewSendBox.css'
//antd
import { Layout } from 'antd';
const { Content } = Layout;

export default function NewSendBox() {
    return (
        <Layout>
            <SideMenu />
            <Layout className="site-layout">
                <TopHeader />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/user-manage/list" element={<UserList />} />
                        <Route path="/right-manage/role/list" element={<RoleList />} />
                        <Route path="/right-manage/right/list" element={<RightList />} />

                        <Route path="/" element={<Navigate replace from="/" to="home" />} />

                        <Route path="*" element={<NoPermission />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}
