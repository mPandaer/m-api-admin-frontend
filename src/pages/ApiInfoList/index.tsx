import UpdateForm from '@/pages/ApiInfoList/components/UpdateForm';
import {addApiInfo, deleteApiInfo, pageQueryApiInfo} from '@/services/ApiBackEnd/ApiInfo';
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

  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
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
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              // setCurrentRow(entity);
              setShowDetail(true);
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
            handleUpdateModalOpen(true);
            // setCurrentRow(record);
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

      <UpdateForm
        onSubmit={async (value) => {
          // const success = await handleUpdate(value);
          // if (success) {
          //   handleUpdateModalOpen(false);
          //   setCurrentRow(undefined);
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          // }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {/*{currentRow?.name && (*/}
        {/*  <ProDescriptions<API.RuleListItem>*/}
        {/*    column={2}*/}
        {/*    title={currentRow?.name}*/}
        {/*    request={async () => ({*/}
        {/*      data: currentRow || {},*/}
        {/*    })}*/}
        {/*    params={{*/}
        {/*      id: currentRow?.name,*/}
        {/*    }}*/}
        {/*    columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}*/}
        {/*  />*/}
        {/*)}*/}
      </Drawer>
    </PageContainer>
  );
};
export default ApiInfoList;
