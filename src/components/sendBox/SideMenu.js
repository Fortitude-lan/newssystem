/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:05:33
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-14 17:57:51
 */
import React, { useEffect } from 'react'
import { useNavigate } from "react-router";
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
} from '@ant-design/icons';
import './index.css'
import axios from 'axios';
const { Sider } = Layout;
const { SubMenu } = Menu;
const MenuItem = Menu.Item
const menuList = [
    {
        key: '/home',
        title: '首页',
        icon: <UserOutlined />
    },
    {
        key: '/user-manage',
        title: '用户管理',
        icon: <UserOutlined />,
        children: [
            {
                key: '/user-manage/list',
                title: '用户列表',
                icon: <UserOutlined />
            },
        ],
    },
    {
        key: '/right-manage',
        title: '权限管理',
        icon: <UserOutlined />,
        children: [
            {
                key: '/right-manage/role/list',
                title: '角色列表',
                icon: <UserOutlined />
            },
            {
                key: '/right-manage/right/list',
                title: '权限列表',
                icon: <UserOutlined />
            },
        ],
    }
]

export default function SideMenu() {
    useEffect(() => {
        axios.get("http://localhost:8000/rights?_embed=children").then(res=>{console.log(res.data);})
    },[])

    let navigate = useNavigate();
    const renderMenu = (menuList) => {
        return menuList.map(item => {
            if (item.children) {
                return <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    {renderMenu(item.children)}
                </SubMenu>
            }
            return <MenuItem key={item.key} icon={item.icon} onClick={() => {
                navigate(item.key)
            }}>{item.title}</MenuItem>
        })


    }
    return (
        <Sider trigger={null} collapsible>
            <div className="logo">全球新闻发布管理系统</div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                {renderMenu(menuList)}
            </Menu>
        </Sider>
    )
}

