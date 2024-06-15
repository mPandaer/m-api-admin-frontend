import { PageContainer } from '@ant-design/pro-components';
import {useModel, useNavigate} from '@umijs/max';
import {Card, Col, message, Row, Space, theme} from 'antd';
import React, {useEffect, useState} from 'react';
import ProCard from "@ant-design/pro-card";
import {pageQueryApiInfo} from "@/services/ApiBackEnd/ApiInfo";
import {ArrowRightOutlined} from "@ant-design/icons";


/**
 * 欢迎页
 * @constructor
 */

interface ApiInfoCardProps {
  values:API.ApiInfoVO;
}

const ApiInfoCard = ({values}:ApiInfoCardProps) => {
  const navigate = useNavigate()
  const navigateToDetail = () => {
    navigate(`/api-detail/${values.apiId}`);
  }

  return (
    <Col>
      <Card hoverable title={values.apiName} onClick={navigateToDetail} extra={<ArrowRightOutlined/>} style={{ width: 300 }}>
        <p>{values.apiDesc}</p>
      </Card>
    </Col>
  );
}

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [apiList,setApiList] = useState<API.ApiInfoVO[]>([])

  useEffect(() => {
    const fetchApiList = async () => {
      const resp = await pageQueryApiInfo({
        currentPage:1,
        pageSize:16
      })
      if (resp.code === 1200) {
        setApiList(resp.data.records)
        return
      }
      message.error(resp.message);
    }

    fetchApiList();
  },[])

  return (
    <PageContainer>
      <Row gutter={[16,24]}>
        {
          apiList.length > 0 && (
            apiList.map(apiInfo => (<ApiInfoCard values={apiInfo}/>))
          )
        }
      </Row>
    </PageContainer>
  );
};

export default Welcome;
