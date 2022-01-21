/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:18:30
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-21 16:40:33
 */

import React, { useState, useEffect, useRef } from 'react'
import { Spin, Table, Button, Modal, Switch } from 'antd';
import DragModal from '../../../components/DragModal'
import axios from 'axios';
import Useform from './Useform';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal

export default function UserList() {
    const useform = useRef(null)
    const [loading, setloading] = useState(false)
    const [dataSource, setdataSource] = useState([])
    const [regionList, setregionList] = useState([])
    const [roleList, setroleList] = useState([])
    const [isModalVisible, setisModalVisible] = useState(false)
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        setloading(true)
        axios.get('http://localhost:5500/users?_expand=role').then(res => {
            setdataSource(res.data)
        }).then(setloading(false))
        axios.get('http://localhost:5500/regions').then(res => {
            setregionList(res.data)
        }).then(setloading(false))
        axios.get('http://localhost:5500/roles').then(res => {
            setroleList(res.data)
        }).then(setloading(false))
    }, [refresh])
    //删除确认
    const confirmMethod = (record) => {
        console.log(record)
        confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            // content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                axios.delete(`http://localhost:5500/users/${record.id}`).then((setRefresh))
            },

        });
    }
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            render: (text) => {
                return <span className="bold">{text == '' ? '全球' : text}</span>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (record) => {
                return record?.roleName
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (text, record) => {
                return (
                    <Switch
                        checked={text}
                        disabled={record.default}
                        onChange={() => switchMethod(record)}
                    />

                )
            }
        },
        {
            title: "操作",
            render: (record) => {
                return (
                    <div>
                        <Button
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => confirmMethod(record)}
                            disabled={record.default}
                        />
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => { }}
                            disabled={record.default}
                        />
                    </div>
                )
            }

        }
    ];
    //权限开关
    const switchMethod = (record) => {
        //更新列表
        record.roleState = !record.roleState
        setdataSource([...dataSource])
        axios.patch(`http://localhost:5500/users/${record.id}`, {
            roleState: record.roleState
        })

    }
    //弹框确认
    const addFormOK = () => {
        useform.current.validateFields().then(value => {
            handleModalVisible()
            let params = {
                ...value,
                roleState: true,
                default: false
            }
            axios.post(`http://localhost:5500/users`, { ...params }).then(setRefresh)

        }).catch(err => { console.log(err) })
    }
    //弹框关闭
    const handleModalVisible = () => {
        setisModalVisible(!isModalVisible)
    }

    return (
        <div>
            <Button type="primary" onClick={handleModalVisible}>添加用户</Button>
            <Spin spinning={loading}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    rowKey={(record) => record.id}
                    scroll={{ y: 600 }}
                    pagination={{
                        pageSize: 10,
                    }}
                />
            </Spin>
            <DragModal
                className="modal_h450"
                title="添加用户"
                visible={isModalVisible}
                maskClosable={false}
                onCancel={handleModalVisible}
                footer={[
                    <Button key="back" onClick={handleModalVisible}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={addFormOK}>
                        确定
                    </Button>
                ]}
            >
                <Useform ref={useform} regionList={regionList} roleList={roleList} />
            </DragModal>
        </div>
    )
}
