/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-11 17:24:22
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-11 17:53:41
 */
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { PageHeader, Button, Descriptions } from 'antd';
export default function NewsPreview(props) {
    const params = useParams();
    useEffect(() => {
        console.log(params.id);
    }, []);
    return (
        <div>
            <PageHeader
                onBack={() => window.history.back()}
                title="Title"
                subTitle="This is a subtitle"
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="创建者">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="创建时间">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="发布时间">Lili Qu</Descriptions.Item>

                    <Descriptions.Item label="区域">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="审核状态">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="发布状态">Lili Qu</Descriptions.Item>

                    <Descriptions.Item label="访问数量">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="点赞数量">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="评论数量">Lili Qu</Descriptions.Item>


                </Descriptions>
            </PageHeader>
        </div>
    )
}
