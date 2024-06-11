declare namespace API {
  type addApiInfoParams = {
    po: AddApiInfoPO;
  };

  type AddApiInfoPO = {
    /** 接口名字 */
    apiName: string;
    /** 接口地址 */
    apiUrl: string;
    /** 接口请求方法 */
    apiReqMethod: string;
    /** 接口的响应体类型 PS: 响应体Content-Type的值 */
    apiRespType: string;
    /** 接口信息描述 */
    apiDesc: string;
    /** 接口请求头说明 */
    apiReqHeader: string;
    /** 接口请求参数说明 */
    apiReqParams: string;
    /** 接口响应体说明 */
    apiRespDesc: string;
    /** 接口响应示例 */
    apiRespSample: string;
  };

  type ComResp = {
    code?: number;
    message?: string;
    data?: any;
  };

  type deleteApiInfoParams = {
    apiIds: string;
  };

  type pageQueryApiInfoParams = {
    po: PageQueryApiInfoPO;
  };

  type PageQueryApiInfoPO = {
    /** 接口ID */
    apiId?: string;
    /** 接口名字 */
    apiName?: string;
    /** 当前请求的页码 */
    currentPage?: number;
    /** 每页的数据的个数 */
    pageSize?: number;
  };

  type updateApiInfoParams = {
    po: UpdateApiInfoPO;
  };

  type UpdateApiInfoPO = {
    /** 接口ID */
    apiId?: string;
    /** 接口名字 */
    apiName?: string;
    /** 接口地址 */
    apiUrl?: string;
    /** 接口请求方法 */
    apiReqMethod?: string;
    /** 接口的响应体类型 PS: 响应体Content-Type的值 */
    apiRespType?: string;
    /** 接口信息描述 */
    apiDesc?: string;
    /** 接口请求头说明 */
    apiReqHeader?: string;
    /** 接口请求参数说明 */
    apiReqParams?: string;
    /** 接口响应体说明 */
    apiRespDesc?: string;
    /** 接口响应示例 */
    apiRespSample?: string;
  };

  type UserLoginPO = {
    /** 用户账户 */
    userAccount: string;
    /** 用户密码 */
    userPassword: string;
  };

  type UserRegisterPO = {
    /** 用户账户 */
    userAccount: string;
    /** 用户密码 */
    userPassword: string;
  };
}
