/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-10 12:00:16
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-22 16:26:02
 */
import React from 'react'
import { Table } from 'antd';
export default function PublishType(props) {

    const columns = [
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
                return <div>{props.button(record.id)}</div>

            }

        }
    ];
    return (
        <div>
            <Table dataSource={props.dataSource}
                columns={columns}
                rowKey={(record) => record.id}
                scroll={{ y: 600 }}
                pagination={{
                    pageSize: 10,
                }}
            />
        </div>
    )
}
