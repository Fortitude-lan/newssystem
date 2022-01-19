/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:19:08
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-19 16:18:11
 */
import React, { useState, useEffect } from 'react'
import { Spin, Table, Button, Modal,Tree } from 'antd';
import axios from 'axios';
import { DeleteOutlined, UnorderedListOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal

export default function RoleList() {
    const [loading, setloading] = useState(false)
    const [dataSource, setdataSource] = useState([])
    const [rightList, setrightList] = useState([])
    const [refresh, setRefresh] = useState(false);
    const [isModalVisible, setisModalVisible] = useState(false)

    useEffect(() => {
        setloading(true)
        axios.get('http://localhost:5500/roles').then(res => {
            console.log(res.data)
            setdataSource(res.data)
            setloading(false)
        })
    }, [refresh])

    useEffect(() => {
        setloading(true)
        axios.get('http://localhost:5500/rights?_embed=children').then(res => {
            console.log(res.data)
            setrightList(res.data)
            setloading(false)
        })
    }, [refresh])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (text) => {
                return <span className="bold">{text}</span>
            }
        },
        {
            title: '角色名',
            dataIndex: 'roleName',
        },
        {
            title: "操作",
            render: (record) => {
                return (
                    <div>
                        <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(record)} />
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<UnorderedListOutlined />}
                            onClick={handleModalVisible}
                        />
                    </div>
                )
            }

        }
    ];

    //权限删除
    const confirmMethod = (record) => {
        console.log(record)
        confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            // content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消',
            onOk() { deleteMethod(record) },

        });
    }
    const deleteMethod = (record) => {
        axios.delete(`http://localhost:5500/roles/${record.id}`).then((setRefresh))
    }
    const handleOk = () => {
        console.log('ok')
        handleModalVisible()
    }
    const handleModalVisible = () => {
        setisModalVisible(!isModalVisible)
    }
    return (
        <div>
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

            <Modal title="权限配置" visible={isModalVisible} onOk={handleOk} onCancel={handleModalVisible}>
                <Spin spinning={loading}>
                    <Tree
                        checkable
                        treeData={rightList}
                    />
                </Spin>
            </Modal>
        </div>
    )
}
