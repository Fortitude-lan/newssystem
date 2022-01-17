/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:05:43
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-14 13:56:05
 */
import React, { useState } from 'react'
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
const { Header } = Layout;
export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false);
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }

    const menu = (
        <Menu>
            <Menu.Item>
                超级管理员
            </Menu.Item>
            {/* <Menu.Item>
                1st menu item
            </Menu.Item> */}
            <Menu.Item danger>退出</Menu.Item>
        </Menu>
    );
    return (
        <Header className="site-layout-background" style={{ padding: "0 16px" }}>
            {
                collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
            }
            <div style={{ float: "right" }}>
                欢迎admin回来！
                <Dropdown overlay={menu}>
                    <span><Avatar size={35} icon={<UserOutlined />} /></span>
                </Dropdown>
            </div>

        </Header>
    )
}

