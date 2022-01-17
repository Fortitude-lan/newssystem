/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:05:33
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-17 17:36:51
 */
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router";
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    HomeOutlined,
    SettingOutlined,
    UnorderedListOutlined,
    TeamOutlined,
    SnippetsOutlined
} from '@ant-design/icons';
import './index.css'
import axios from 'axios';
const { Sider } = Layout;

const { SubMenu } = Menu;
const MenuItem = Menu.Item
// const menuList = [
//     {
//         key: '/home',
//         title: '首页',
//         icon: <UserOutlined />
//     },
//     {
//         key: '/user-manage',
//         title: '用户管理',
//         icon: <UserOutlined />,
//         children: [
//             {
//                 key: '/user-manage/list',
//                 title: '用户列表',
//                 icon: <UserOutlined />
//             },
//         ],
//     },
//     {
//         key: '/right-manage',
//         title: '权限管理',
//         icon: <UserOutlined />,
//         children: [
//             {
//                 key: '/right-manage/role/list',
//                 title: '角色列表',
//                 icon: <UserOutlined />
//             },
//             {
//                 key: '/right-manage/right/list',
//                 title: '权限列表',
//                 icon: <UserOutlined />
//             },
//         ],
//     }
// ]
const iconList = {
    "/home": <HomeOutlined />,
    "/user-manage": <UserOutlined />,
    "/user-manage/list": <UserOutlined />,
    "/right-manage": <SettingOutlined />,
    "/right-manage/role/list": <UnorderedListOutlined />,
    "/right-manage/right/list": <SnippetsOutlined />,
    "/news-manage": <SettingOutlined />,
    "/audit-manage": <SettingOutlined />,
    "/publish-manage": <SettingOutlined />,
}

export default function SideMenu() {
    let navigate = useNavigate();
    let location = useLocation();
    const selectKeys = [location.pathname]; // ex: ['/home']
    const openKeys = ["/" + location.pathname.split("/")[1]];//ex: ["","home"] 

    const [menu, setMenu] = useState([])
    useEffect(() => {
        //拿到接口数据
        axios.get("http://localhost:8000/rights?_embed=children").then(res => {
            console.log(res.data);
            setMenu(res.data)
        })
    }, [])

    //是否有权限
    const hasPermisson = (item) => {
        return item.pagepermisson === 1
    }

    const renderMenu = (menu) => {
        return menu.map(item => {
            if (item.children?.length > 0 && hasPermisson(item)) {
                return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
                    {renderMenu(item.children)}
                </SubMenu>
            }
            return hasPermisson(item) && <MenuItem key={item.key} icon={iconList[item.key]} onClick={() => {
                navigate(item.key)
            }}>{item.title}</MenuItem>
        })


    }
    return (
        <Sider trigger={null} collapsible>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div className="logo">全球新闻发布管理系统</div>
                <div style={{ overflow: "auto" }}>
                    {/* defaultSelectedKeys非受控,当路径为http://3000的时候没有高亮，所以改成selectedKeys */}
                    <Menu theme="dark" mode="inline" selectedKeys={selectKeys} defaultOpenKeys={openKeys}>
                        {renderMenu(menu)}
                    </Menu>
                </div>

            </div>

        </Sider>
    )
}

