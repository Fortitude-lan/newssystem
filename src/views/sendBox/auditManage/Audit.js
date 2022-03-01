/*
 * @Description:     
 * @Author: wanghexing
 * @Date: 2022-02-10 12:00:00
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-28 10:59:41
 */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { notification,  Table, Button, Modal, } from 'antd';
import { useNavigate } from "react-router";
export default function Audit() {
  const [dataSource, setdataSource] = useState([])
  const [refresh, setRefresh] = useState(false);
  const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/news?auditState=1&_expand=category`).then(res => {
      const list = res.data
      console.log(list);
      setdataSource(roleId === 1 ? list : [...list.filter(i => i.author == username), ...list.filter(i => i.region == region && roleId === 3)])
    })
  }, [roleId, region, username,refresh])
  const isPass = (record, auditState, publishState) => {
    axios.patch(`/news/${record.id}`, {
      auditState,
      publishState
    }).then(res => {
      setRefresh(record.id)
      notification.info({
        message: '通知',
        description:
          `您可以到[审核列表]中查看您的新闻`,
        placement: "bottomRight",
      })
    })
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
              type="primary"
              onClick={() => isPass(record, 2, 1)}
            >通过</Button>
            <Button
              danger
              // shape="circle"
              // icon={<EditOutlined />}
              onClick={() => isPass(record, 3, 0)}
            >驳回</Button>
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
