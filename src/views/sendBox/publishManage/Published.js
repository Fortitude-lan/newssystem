/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-10 13:38:22
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-22 16:14:23
 */
import React from 'react'
import PublishType from '../../../components/publish-manage/PublishType';
import usePublish from '../../../components/publish-manage/usePublish';
import { Button } from 'antd';

export default function Published() {
  const { dataSource, handleCancel } = usePublish(2)
  return (
    <div>
      <PublishType dataSource={dataSource} button={id =><Button danger onClick={() => handleCancel(id)}>下线</Button> } />
    </div>
  )
}
