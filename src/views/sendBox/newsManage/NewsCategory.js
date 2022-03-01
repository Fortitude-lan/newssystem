/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-13 17:19:21
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-28 17:55:34
 */
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const EditableContext = React.createContext(null);
const { confirm } = Modal

export default function RightList() {
  const [dataSource, setdataSource] = useState([])
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axios.get('/categories').then(res => {
      setdataSource(res.data)
    })
  }, [refresh])
  const handleSave = (record) => {
    axios.patch(`/categories/${record.id}`, {
      title: record.title,
      value: record.title
    }).then(setRefresh)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (text) => {
        return <span className="bold">{text}</span>
      }
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: '栏目名称',
        handleSave: handleSave,
      }),

    },
    {
      title: "操作",
      render: (record) => {
        return (
          <div>
            <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(record)} />
          </div>
        )
      }

    }
  ];

  //权限删除
  const confirmMethod = (record) => {
    console.log(record)
    confirm({
      title: '确定要删除吗？',
      icon: <ExclamationCircleOutlined />,
      // content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
      onOk() { deleteMethod(record) },

    });
  }
  const deleteMethod = (record) => {
    axios.delete(`/categories/${record.id}`).then((setRefresh))

  }

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  }
  return (

    <div>
        <Table dataSource={dataSource} columns={columns}
          rowKey={item => item.id}
          scroll={{ y: 600 }}
          pagination={{ pageSize: 10 }}
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            }
          }}
        />

    </div>
  )
}
