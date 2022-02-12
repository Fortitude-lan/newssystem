/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-10 11:58:18
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-12 15:45:21
 */
import React, { useEffect, useState } from 'react'
import { Spin, Table, Tag, Button, Modal, Switch } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from "react-router";

const { confirm } = Modal

export default function NewsDraft() {
  const [dataSource, setdataSource] = useState([])
  const [loading, setloading] = useState(false)
  const [refresh, setRefresh] = useState(false);
  const { username } = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate();
  useEffect(() => {
    setloading(true)
    axios.get(`/news?author=${username}&auditState=0&_expand=category`).then(res => {
      const list = res.data;
      setdataSource(list)
      setloading(false)
    })
  }, [username, refresh])
  //删除确认
  const confirmMethod = (record) => {
    confirm({
      title: '确定要删除吗？',
      icon: <ExclamationCircleOutlined />,
      // content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        axios.delete(`/news/${record.id}`).then((setRefresh))
      },

    });
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
      title: '新闻标题',
      dataIndex: 'title',
      render: (text, record) => {
        return <a href={`#/news-manage/preview/${record.id}`} >{text}</a>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (record) => {
        return record.title
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
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/news-manage/update/${record.id}`)}
              disabled={record.default}
            />
            <Button
              type="primary"
              shape="circle"
              // icon={<EditOutlined />}
              onClick={() => updateModal(record)}
              disabled={record.default}
            >审</Button>
          </div>
        )
      }

    }
  ];
  return (
    <div>
      <Spin spinning={loading}>
        <Table dataSource={dataSource} columns={columns}
          rowKey={(record) => record.id}
          scroll={{ y: 600 }}
          pagination={{
            pageSize: 5,
          }}
        />
      </Spin>
    </div>
  )
}
