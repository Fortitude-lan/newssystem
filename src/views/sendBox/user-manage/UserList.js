/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:18:30
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-20 16:01:19
 */

import React, { useState, useEffect } from 'react'
import { Spin, Table, Button, Modal, Switch, Form, Input, Select, Row, Col } from 'antd';
import DragModal from '../../../components/DragModal'
import axios from 'axios';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal
const { Option } = Select;
export default function UserList() {
    const [loading, setloading] = useState(false)
    const [dataSource, setdataSource] = useState([])
    const [regionList, setregionList] = useState([])
    const [roleList, setroleList] = useState([])
    const [isModalVisible, setisModalVisible] = useState(false)
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        setloading(true)
        axios.get('http://localhost:5500/users?_expand=role').then(res => {
            console.log(res.data)
            setdataSource(res.data)
        }).then(setloading(false))
        axios.get('http://localhost:5500/regions').then(res => {
            setregionList(res.data)
        })
        axios.get('http://localhost:5500/roles').then(res => {
            console.log(res.data)
            setroleList(res.data)
        })
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
    const handleOk = () => {
        // axios.patch(`http://localhost:5500/roles/${selectedRoleId}`, { rights: currentRight }).then(setRefresh)
        // handleModalVisible()
        
    }
    //弹框关闭
    const handleModalVisible = () => {
        setisModalVisible(!isModalVisible)
    }
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };
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
                        pageSize: 5,
                    }}
                />
            </Spin>
            <DragModal
                className="modal_h450"
                title="添加用户"
                visible={isModalVisible}
                maskClosable={false}
                onOk={handleOk}
                onCancel={handleModalVisible}
                footer={[
                    <Button key="back" onClick={handleModalVisible}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        确定
                    </Button>
                ]}
            >
                <Form>
                    <Form.Item
                        {...layout}
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: 'Please input...' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        {...layout}
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input...' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        {...layout}
                        label="区域"
                        name="region"
                        rules={[{ required: true, message: 'Please input...' }]}
                    >
                        <Select
                            placeholder="请选择"
                            allowClear
                        >
                            {regionList.map(i =>
                                <Option key={i.id} value={i.value}>{i.title}</Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        {...layout}
                        label="角色"
                        name="roleid"
                        rules={[{ required: true, message: 'Please input...' }]}
                    >
                        <Select
                            placeholder="请选择"
                            allowClear
                        >
                            {roleList.map(item =>
                                <Option key={item.id} value={item.roleName}>{item.roleName}</Option>
                            )}
                        </Select>
                    </Form.Item>
                </Form>
            </DragModal>
        </div>
    )
}
