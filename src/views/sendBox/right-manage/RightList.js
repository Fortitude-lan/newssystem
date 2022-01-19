/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:19:21
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-19 16:14:06
 */
import React, { useEffect, useState } from 'react'
import { Spin, Table, Tag, Button, Modal, Popover, Switch } from 'antd';
import axios from 'axios';
import {  EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal

export default function RightList() {
    const [dataSource, setdataSource] = useState([])
    const [loading, setloading] = useState(false)
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        setloading(true)
        axios.get('http://localhost:5500/rights?_embed=children').then(res => {
            const list = res.data;
            setdataSource(mapList(list))
            setloading(false)
        })
    }, [refresh])

    //遍历循环权限列表，没有子节点的不需要展开
    const mapList = (list) => {
        list.map(item => {
            if (item.children) {
                if (item.children.length == 0) {
                    item.children = ''
                } else {
                    mapList(item.children)
                }
            }
        })
        return list
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (text) => {
                return <span className="bold">{text}</span>
            }
        },
        {
            title: '权限名',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',//有dataIndex参数render默认值，没有默认该行对象
            render: (text) => {
                return <Tag color="gold">{text}</Tag>
            }
        },
        {
            title: "配置项",
            render: (record) => {
                return (
                    <>
                        {record.pagepermisson != undefined ?
                            <Switch
                                checked={record.pagepermisson}
                                disabled={record.pagepermisson == undefined}
                                onChange={() => switchMethod(record)}
                            />
                            : '无'
                        }
                    </>
                )
            }
        },
        {
            title: "操作",
            render: (record) => {
                return (
                    <div>
                        <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(record)} />
                        {/* <Popover
                            title="配置项"
                            trigger={record.pagepermisson == undefined ? '' : "click"}
                            content={
                                <div style={{ textAlign: "center" }}>
                                    <Switch checked={record.pagepermisson} checkedChildren="开启" unCheckedChildren="关闭"></Switch>
                                </div>
                            }
                        >
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<EditOutlined />}
                                disabled={record.pagepermisson == undefined}
                            />
                        </Popover> */}
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
        //目前权限列表值有两层 1 rights 2 children
        if (record.grade === 1) {
            // setdataSource(dataSource.filter(data => data.id !== record.id));
            axios.delete(`http://localhost:5500/rights/${record.id}`).then((setRefresh))

        } else {
            axios.delete(`http://localhost:5500/children/${record.id}`).then(setRefresh)
        }

    }

    //权限开关
    const switchMethod = (record) => {
        record.pagepermisson = Number(!record.pagepermisson)
        setdataSource([...dataSource])
        if (record.grade === 1) {
            axios.patch(`http://localhost:5500/rights/${record.id}`, {
                pagepermisson: record.pagepermisson
            })
        } else {
            axios.patch(`http://localhost:5500/children/${record.id}`, {
                pagepermisson: record.pagepermisson
            })
        }
    }
  
    return (

        <div>
            <Spin spinning={loading}>
                <Table dataSource={dataSource} columns={columns}
                    scroll={{ y: 600 }}
                    pagination={{
                        pageSize: 5,
                    }}
                />
            </Spin>

        </div>
    )
}
