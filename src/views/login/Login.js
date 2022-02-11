/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2021-12-24 15:16:20
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-10 10:39:24
 */
import React from 'react'
import { useNavigate, useLocation } from "react-router";
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Particles from "react-tsparticles";
import axios from 'axios';
export default function Login() {
    let navigate = useNavigate();
    const onFinish = (value) => {
        axios.get(`http://localhost:5500/users?_expand=role&username=${value.username}&password=${value.password}&roleState=true`)
            .then(res => {
                console.log(res.data)
                if (res.data.length === 0) {
                    message.error('账号和密码不匹配')
                } else {
                    console.log(location);
                    localStorage.setItem('token', JSON.stringify(res.data[0]))
                    navigate("/home")
                }

            })
    };
    const options = {
        "background": {
            "color": {
                "value": "#0d47a1"
            },
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "cover"
        },
        "fullScreen": {
            "zIndex": 1
        },
        "interactivity": {
            "events": {
                "onClick": {
                    "enable": true,
                    "mode": "push"
                },
                "onHover": {
                    "enable": true,
                    "mode": "repulse",
                    "parallax": {
                        "force": 60
                    }
                }
            },
            "modes": {
                "bubble": {
                    "distance": 400,
                    "duration": 2,
                    "opacity": 0.8,
                    "size": 40
                },
                "grab": {
                    "distance": 400
                }
            }
        },
        "particles": {
            "color": {
                "value": "#ffffff"
            },
            "links": {
                "color": {
                    "value": "#ffffff"
                },
                "distance": 150,
                "enable": true,
                "opacity": 0.4
            },
            "move": {
                "attract": {
                    "rotate": {
                        "x": 600,
                        "y": 1200
                    }
                },
                "enable": true,
                "outModes": {
                    "bottom": "out",
                    "left": "out",
                    "right": "out",
                    "top": "out"
                }
            },
            "number": {
                "density": {
                    "enable": true
                },
                "value": 80
            },
            "opacity": {
                "value": {
                    "min": 0.1,
                    "max": 0.5
                },
                "animation": {
                    "enable": true,
                    "speed": 1,
                    "minimumValue": 0.1
                }
            },
            "shape": {
                "options": {
                    "character": {
                        "value": [
                            "t",
                            "s",
                            "P",
                            "a",
                            "r",
                            "t",
                            "i",
                            "c",
                            "l",
                            "e",
                            "s"
                        ],
                        "font": "Verdana",
                        "style": "",
                        "weight": "400",
                        "fill": true
                    },
                    "char": {
                        "value": [
                            "t",
                            "s",
                            "P",
                            "a",
                            "r",
                            "t",
                            "i",
                            "c",
                            "l",
                            "e",
                            "s"
                        ],
                        "font": "Verdana",
                        "style": "",
                        "weight": "400",
                        "fill": true
                    }
                },
                "type": "char"
            },
            "size": {
                "value": 16,
                "animation": {
                    "speed": 10,
                    "minimumValue": 10
                }
            },
            "stroke": {
                "width": 1,
                "color": {
                    "value": "#ffffff",
                    "animation": {
                        "h": {
                            "count": 0,
                            "enable": false,
                            "offset": 0,
                            "speed": 1,
                            "sync": true
                        },
                        "s": {
                            "count": 0,
                            "enable": false,
                            "offset": 0,
                            "speed": 1,
                            "sync": true
                        },
                        "l": {
                            "count": 0,
                            "enable": false,
                            "offset": 0,
                            "speed": 1,
                            "sync": true
                        }
                    }
                }
            }
        }
    }
    return (
        <div style={{ background: '#006bce', height: "100vh" }}>
            <Particles options={options} />
            <div className="login_box">
                <h1>全球新闻发布管理系统</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入账号',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    {/* <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item> */}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        {/* Or <a href="">register now!</a> */}
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}
