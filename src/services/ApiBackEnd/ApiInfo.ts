// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加接口信息 POST /api-info/add */
export async function addApiInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addApiInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ComResp>('/api-info/add', {
    method: 'POST',
    params: {
      ...params,
      po: undefined,
      ...params['po'],
    },
    ...(options || {}),
  });
}

/** 删除接口信息 GET /api-info/delete */
export async function deleteApiInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteApiInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ComResp>('/api-info/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询接口信息 GET /api-info/page/query */
export async function pageQueryApiInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PageQueryApiInfoPO,
  options?: { [key: string]: any },
) {
  return request<API.ComResp>('/api-info/page/query', {
    method: 'GET',
    params: {
      ...params,
      po: undefined,
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新接口信息 POST /api-info/update */
export async function updateApiInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateApiInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ComResp>('/api-info/update', {
    method: 'POST',
    params: {
      ...params,
      po: undefined,
      ...params['po'],
    },
    ...(options || {}),
  });
}
