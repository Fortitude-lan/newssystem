/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:16:41
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-14 17:50:59
 */
import React from 'react'
import { Button } from 'antd';
import axios from 'axios';
export default function Home() {
    const ajex = () => {
        //取数据
        // axios.get("http://localhost:8000/posts").then(res => { console.log(res.data); })
        //增
        // axios.post("http://localhost:8000/posts", {
        //     "title": "5555",
        //     "author": "c"
        // })
        //改 替换原字段
        // axios.put("http://localhost:8000/posts/1", {
        //     "title": "11-改",
        //     "author": "a"
        // })
        //改 补丁求情更新
        // axios.patch("http://localhost:8000/posts/1", {
        //     "title": "11-改",
        //     "author": "a"
        // })
        //删
        // axios.delete("http://localhost:8000/posts/3")
        //关联表_embed 向下关联
        // axios.get("http://localhost:8000/posts?_embed=comments").then(res => { console.log(res.data); })
        //关联表_expand 向上关联
        // axios.get("http://localhost:8000/comments?_expand=post").then(res => { console.log(res.data); })
    }
    return (
        <div>
            <Button type="primary" onClick={ajex}>Home</Button>
        </div>
    )
}

