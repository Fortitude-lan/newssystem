/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2021-12-24 15:17:40
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-10 11:33:33
 */
import React from 'react'
import SideMenu from '../../components/sendBox/SideMenu'
import TopHeader from '../../components/sendBox/TopHeader'
import RouterList from '../../components/sendBox/RouterList';

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
                        // overflow: 'auto'
                    }}
                >
                    <RouterList/>
                </Content>
            </Layout>
        </Layout>
    )
}
