/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-22 15:22:04
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-22 16:25:27
 */

import { useEffect, useState } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { notification, Modal } from 'antd';
const { confirm } = Modal
function usePublish(type) {
    const { username } = JSON.parse(localStorage.getItem('token'))
    const [dataSource, setdataSource] = useState([])
    const [Refresh, setRefresh] = useState(false)
    useEffect(() => {
        //_ne:!=  lte:<   gte: > [auditState_ne=0]
        axios.get(`/news?author=${username}&publishState=${type}&_expand=category`).then(res => {
            setdataSource(res.data)
        })
    }, [username, type, Refresh])
    const handlePublish = (id) => {
        // console.log(id);
        confirm({
            title: '确定要发布吗？',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                axios.patch(`/news/${id}`, { publishState: 2, publishTime: Date.now() }).then(res => {
                    setRefresh(id)
                    notification.info({
                        message: '通知',
                        description:
                            `您可以返回到【已经发布】进行新闻操作`,
                        placement: "bottomRight",
                    })
                })
            },

        });
    }
    const handleCancel = (id) => {
        axios.patch(`/news/${id}`, { publishState: 3 }).then(res => {
            setRefresh(id)
            notification.info({
                message: '通知',
                description:
                    `您可以到【已下线】中查看您的新闻`,
                placement: "bottomRight",
            })
        })
    }
    const handleDalete = (id) => {
        axios.delete(`/news/${id}`, { publishState: 3 }).then(res => {
            setRefresh(id)
            notification.info({
                message: '通知',
                description:
                    `您已删除该新闻`,
                placement: "bottomRight",
            })

        })
    }
    return { dataSource, handlePublish, handleCancel, handleDalete }
}

export default usePublish