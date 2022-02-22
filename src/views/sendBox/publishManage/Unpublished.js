/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-10 13:38:22
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-22 16:11:51
 */
import React from 'react'
import PublishType from '../../../components/publish-manage/PublishType';
import usePublish from '../../../components/publish-manage/usePublish';
import { Button } from 'antd';
export default function Unpublished() {
  const { dataSource, handlePublish } = usePublish(1)
  return (
    <div>
      <PublishType dataSource={dataSource} button={id => <Button type='primary' onClick={() => handlePublish(id)}>发布</Button>} />
    </div>
  )
}
