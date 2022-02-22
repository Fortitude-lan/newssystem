/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-11 17:24:22
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-14 10:03:40
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PageHeader, Button, Descriptions, Divider } from 'antd';
import axios from "axios";
import moment from 'moment'

export default function NewsPreview(props) {
    const params = useParams();
    const [newsInfo, setnewsInfo] = useState(null)
    useEffect(() => {
        // console.log(params.id);
        axios.get(`/news/${params.id}?_expand=category&_expand=role`).then(res => setnewsInfo(res.data))
    }, [params.id]);

    const auditList = ["未审核", "审核中", "已通过", "未通过"]
    const publishList = ["未发布", "待发布", "已上线", "已下线"]
    const colorList = ['red', '#FAAD14', '#23D688', 'red']
    return (
        <>
            {newsInfo &&
                <div>
                    <PageHeader
                        onBack={() => window.history.back()}
                        title={newsInfo.title}
                        subTitle={newsInfo.category.title}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                            <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format('YYYY-MM-DD hh:mm:ss')}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">{newsInfo.publishTime ? moment(newsInfo.publishTime).format('YYYY-MM-DD hh:mm:ss') : '-'}</Descriptions.Item>

                            <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                            <Descriptions.Item label="审核状态" ><span style={{ color: colorList[newsInfo.auditState] }}> {auditList[newsInfo.auditState]}</span></Descriptions.Item>
                            <Descriptions.Item label="发布状态" ><span style={{ color: colorList[newsInfo.publishState] }}>{publishList[newsInfo.publishState]}</span></Descriptions.Item>

                            <Descriptions.Item label="访问数量">{newsInfo.view}</Descriptions.Item>
                            <Descriptions.Item label="点赞数量">{newsInfo.star}</Descriptions.Item>
                            <Descriptions.Item label="评论数量">0</Descriptions.Item>


                        </Descriptions>
                        <div dangerouslySetInnerHTML={{__html:newsInfo.content}} className="news_content">
                        </div>
                    </PageHeader>
                </div>
            }
        </>
    )
}
