/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-11 17:24:22
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-03-28 23:59:21
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PageHeader, Button, Descriptions, Divider } from 'antd';
import axios from "axios";
import moment from 'moment'
import { HeartTwoTone } from '@ant-design/icons';
export default function Detail(props) {
    const params = useParams();
    const [newsInfo, setnewsInfo] = useState(null)
    useEffect(() => {
        axios.get(`/news/${params.id}?_expand=category&_expand=role`).then(res => setnewsInfo(res.data))
    }, [params.id]);

    return (
        <>
            {newsInfo &&
                <div>
                    <PageHeader
                        onBack={() => window.history.back()}
                        title={newsInfo.title}
                        subTitle={
                            <div>
                                {newsInfo.category.title}
                                <HeartTwoTone twoToneColor="#eb2f96" />
                            </div>
                        }
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">{newsInfo.publishTime ? moment(newsInfo.publishTime).format('YYYY-MM-DD hh:mm:ss') : '-'}</Descriptions.Item>
                            <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                            <Descriptions.Item label="访问数量">{newsInfo.view}</Descriptions.Item>
                            <Descriptions.Item label="点赞数量">{newsInfo.star}</Descriptions.Item>
                            <Descriptions.Item label="评论数量">0</Descriptions.Item>


                        </Descriptions>
                        <div dangerouslySetInnerHTML={{ __html: newsInfo.content }} className="news_content">
                        </div>
                    </PageHeader>
                </div>
            }
        </>
    )
}
