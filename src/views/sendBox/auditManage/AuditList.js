/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-10 12:00:16
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-28 11:00:49
 */
import React, { useEffect, useState } from 'react'
import { notification,  Table, Tag, Button, Modal, Switch } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from "react-router";

const { confirm } = Modal
export default function AuditList() {
  const [dataSource, setdataSource] = useState([])
  const [refresh, setRefresh] = useState(false);
  const { username } = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate();
  useEffect(() => {
     //_ne:!=  lte:<   gte: > [auditState_ne=0]
    axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
      const list = res.data;
      console.log(list);
      setdataSource(list)
    })
  }, [username, refresh])

  const handleCancel = (record) => {
    axios.patch(`/news/${record.id}`, { auditState: 0 }).then(res => {
      setRefresh(record.id)
      notification.info({
        message: '通知',
        description:
          `您可以到草稿箱中查看您的新闻`,
        placement: "bottomRight",
      })
    })
  }
  const handleUpdate = (record) => {
    navigate(`/news-manage/update/${record.id}`)

  }
  const handlePublish = (record) => {
    confirm({
      title: '确定要发布吗？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        axios.patch(`/news/${record.id}`, { publishState: 2, publishTime: Date.now() }).then(res => {
          setRefresh(record.id)
          navigate("/publish-manage/published");
          notification.info({
            message: '通知',
            description:
              `您可以返回到【审核列表】进行新闻操作`,
            placement: "bottomRight",
          })
        })
      },

    });
  }
  const auditList = ["未审核", "审核中", "已通过", "未通过"]
  const colorList = ['cyan', 'gold', 'green', 'red']
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
      title: '审核状态',
      dataIndex: 'auditState',
      render: (text) => {
        return <Tag color={colorList[text]}>{auditList[text]}</Tag>
      }
    },
    {
      title: "操作",
      render: (record) => {
        return (
          <div>
            {record.auditState === 1 ?
              <Button onClick={() => handleCancel(record)}>撤销</Button>
              : record.auditState === 2 ?
                <Button danger onClick={() => handlePublish(record)}>发布</Button>
                : record.auditState === 3 ?
                  <Button type='primary' onClick={() => handleUpdate(record)}>修改</Button> : ''}
          </div>
        )
      }

    }
  ];
  return (
    <div>
        <Table dataSource={dataSource} columns={columns}
          rowKey={(record) => record.id}
          scroll={{ y: 600 }}
          pagination={{
            pageSize: 5,
          }}
        />
    </div>
  )
}
