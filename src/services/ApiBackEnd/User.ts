// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前登录的用户信息 GET /user/current */
export async function getCurrentLoginUser(options?: { [key: string]: any }) {
  return request<API.ComResp>('/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户登录 POST /user/login */
export async function userLogin(body: API.UserLoginPO, options?: { [key: string]: any }) {
  return request<API.ComResp>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册 POST /user/register */
export async function userRegister(body: API.UserRegisterPO, options?: { [key: string]: any }) {
  return request<API.ComResp>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
