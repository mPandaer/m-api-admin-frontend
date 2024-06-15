import { DetailApiInfoProps } from '@/type';
import { ProDescriptions } from '@ant-design/pro-components';
import { Form, Table } from 'antd';
import { useEffect } from 'react';

const DetailApiInfoTab = ({ values }: DetailApiInfoProps) => {
  const [form] = Form.useForm<API.ApiInfoVO>();
  useEffect(() => {
    form.setFieldsValue(values ?? {});
  }, [form, values]);

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
    <>
      <ProDescriptions column={1} title="接口基本信息">
        <ProDescriptions.Item label="接口名字">{values?.apiName}</ProDescriptions.Item>
        <ProDescriptions.Item label="接口描述">{values?.apiDesc}</ProDescriptions.Item>
        <ProDescriptions.Item label="接口地址">{values?.apiUrl}</ProDescriptions.Item>
        <ProDescriptions.Item label="接口请求方式">{values?.apiReqMethod}</ProDescriptions.Item>
        <ProDescriptions.Item label="响应类型">{values?.apiRespType}</ProDescriptions.Item>
      </ProDescriptions>

      <ProDescriptions title="接口请求头信息" column={1}>
        <Table
          style={{ width: '100%' }}
          columns={columnsForHeaders}
          dataSource={values?.apiReqHeader as any}
          pagination={false}
          rowKey={(record) => record.name}
        />
      </ProDescriptions>

      <ProDescriptions title="接口请求参数" column={1}>
        <Table
          style={{ width: '100%' }}
          columns={columnsForParams}
          dataSource={values?.apiReqParams as any}
          pagination={false}
          rowKey={(record) => record.name}
        />
      </ProDescriptions>

      <ProDescriptions title="接口响应体信息描述" column={1}>
        <Table
          style={{ width: '100%' }}
          columns={columnsForRespDesc}
          dataSource={values?.apiRespDesc as any}
          pagination={false}
          rowKey={(record) => record.name}
        />
      </ProDescriptions>

      <ProDescriptions column={1} title="接口响应示例">
        <ProDescriptions.Item>{values?.apiRespSample}</ProDescriptions.Item>
      </ProDescriptions>
    </>
  );
};

export default DetailApiInfoTab;
