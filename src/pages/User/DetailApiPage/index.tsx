import { pageQueryApiInfo } from '@/services/ApiBackEnd/ApiInfo';
import { useParams } from '@@/exports';
import { PageContainer, ProSkeleton } from '@ant-design/pro-components';
import { Tabs, TabsProps, message } from 'antd';
import { useEffect, useState } from 'react';

import DetailApiInfoTab from '@/pages/User/DetailApiPage/components/DetailInfoTab';
import OnLineDebugTab from '@/pages/User/DetailApiPage/components/OnLineDebugTab';

/**
 * 接口详细信息页
 * @constructor
 */
const DetailApiPage = () => {
  const params = useParams();
  const [apiInfo, setApiInfo] = useState<API.ApiInfoVO>();
  useEffect(() => {
    const fetchApiInfoById = async () => {
      if (!params.id) {
        message.error('没有接口ID');
        return;
      }
      const resp = await pageQueryApiInfo({ currentPage: 1, pageSize: 1, apiId: params.id });
      if (resp.code === 1200) {
        if (resp.data.records.length <= 0) {
          message.error('没有该接口的详细信息');
          return;
        }
        const apiInfo: API.ApiInfoVO = resp.data.records[0];
        apiInfo.apiReqParams = JSON.parse(apiInfo.apiReqParams);
        apiInfo.apiReqHeader = JSON.parse(apiInfo.apiReqHeader);
        apiInfo.apiRespDesc = JSON.parse(apiInfo.apiRespDesc);
        setApiInfo(apiInfo);
      }
    };
    fetchApiInfoById();
  }, []);
  const items: TabsProps['items'] = [
    {
      key: 'docs',
      label: 'API文档',
      children: apiInfo ? (
        <DetailApiInfoTab values={apiInfo} />
      ) : (
        <ProSkeleton type="descriptions" />
      ),
    },
    {
      key: 'debug',
      label: '在线调试',
      children: apiInfo ? <OnLineDebugTab values={apiInfo} /> : <ProSkeleton type="descriptions" />,
    },
  ];
  return (
    <PageContainer title={'API 接口详情'}>
      <Tabs defaultActiveKey="docs" items={items} />
    </PageContainer>
  );
};
export default DetailApiPage;
