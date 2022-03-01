/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:19:08
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-28 11:00:23
 */
import React, { useState, useEffect } from 'react'
import {Table, Button, Modal, Tree } from 'antd';
import DragModal from '../../../components/DragModal'
import axios from 'axios';
import { DeleteOutlined, UnorderedListOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal

export default function RoleList() {
    const [dataSource, setdataSource] = useState([])
    const [rightList, setrightList] = useState([])
    const [refresh, setRefresh] = useState(false);
    const [isModalVisible, setisModalVisible] = useState(false)
    const [selectedRoleId, setselectedRoleId] = useState(0)
    const [currentRight, setcurrentRight] = useState([])

    useEffect(() => {
        axios.get('/roles').then(res => {
            setdataSource(res.data)
        })
        axios.get('/rights?_embed=children').then(res => {
            // console.log(res.data)
            setrightList(res.data)
          
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
                            onClick={() => {
                                handleModalVisible();
                                setcurrentRight(record.rights)
                                setselectedRoleId(record.id)
                            }}
                        />
                    </div>
                )
            }

        }
    ];

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
                axios.delete(`/roles/${record.id}`).then((setRefresh))
             },

        });
    }
    //弹框确认
    const handleOk = () => {
        axios.patch(`/roles/${selectedRoleId}`, { rights: currentRight }).then(setRefresh)
        handleModalVisible()
    }
    //弹框关闭
    const handleModalVisible = () => {
        setisModalVisible(!isModalVisible)
    }
    return (
        <div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    rowKey={(record) => record.id}
                    scroll={{ y: 600 }}
                    pagination={{
                        pageSize: 5,
                    }}
                />

            <DragModal
                className="modal_h450"
                title="权限配置"
                visible={isModalVisible}
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
                    <Tree
                        checkable
                        checkStrictly
                        treeData={rightList}
                        defaultCheckedKeys={currentRight} //非受控属性用useState控制
                        onCheck={(checkedKeys)=>{setcurrentRight(checkedKeys.checked)}}
                    />
            </DragModal>
        </div>
    )
}
