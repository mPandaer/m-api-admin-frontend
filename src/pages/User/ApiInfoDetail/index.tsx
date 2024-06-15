import React, {useEffect, useState} from 'react';
import {Button, Drawer, Form, Input, message, Modal, Table, Tabs, TabsProps} from 'antd';
import {
  PageContainer, ProColumns,
  ProDescriptions, ProForm, ProFormText,
  ProSkeleton
} from '@ant-design/pro-components';
import {useParams} from "@@/exports";
import {callApi, pageQueryApiInfo} from "@/services/ApiBackEnd/ApiInfo";

import styles from "./style.less";
import {EditableProTable} from "@ant-design/pro-table";
import RequestParamsTab from "@/pages/User/ApiInfoDetail/components/RequestParamsTab";
import RequestBodyTab from "@/pages/User/ApiInfoDetail/components/RequestBodyTab";
import RequestHeaderTab from "@/pages/User/ApiInfoDetail/components/RequestHeaderTab";
import ResponseBodyTab from "@/pages/User/ApiInfoDetail/components/ResponseBodyTab";
import ResponseHeaderTab from "@/pages/User/ApiInfoDetail/components/ResponseHeaderTab";
import TextArea from "antd/es/input/TextArea";
import {ProFormSelect} from "@ant-design/pro-form/lib";
import ProCard from "@ant-design/pro-card";


/**
 * 接口详细信息组件
 * @constructor
 */
interface DetailApiInfoProps {
  values: API.ApiInfoVO;
}

export interface RequestParamsItem {
  key:string
  paramName?: string;
  paramValue?: string;
}

interface RequestParamsProps {
  items: RequestParamsItem[];
  setItems: (items: readonly RequestParamsItem[]) => void;
}

const DetailApiInfo = ({values}: DetailApiInfoProps) => {
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
          style={{width: "100%"}}
          columns={columnsForHeaders}
          dataSource={values?.apiReqHeader as any}
          pagination={false}
          rowKey={(record) => record.name}
        />
      </ProDescriptions>

      <ProDescriptions title="接口请求参数" column={1}>
        <Table
          style={{width: "100%"}}
          columns={columnsForParams}
          dataSource={values?.apiReqParams as any}
          pagination={false}
          rowKey={(record) => record.name}
        />
      </ProDescriptions>

      <ProDescriptions title="接口响应体信息描述" column={1}>
        <Table
          style={{width: "100%"}}
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


export interface ApiRequest {
  url:string;
  method:string;
  params:string;
  data:string;
}


const OnLineDebug = ({values}: DetailApiInfoProps) => {
  const [requestParam,setRequestParam] = useState<RequestParamsItem[]>([])
  const bodyItems: TabsProps['items'] = [
    {
      key: 'params',
      label: '请求参数',
      children: "请求参数"
    },
    {
      key: 'body',
      label: '请求体',
      children: <RequestBodyTab/>
    },
    {
      key: 'header',
      label: '请求头',
      children: <RequestHeaderTab/>
    },
  ]
  const respItem: TabsProps['items'] = [
    {
      key: 'body',
      label: '响应体',
      children: <ResponseBodyTab/>
    },
    {
      key: 'header',
      label: '响应头',
      children: <ResponseHeaderTab/>
    },
  ]
  const [apiRequest,setApiRequest] = useState<ApiRequest>();




  return (
    <>
      {/*<div className={styles.requestHeader}>*/}
      {/*  <Input*/}
      {/*    addonBefore={"POST"}*/}
      {/*    defaultValue={values.apiUrl}*/}
      {/*  />*/}
      {/*  <Button>发送</Button>*/}
      {/*</div>*/}
      {/*<div className={styles.requestBody}>*/}
      {/*  <Tabs defaultActiveKey="docs" items={bodyItems}/>*/}
      {/*</div>*/}

      {/*<div className={styles.reponse}>*/}
      {/*  <Tabs defaultActiveKey="docs" items={respItem}/>*/}
      {/*</div>*/}

      <ProForm<ApiRequest>
        onFinish={async (formData:ApiRequest) => {
          console.log('api request',formData);
          if (formData) {
            const resp = await callApi({
              apiId:values.apiId,
              url:formData.url,
              method:formData.method,
              params:formData.params,
              body:formData.data,
            })
            console.log(resp)
          }
        }}
        autoFocusFirstInput
      >

        <ProFormText name={"url"} label={"请求URL"} placeholder={"请输入URL"}>

        </ProFormText>
        <ProFormSelect
          options={[
            {
              value: 'POST',
              label: 'POST',
            },
            {
              value: 'GET',
              label: 'GET',
            },
          ]}
          width="sm"
          name="method"
          label="请求方法"
        />

        <ProFormText name={"params"} label={"请求参数"} placeholder={"请输入请求参数"}>

        </ProFormText>

        <ProFormText name={"data"} label={"请求体"} placeholder={"请输入JSON格式的请求体"}>

        </ProFormText>
      </ProForm>

      <ProCard>

      </ProCard>


    </>
  );
}

const DetailApiPage = () => {
  const params = useParams();
  const [apiInfo, setApiInfo] = useState<API.ApiInfoVO>();
  useEffect(() => {
    const fetchApiInfoById = async () => {
      if (!params.id) {
        message.error("没有接口ID")
        return
      }
      const resp = await pageQueryApiInfo({currentPage: 1, pageSize: 1,apiId:params.id})
      if (resp.code === 1200) {
        if (resp.data.records.length <= 0) {
          message.error("没有该接口的详细信息")
          return
        }
        const apiInfo: API.ApiInfoVO = resp.data.records[0]
        apiInfo.apiReqParams = JSON.parse(apiInfo.apiReqParams);
        apiInfo.apiReqHeader = JSON.parse(apiInfo.apiReqHeader);
        apiInfo.apiRespDesc = JSON.parse(apiInfo.apiRespDesc);
        setApiInfo(apiInfo);
      }
    }
    fetchApiInfoById()

  }, []);
  const items: TabsProps['items'] = [
    {
      key: 'docs',
      label: 'API文档',
      children: apiInfo ? <DetailApiInfo values={apiInfo}/> : <ProSkeleton type="descriptions"/>,
    },
    {
      key: 'debug',
      label: '在线调试',
      children: apiInfo ? <OnLineDebug values={apiInfo}/> : <ProSkeleton type="descriptions"/>,
    },
  ];
  return (
    <PageContainer title={"API 接口详情"}>
      <Tabs defaultActiveKey="docs" items={items}/>
    </PageContainer>
  );
}
export default DetailApiPage;
