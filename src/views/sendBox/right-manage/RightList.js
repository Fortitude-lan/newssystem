/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:19:21
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-18 11:49:08
 */
import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal } from 'antd';
import axios from 'axios';
import { SearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal

export default function RightList() {
    const [dataSource, setdataSource] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/rights?_embed=children').then(res => {
            const list = res.data;
            //没有子节点的不需要展开
            list.map(item => {
                if (item.children.length == 0) {
                    item.children = ''
                }
            })
            setdataSource(list)
        })
    }, [])
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
            title: "操作",
            render: (record) => {
                return (
                    <div>
                        <Button type="primary" shape="circle" icon={<EditOutlined />}  />
                        <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => deleteMethod(record)}/>
                    </div>
                )
            }

        }
    ];

    const deleteMethod = (record) => {
        console.log(record)
        confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            // content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消',
        });
    }
    return (

        <div>
            <Table dataSource={dataSource} columns={columns}
                scroll={{ y: 500 }}
                pagination={{
                    pageSize: 5,
                }}
            />
        </div>
    )
}
