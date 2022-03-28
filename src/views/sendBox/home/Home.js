/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:16:41
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-03-28 20:44:04
 */
import React, { useEffect, useRef, useState } from 'react'
import { List, Drawer, Card, Row, Col, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, PieChartOutlined, UserSwitchOutlined } from '@ant-design/icons';
import axios from 'axios'
import * as Echarts from 'echarts'
import _ from 'lodash'
const { Meta } = Card;
export default function Home() {
    const [viewList, setviewList] = useState([])
    const [starList, setstarList] = useState([])
    const [allList, setallList] = useState([])
    const [visible, setvisible] = useState(false)
    const [pieChart, setpieChart] = useState(null)
    const barRef = useRef()
    const pieRef = useRef()
    const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then(res => {
            setviewList(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then(res => {
            setstarList(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category').then(res => {
            getBarOption(_.groupBy(res.data, item => item.category.title))
            setallList(res.data)
        })
        return () => {
            window.onresize = null //类似清除定时器
        }
    }, [])
    const getBarOption = (obj) => {
        let bottomChart = Echarts.init(barRef.current)
        const option = {
            title: {
                text: "新闻分类图示"
            },
            xAxis: {
                type: 'category',
                data: Object.keys(obj),
                axisLabel: {
                    rotate: '45',
                    interval: 0
                }
            },
            legend: {},
            yAxis: {
                type: 'value',
                minInterval: 1
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            series: [
                {
                    name: '数量',
                    data: Object.values(obj).map(i => i.length),
                    type: 'bar'
                }
            ]
        };
        bottomChart.setOption(option)

        window.onresize = () => {
            bottomChart.resize()
            // console.log('object');
        }
    }
    const getPieOption = (obj) => {
        let curList = allList.filter(i => i.author == username)
        let groupList = _.groupBy(curList, item => item.category.title)
        // console.log(groupList);
        let list = [];
        for (let i in groupList) {
            list.push({
                value: groupList[i].length,
                name: i
            })
        }

        let drawerChart; //下面判断保证初始化一次
        if (!pieChart) {
            drawerChart = Echarts.init(pieRef.current)
            setpieChart(drawerChart)
        } else {
            drawerChart = pieChart
        }
        const option = {
            title: {
                text: '当前用户新闻分类图示',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: '发布数量',
                    type: 'pie',
                    radius: '50%',
                    data: list,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        drawerChart.setOption(option)
        window.onresize = () => {
            drawerChart.resize()
            // console.log('object');
        }
    }
    return (
        <div>
            {/* <Button type="primary" >Home</Button> */}
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="用户最长浏览" bordered={true}>
                            <List
                                size="small"
                                // bordered
                                dataSource={viewList}
                                renderItem={item => <List.Item ><a href={`/#/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="用户点赞最多" bordered={true}>
                            <List
                                size="small"
                                // bordered
                                dataSource={starList}
                                renderItem={item => <List.Item ><a href={`/#/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}

                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            // style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                < PieChartOutlined key="setting" onClick={() => { setTimeout(() => { setvisible(true); getPieOption() }, 0) }} />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={username}
                                description={
                                    <div>
                                        <b>{region == '' ? '全球' : region}</b>
                                        <span style={{ paddingLeft: "30px" }}>{roleName}</span>
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                </Row>
                <Drawer
                    width="50%"
                    title="个人新闻分类"
                    placement="right"
                    onClose={() => setvisible(false)}
                    visible={visible}
                >
                    <div ref={pieRef} style={{ height: "400px", marginTop: "20px" }}></div>
                </Drawer>
                <div ref={barRef} style={{ height: "400px", marginTop: "20px" }}></div>
            </div>
        </div >
    )
}

