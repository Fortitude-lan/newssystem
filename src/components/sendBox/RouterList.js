/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-10 11:33:11
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-11 17:39:56
 */
import React, { useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../../views/sendBox/home/Home'
import NewsAdd from '../../views/sendBox/newsManage/NewsAdd'
import NewsDraft from '../../views/sendBox/newsManage/NewsDraft'
import NewsCategory from '../../views/sendBox/newsManage/NewsCategory'
import NewsPreview from '../../views/sendBox/newsManage/NewsPreview'
import NoPermission from '../../views/sendBox/noPermission/NoPermission'
import RightList from '../../views/sendBox/right-manage/RightList'
import RoleList from '../../views/sendBox/right-manage/RoleList'
import UserList from '../../views/sendBox/user-manage/UserList'
import Audit from '../../views/sendBox/auditManage/Audit'
import AuditList from '../../views/sendBox/auditManage/AuditList'
import Unpublished from '../../views/sendBox/publishManage/Unpublished'
import Published from '../../views/sendBox/publishManage/Published'
import Sunset from '../../views/sendBox/publishManage/Sunset'
import axios from 'axios';
const LocalRouterMap = {
    "/home": <Home />,
    "/user-manage/list": <UserList />,
    "/right-manage/role/list": <RoleList />,
    "/right-manage/right/list": <RightList />,
    "/news-manage/add": <NewsAdd />,
    "/news-manage/draft": <NewsDraft />,
    "/news-manage/category": <NewsCategory />,
    "/news-manage/preview/:id": <NewsPreview />,
    "/audit-manage/audit": <Audit />,
    "/audit-manage/list": <AuditList />,
    "/publish-manage/unpublished": <Unpublished />,
    "/publish-manage/published": <Published />,
    "/publish-manage/sunset": <Sunset />,

}
export default function RouterList() {
    const [backRouteList, setbackRouteList] = useState([])
    useEffect(() => {
        Promise.all([
            axios.get('/rights'),
            axios.get('/children'),
        ]).then(res => {
            setbackRouteList([...res[0].data, ...res[1].data]);
        })
    }, [])
    //获取当前用户权限列表
    const { role: { rights } } = JSON.parse(localStorage.getItem('token'))
    //路由筛选
    const checkRoute = (item) => {
        // console.log(item);
        return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
    }
    //权限筛选
    const checkUserPermission = (item) => {
        return rights.includes(item.key)
    }
    return (
        // <Routes>
        //     <Route path="/home" element={<Home />} />
        //     <Route path="/user-manage/list" element={<UserList />} />
        //     <Route path="/right-manage/role/list" element={<RoleList />} />
        //     <Route path="/right-manage/right/list" element={<RightList />} />
        //     <Route path="/" element={<Navigate replace from="/" to="home" />} />
        //     <Route path="*" element={<NoPermission />} />
        // </Routes>
        <Routes>
            {backRouteList.map((item) => {
                if (checkRoute(item) && checkUserPermission(item)) {
                    return <Route
                        path={item.key}
                        key={item.key}
                        element={LocalRouterMap[item.key]}
                    />
                }
                return null
            })}
            <Route path="/" element={<Navigate replace from="/" to="/home" />} />
            {backRouteList.length > 0 && <Route path="*" element={<NoPermission />} />}
        </Routes>
    )
}
