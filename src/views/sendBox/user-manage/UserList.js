/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:18:30
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-10 11:22:37
 */

import React, { useState, useEffect, useRef } from 'react'
import { Spin, Table, Button, Modal, Switch } from 'antd';
import DragModal from '../../../components/DragModal'
import axios from 'axios';
import Useform from './Useform';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal

export default function UserList() {
    const addForm = useRef(null)
    const updateForm = useRef(null)
    const [loading, setloading] = useState(false)
    const [dataSource, setdataSource] = useState([])
    const [regionList, setregionList] = useState([])
    const [roleList, setroleList] = useState([])
    const [addModalVisible, setaddModalVisible] = useState(false)
    const [updateModalVisible, setupdateModalVisible] = useState(false);
    const [selectedRow, setselectedRow] = useState({});
    const [refresh, setRefresh] = useState(false);

    const { roleId, region } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        setloading(true)
        //用户列表
        axios.get('http://localhost:5500/users?_expand=role').then(res => {
            const list = res.data
            setdataSource(roleId === 1 ? list : list.filter(i => i.region == region))
        }).then(setloading(false))
        //地区列表
        axios.get('http://localhost:5500/regions').then(res => {
            const list = res.data
            console.log(list);
            setregionList(roleId === 1 ? list : list.filter(i => i.value == region))
        }).then(setloading(false))
        //角色列表
        axios.get('http://localhost:5500/roles').then(res => {
            const list = res.data
            setroleList(roleId === 1 ? list : list.filter(i => i.roleType > roleId))
        }).then(setloading(false))
    }, [refresh])
    //删除确认
    const confirmMethod = (record) => {
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
            filters: [
                {
                    text: '全球',
                    value: '全球'
                },
                ...regionList.map(i => ({
                    text: i.title,
                    value: i.value
                }))
            ],
            // filterSearch: true,
            onFilter: (value, record) => value == '全球' ? record.region === '' : record.region.includes(value),
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
                            onClick={() => updateModal(record)}
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
    const addformOK = () => {
        addForm.current.validateFields().then(value => {
            addModal()
            let params = {
                ...value,
                roleState: true,
                default: false
            }
            axios.post(`http://localhost:5500/users`, { ...params }).then(setRefresh)

        }).catch(err => { console.log(err) })
    }
    //弹框关闭
    const addModal = () => {
        setaddModalVisible(!addModalVisible)
    }
    //修改
    const updateModal = (record) => {
        setselectedRow(record)
        updateVisible()
    }
    const updateVisible = () => {
        setupdateModalVisible(!updateModalVisible)
    }
    //修改确认
    const updateFormOK = () => {
        updateForm.current.validateFields().then(value => {
            updateVisible()
            axios.patch(`http://localhost:5500/users/${selectedRow.id}`, value).then(setRefresh)
        })
    }
    return (
        <div>
            <Button type="primary" onClick={addModal}>添加用户</Button>
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
                visible={addModalVisible}
                maskClosable={false}
                onCancel={addModal}
                footer={[
                    <Button key="back" onClick={addModal}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={addformOK}>
                        确定
                    </Button>
                ]}
            >
                <Useform ref={addForm} regionList={regionList} roleList={roleList} />
            </DragModal>
            <DragModal
                className="modal_h450"
                title="编辑用户"
                visible={updateModalVisible}
                maskClosable={false}
                onCancel={updateVisible}
                footer={[
                    <Button key="back" onClick={updateVisible}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={updateFormOK}>
                        保存
                    </Button>
                ]}
            >
                <Useform ref={updateForm} regionList={regionList} roleList={roleList} selectedRow={selectedRow} />
            </DragModal>
        </div>
    )
}
