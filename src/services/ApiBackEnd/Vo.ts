declare namespace API {
  type UserVO = {
    userId:string,
    userAccount:string,
    userName:string,
    userAvatarUrl:string,
    createTime:string
    userRole:string
  }

  type ApiInfoVO = {
    apiId: string;
    apiName: string;
    apiUrl: string;
    apiReqMethod: string;

    /**
     * 接口的响应体类型 PS: 响应体Content-Type的值
     */
    apiRespType: string;
    apiDesc: string;
    /**
     * 接口请求参数 具体格式 [{name:xxx,value:xxx}]
     */
    apiReqHeader: string;
    /**
     * 接口请求参数信息 具体格式 [{name:xxx,type:xxx,required:true,desc:xxxx}]
     */
    apiReqParams: string;

    apiStatus:string;
    /**
     * 接口响应体说明 [{name:xxxx,type:xxx,desc:xxx}]
     */
    apiRespDesc: string;
    apiRespSample: string;
    createTime: string;
    updateTime: string;
  };


}
