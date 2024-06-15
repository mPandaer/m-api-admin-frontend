import React, { useEffect } from 'react';
import {Drawer, Form, Modal, Table} from 'antd';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import styles from './YourStyles.module.css'; // 替换为你的实际样式文件

interface DetailApiInfoProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  onCancel: () => void;
  initialValues?: API.ApiInfoVO;
}

/**
 * 接口详细信息组件
 * @constructor
 */
const DetailApiInfo = ({ visible, setVisible, onCancel, initialValues }: DetailApiInfoProps) => {
  const [form] = Form.useForm<API.ApiInfoVO>();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues ?? {});
    }
  }, [visible, initialValues, form]);

  const columnsForHeaders = [
    {
      title: '字段名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '字段值',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const columnsForParams = [
    {
      title: '参数名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '参数类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '是否必填',
      dataIndex: 'require',
      key: 'require',
      render: (require: boolean) => (require ? '是' : '否'),
    },
  ];

  const columnsForRespDesc = [
    {
      title: '参数名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '参数类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
  ];

  return (
    <Drawer
      title="接口详细信息"
      open={visible}
      onClose={onCancel}
      width={"80%"}
    >
      <ProDescriptions column={1} title="接口基本信息">
        <ProDescriptions.Item label="接口名字">{initialValues?.apiName}</ProDescriptions.Item>
        <ProDescriptions.Item label="接口描述">{initialValues?.apiDesc}</ProDescriptions.Item>
        <ProDescriptions.Item label="接口地址">{initialValues?.apiUrl}</ProDescriptions.Item>
        <ProDescriptions.Item label="接口请求方式">{initialValues?.apiReqMethod}</ProDescriptions.Item>
        <ProDescriptions.Item label="响应类型">{initialValues?.apiRespType}</ProDescriptions.Item>
      </ProDescriptions>

      <ProDescriptions title="接口请求头信息" column={1}>
        <Table
          style={{width:"100%"}}
          columns={columnsForHeaders}
          dataSource={initialValues?.apiReqHeader as any}
          pagination={false}
          rowKey={(record) => record.name}
        />
      </ProDescriptions>

      <ProDescriptions title="接口请求参数" column={1}>
        <Table
          style={{width:"100%"}}
          columns={columnsForParams}
          dataSource={initialValues?.apiReqParams as any}
          pagination={false}
          rowKey={(record) => record.name}
        />
      </ProDescriptions>

      <ProDescriptions title="接口响应体信息描述" column={1}>
        <Table
          style={{width:"100%"}}
          columns={columnsForRespDesc}
          dataSource={initialValues?.apiRespDesc as any}
          pagination={false}
          rowKey={(record) => record.name}
        />
      </ProDescriptions>

      <ProDescriptions column={1} title="接口响应示例">
        <ProDescriptions.Item>{initialValues?.apiRespSample}</ProDescriptions.Item>
      </ProDescriptions>
    </Drawer>
  );
};

export default DetailApiInfo;
