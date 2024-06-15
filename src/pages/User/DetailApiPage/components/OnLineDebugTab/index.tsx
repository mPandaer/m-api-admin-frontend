import RequestHeadersTab from '@/pages/User/DetailApiPage/components/OnLineDebugTab/components/RequestHeadersTab';
import RequestParamsTab from '@/pages/User/DetailApiPage/components/OnLineDebugTab/components/RequestParamsTab';
import { callApi } from '@/services/ApiBackEnd/ApiInfo';
import { ApiRequest, DetailApiInfoProps } from '@/type';
import ProCard from '@ant-design/pro-card';
import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { ProFormInstance, ProFormSelect } from '@ant-design/pro-form/lib';
import { Button, Divider, Tabs, TabsProps } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

const OnLineDebugTab = ({ values }: DetailApiInfoProps) => {
  const formRef = useRef<ProFormInstance>();
  const items: TabsProps['items'] = [
    {
      key: 'params',
      label: 'Params',
      children: <RequestParamsTab />,
    },
    {
      key: 'body',
      label: 'Body',
      children: <ProFormTextArea name={'body'} width={'xl'}></ProFormTextArea>,
    },
    {
      key: 'headers',
      label: 'Headers',
      children: <RequestHeadersTab />,
    },
  ];
  const [jsonText, setJsonText] = useState<string>('');

  useEffect(() => {
    formRef.current?.setFieldsValue({
      url: values.apiUrl,
      method: values.apiReqMethod.toUpperCase(),
    });
  }, [values]);

  return (
    <>
      <ProForm<ApiRequest>
        submitter={{
          render: (props, doms) => {
            return [
              <Button
                type={'dashed'}
                onClick={() => {
                  formRef.current?.resetFields?.();
                }}
                key="edit"
              >
                重置参数
              </Button>,
              <Button
                type={'primary'}
                onClick={() => {
                  formRef.current?.submit?.();
                }}
                key="edit"
              >
                调试
              </Button>,
            ];
          },
        }}
        onFinish={async (formData: ApiRequest) => {
          console.log('api request', formData);
          if (formData) {
            const resp = await callApi({
              apiId: values.apiId,
              url: formData.url,
              method: formData.method,
              params: formData.params.reduce((acc, item) => acc + `${item.name}=${item.value}`, ''),
              body: formData.body,
            });
            setJsonText(JSON.stringify(resp));
          }
        }}
        autoFocusFirstInput
        formRef={formRef}
      >
        <ProForm.Group title={'请求基本设置'}>
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
            width="xs"
            name="method"
            disabled={true}
          />

          <ProFormText name={'url'} disabled={true} width={'xl'} />
        </ProForm.Group>

        <ProForm.Group title={'请求参数设置'} size={'large'}>
          <Tabs items={items} defaultActiveKey={'params'} />
        </ProForm.Group>
      </ProForm>

      {jsonText && (
        <>
          <Divider />
          <ProCard title={'响应体'}>
            <SyntaxHighlighter language="json" style={okaidia}>
              {jsonText}
            </SyntaxHighlighter>
          </ProCard>
        </>
      )}
    </>
  );
};

export default OnLineDebugTab;
