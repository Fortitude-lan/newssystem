/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:05:43
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-03-25 17:05:10
 */
import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux'
const { Header } = Layout;

function TopHeader(props) {
    // console.log(props);
    // const [collapsed, setCollapsed] = useState(false);
    const changeCollapsed = () => {
        // setCollapsed(!collapsed)
        props.changeCollapsed()
    }
    let navigate = useNavigate();
    const { role: { roleName }, username } = JSON.parse(localStorage.getItem('token'))
    const menu = (
        <Menu>
            <Menu.Item>
                {roleName}
            </Menu.Item>
            {/* <Menu.Item>
               修改密码
            </Menu.Item> */}
            <Menu.Item danger onClick={() => { localStorage.removeItem('token'); navigate("/login"); }}>退出</Menu.Item>
        </Menu>
    );
    return (
        <Header className="site-layout-background" style={{ padding: "0 16px" }}>
            {/* {
                collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
            } */}
            {props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />}
            <div style={{ float: "right" }}>
                欢迎 <span style={{ color: "#1890ff" }}>{username}</span> 回来！
                <Dropdown overlay={menu}>
                    <span><Avatar size={35} icon={<UserOutlined />} /></span>
                </Dropdown>
            </div>

        </Header>
    )
}
const mapStateToProps = ({ CollapsedReduxer: { isCollapsed } }) => ({ isCollapsed })
const mapDispatchToProps = {
    changeCollapsed() {
        return {
            type: "change_collapsed"
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)