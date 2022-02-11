/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:16:41
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-18 15:02:18
 */
import React from 'react'
import { Button } from 'antd';
import axios from 'axios';
export default function Home() {
    const ajex = () => {
        //取数据
        // axios.get("/posts").then(res => { console.log(res.data); })
        //增
        // axios.post("/posts", {
        //     "title": "5555",
        //     "author": "c"
        // })
        //改 替换原字段
        // axios.put("/posts/1", {
        //     "title": "11-改",
        //     "author": "a"
        // })
        //改 补丁求情更新
        // axios.patch("/posts/1", {
        //     "title": "11-改",
        //     "author": "a"
        // })
        //删
        // axios.delete("/posts/3")
        //关联表_embed 向下关联
        // axios.get("/posts?_embed=comments").then(res => { console.log(res.data); })
        //关联表_expand 向上关联
        // axios.get("/comments?_expand=post").then(res => { console.log(res.data); })
    }
    return (
        <div>
            <Button type="primary" onClick={ajex}>Home</Button>
        </div>
    )
}

