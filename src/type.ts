export interface ApiRequest {
  url: string;
  method: string;
  params: RequestParamItem[];
  headers: RequestHeaderItem[];
  body: string;
}

export interface RequestParamItem {
  id: string;
  name: string;
  value: string;
}

export interface RequestHeaderItem {
  id: string;
  name: string;
  value: string;
}

export interface DetailApiInfoProps {
  values: API.ApiInfoVO;
}
