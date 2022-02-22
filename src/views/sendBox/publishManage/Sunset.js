/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-10 13:39:04
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-22 16:08:14
 */
import React from 'react'
import PublishType from '../../../components/publish-manage/PublishType';
import usePublish from '../../../components/publish-manage/usePublish';
import { Button } from 'antd';

export default function Sunset() {
  const { dataSource, handleDalete } = usePublish(3)
  return (
    <div>
      <PublishType dataSource={dataSource} button={id => <Button type='danger' onClick={() => handleDalete(id)}>删除</Button>} />
    </div>
  )
}
