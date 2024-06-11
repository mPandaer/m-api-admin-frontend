
import {addApiInfo, deleteApiInfo, pageQueryApiInfo, updateApiInfo} from '@/services/ApiBackEnd/ApiInfo';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Popconfirm, message } from 'antd';
import type { SortOrder } from 'antd/lib/table/interface';
import React, { useRef, useState } from 'react';
import AddApiInfoForm from "@/pages/ApiInfoList/components/AddForm";
import UpdateApiInfoForm from "@/pages/ApiInfoList/components/UpdateForm/UpdateApiInfoForm";
import DetailApiInfo from "@/pages/ApiInfoList/components/DetailInfo";

/**
 * 获取接口信息列表
 * @param params
 * @param sort
 * @param filter
 */
const fetchApiList = async (
  params: API.PageQueryApiInfoPO & {
    pageSize?: number;
    current?: number;
    keyword?: string;
  },
  sort: Record<string, SortOrder>,
  filter: Record<string, (string | number)[] | null>,
) => {
  const resp = await pageQueryApiInfo({
    currentPage: params.current,
    pageSize: params.pageSize,
  });
  if (resp.code === 1200) {
    return {
      data: resp.data.records,
      success: true,
      total: resp.data.total,
    };
  }
};

/**
 * 接口信息列表组件
 * @constructor
 */
const ApiInfoList: React.FC = () => {
  const [addFormVisible,setAddFormVisible] = useState(false)
  const [updateFormVisible,setUpdateFormVisible] = useState(false);
  const [detailVisible,setDetailVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ApiInfoVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.ApiInfoVO[]>([]);

  /**
   * 处理批量删除
   */
  const handleBatchDelete = async () => {
    const ids = selectedRowsState.map((item) => item.apiId).join(',');
    const resp = await deleteApiInfo({ apiIds: ids });
    if (resp.code === 1200) {
      message.success('删除成功');
      resetSelectedRowAndReload();
      return;
    }
    message.error(resp.message);
  };

  const handleCancelDelete = () => {
    resetSelectedRowAndReload();
  };

  const resetSelectedRowAndReload = () => {
    setSelectedRows([]);
    actionRef?.current?.reloadAndRest?.();
  };

  const handleAddCancel = () => {
    setAddFormVisible(false);
  }

  const handleAddFinish = async (values:API.AddApiInfoPO) => {
    const data : API.AddApiInfoPO = {...values,apiReqHeader:JSON.stringify(values.apiReqHeader),
      apiReqParams:JSON.stringify(values.apiReqParams),apiRespDesc:JSON.stringify(values.apiRespDesc)}
    const resp = await addApiInfo(data)
    if (resp.code === 1200) {
      message.success("添加成功")
      actionRef.current?.reloadAndRest?.()
      setAddFormVisible(false)
      return;
    }
    console.warn("add api info fail",resp.message);
    message.success("添加失败")
  }


  // 接口表格列定义
  const columns: ProColumns<API.ApiInfoVO>[] = [
    {
      title: '接口名称',
      dataIndex: 'apiName',
      render: (dom, record) => {
        return (
          <a
            onClick={() => {

              setCurrentRow({...record,apiReqHeader:JSON.parse(record.apiReqHeader),apiReqParams:JSON.parse(record.apiReqParams),apiRespDesc:JSON.parse(record.apiRespDesc)});
              setDetailVisible(true)
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '接口描述',
      dataIndex: 'apiDesc',
      valueType: 'textarea',
    },
    {
      title: '接口地址',
      dataIndex: 'apiUrl',
      valueType: 'textarea',
    },
    {
      title: '请求方式',
      dataIndex: 'apiReqMethod',
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setUpdateFormVisible(true)
            setCurrentRow({...record,apiReqHeader:JSON.parse(record.apiReqHeader),apiReqParams:JSON.parse(record.apiReqParams),apiRespDesc:JSON.parse(record.apiRespDesc)});
            console.log("record",record)
          }}
        >
          配置
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ApiInfoVO, API.PageQueryApiInfoPO>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="apiId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setAddFormVisible(true)
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        // @ts-ignore
        request={fetchApiList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />

      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }
        >
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={handleBatchDelete}
            onCancel={handleCancelDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button danger={true} type={'primary'}>
              批量删除
            </Button>
          </Popconfirm>
        </FooterToolbar>
      )}

      <AddApiInfoForm visible={addFormVisible} setVisible={setAddFormVisible} onCancel={handleAddCancel} onFinish={handleAddFinish}/>


      <UpdateApiInfoForm visible={updateFormVisible} setVisible={setUpdateFormVisible} onCancel={() => {
        setUpdateFormVisible(false)
      }} onFinish={async (values) => {
        const data: API.UpdateApiInfoPO = {...values,apiReqHeader:JSON.stringify(values.apiReqHeader),apiReqParams:JSON.stringify(values.apiReqParams),apiRespDesc:JSON.stringify(values.apiRespDesc)}
        const resp = await updateApiInfo(data)
        if (resp.code === 1200) {
          message.success("更新成功")
          setUpdateFormVisible(false);
          actionRef.current?.reloadAndRest?.();
          return;
        }
        console.log("update",resp.message);
        message.success("更新失败");
      }} initialValues={currentRow}/>

      <DetailApiInfo visible={detailVisible} setVisible={setDetailVisible} onCancel={() => setDetailVisible(false)} initialValues={currentRow}/>
    </PageContainer>
  );
};
export default ApiInfoList;
