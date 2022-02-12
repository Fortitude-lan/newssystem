/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-10 11:57:55
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-12 16:52:32
 */
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router";
import { notification, PageHeader, Steps, Button, Form, Input, Select, message } from 'antd';
import axios from 'axios';
import NewsEditor from '../../../components/Editor/NewsEditor'
import { useNavigate } from "react-router";

const { Step } = Steps;
const { Option } = Select;
export default function NewsUpdate() {
    const [current, setcurrent] = useState(0)
    const [categories, setcategories] = useState([])
    const [formInfo, setformInfo] = useState({})
    const [content, setcontent] = useState('')
    const params = useParams();
    const navigate = useNavigate();
    const newsForm = useRef(null)
    useEffect(() => {
        axios.get('/categories').then(res => setcategories(res.data))
    }, [])

    useEffect(() => {
        // console.log(params.id);
        axios.get(`/news/${params.id}?_expand=category&_expand=role`).then(res => {
            let { title, categoryId, content } = res.data;
            newsForm.current.setFieldsValue({
                title,
                categoryId,
            })
            setcontent(content)
        })
    }, [params.id]);

    const handleNext = () => {
        if (current === 0) {
            newsForm.current.validateFields().then(res => {
                setformInfo(res);
                setcurrent(current + 1);
            }).catch(error => console.log(error))
        } else {
            if (content === '' || content.trim() === "<p></p>") {
                message.error("新闻内容不能为空")
            } else {
                console.log(formInfo, content);
                setcurrent(current + 1);
            }
        }
    };
    const handlePrev = () => {
        setcurrent(current - 1);
    };
    const handleSave = (auditState) => {
        axios.patch(`/news/${params.id}`, {
            ...formInfo,
            "content": content,
            "auditState": 0,
        }).then(res => {
            navigate(auditState === 0 ? "/news-manage/draft" : "/audit-manage/list");
            notification.success({
                message: '通知',
                description:
                    `欢迎到${auditState === 0 ? '草稿箱' : '审核列表'}中查看您的新闻`,
                placement: "bottomRight",
            })
        })
    }
    return (
        <div>
            <PageHeader
                style={{ padding: "16px 0" }}
                className="site-page-header"
                title="编辑新闻"
                onBack={() => window.history.back()}
            />

            <Steps current={current} style={{ marginBottom: "30px" }}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容" description="新闻主体内容" />
                <Step title="新闻提交" description="保存草稿/提交审核" />
            </Steps>

            <div style={{ display: current === 0 ? "" : "none" }}>
                <Form ref={newsForm}>
                    <Form.Item label="新闻标题" name="title" rules={[{ required: true, message: "请输入新闻标题" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="新闻分类" name="categoryId" rules={[{ required: true, message: "请输入新闻分类" }]}>
                        <Select
                            placeholder=""
                            allowClear
                        >
                            {categories.map(item => <Option value={item.id} key={item.id}>{item.value}</Option>)}
                        </Select>
                    </Form.Item>
                </Form>
            </div>

            <div style={{ display: current === 1 ? "" : "none" }}>
                <NewsEditor getContent={(value) => { setcontent(value) }} content={content}> </NewsEditor>
            </div>

            <div style={{ display: current === 2 ? "" : "none" }}>
                333
            </div>

            <div style={{ marginTop: "50px" }}>
                {
                    current < 2 && <Button type='primary' onClick={handleNext}>下一步</Button>
                }
                {
                    current > 0 && <Button onClick={handlePrev}>上一步</Button>
                }
                {
                    current == 2 && <span>
                        <Button type='danger' ghost onClick={() => handleSave(0)}>保存草稿</Button>
                        <Button type='primary' onClick={() => handleSave(1)}>提交审核</Button>
                    </span>
                }
            </div>
        </div>
    )
}
