/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-21 14:03:43
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-22 16:52:05
 */
import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd';
const { Option } = Select;


const Useform = forwardRef((props, ref) => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };
    const [isdisable, setisdisable] = useState(false)
    useEffect(() => {
        props.selectedRow && props.selectedRow.roleId == 1 ? setisdisable(true) : setisdisable(false)
    }, [props.selectedRow]);

    return (
        <>
            <Form ref={ref} initialValues={props.selectedRow}>
                <Form.Item
                    {...layout}
                    placeholder="请选择"
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: 'Please input...' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    {...layout}
                    placeholder="请选择"
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: 'Please input...' }]}
                >
                    <Input type="password" />
                </Form.Item>
                <Form.Item
                    {...layout}
                    label="区域"
                    name="region"
                    rules={isdisable ? [] : [{ required: true, message: 'Please input...' }]}
                >
                    <Select
                        disabled={isdisable}
                        placeholder="请选择"
                        allowClear
                    >
                        {props.regionList.map(i =>
                            <Option key={i.id} value={i.value}>{i.title}</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item
                    {...layout}
                    label="角色"
                    name="roleId"
                    rules={[{ required: true, message: 'Please input...' }]}
                >
                    <Select
                        placeholder="请选择"
                        allowClear
                        onChange={(value) => {
                            value == '1'
                                ? (
                                    setisdisable(true),
                                    ref.current.setFieldsValue({ region: '' })
                                )
                                : setisdisable(false)
                        }}
                    >
                        {props.roleList.map(item =>
                            <Option key={item.id} value={item.id}>{item.roleName}</Option>
                        )}
                    </Select>
                </Form.Item>
            </Form>
        </>
    )
})
export default Useform