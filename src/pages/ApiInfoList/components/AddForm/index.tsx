import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormRadio, ProFormSwitch,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components';
import {Button, Form, message} from "antd";
import {useState} from "react";
import {MinusCircleOutlined} from "@ant-design/icons";
import style from "./style.less";
import {index} from "@umijs/utils/compiled/cheerio/lib/api/traversing";

interface AddApiInfoFormProps {
  visible:boolean;
  setVisible:(value:boolean) => void;
  onCancel: () => void;
  onFinish: (values:API.AddApiInfoPO) => Promise<void>;
}

interface ApiReqHeaderItem {
  key:string,
  name:string,
  value:string
}

interface ApiReqParamItem {
  key:string,
  name:string,
  type:string,
  require:boolean,
  desc:string,
}

interface ApiRespBodyDescItem {
  key:string,
  name:string,
  type:string,
  desc:string,
}

/**
 * 添加接口信息表单
 * @constructor
 */
const AddApiInfoForm = ({visible,setVisible,onCancel,onFinish}:AddApiInfoFormProps) => {
  const [form] = Form.useForm<API.AddApiInfoPO>();
  const [apiReqHeaderItems,setApiReqHeaderItems] = useState<number[]>([0])
  const [apiReqParamItems,setApiReqParamItems] = useState<number[]>([0])
  const [apiRespBodyDescItems,setApiRespBodyDescItems] = useState<number[]>([0])



  const appendApiReqHeaderItem = () => {
    setApiReqHeaderItems([...apiReqHeaderItems,apiReqHeaderItems.length])
  };

  const appendApiReqParamItem = () => {
    setApiReqParamItems([...apiReqParamItems,apiReqParamItems.length])
  }

  const appendApiRespBodyDescItem = () => {
    setApiRespBodyDescItems([...apiRespBodyDescItems,apiRespBodyDescItems.length])
  }

  return (
    <ModalForm<API.AddApiInfoPO>
    title={"新增接口信息"}
    form={form}
    open={visible}
    onOpenChange={setVisible}
    autoFocusFirstInput
    width={"80%"}
    modalProps={{
      destroyOnClose: true,
      onCancel: onCancel,
    }}
    onFinish={async (values) => {
      await onFinish(values)
    }}
    >

      <ProForm.Group
      title={"接口基本信息"}
      >
        <ProFormText
          width="md"
          name="apiName"
          label="接口名字"
          placeholder="请输入名称"
        />

        <ProFormText
          width="md"
          name="apiDesc"
          label="接口描述"
          placeholder="请输入描述信息"
        />

        <ProFormText
          width="md"
          name="apiUrl"
          label="接口地址"
          placeholder="请输入URL"
        />

        <ProFormRadio.Group
          name="apiReqMethod"
          label="接口请求方式"
          options={[
            {
              label: 'GET',
              value: 'GET',
            },
            {
              label: 'POST',
              value: 'POST',
            },
          ]}
        />

        <ProFormText
          width="md"
          name="apiRespType"
          label="响应类型"
          placeholder="请输入响应类型"
        />

      </ProForm.Group>

      <ProForm.Group title={"接口请求头信息"} collapsible={true} extra={<Button type={"link"} onClick={appendApiReqHeaderItem}>新增</Button>}>
        {
          apiReqHeaderItems.map((item,index) => (
            <div className={style.item}>
              <MinusCircleOutlined className={style.option} onClick={() => message.success(item)}/>
                <ProForm.Group key={item}>
                  <ProFormText
                    label={"字段名"}
                    name={["apiReqHeader",index,"name"]}
                    placeholder={"请输入"}
                  />
                  <ProFormText
                    label={"字段值"}
                    name={["apiReqHeader",index,"value"]}
                    placeholder={"请输入"}
                  />
                </ProForm.Group>
            </div>

          ))
        }

      </ProForm.Group>

      <ProForm.Group title={"接口请求参数"} collapsible={true} extra={<Button type={"link"} onClick={appendApiReqParamItem}>新增</Button>}>

        {
          apiReqParamItems.map((item,index) => (
            <div className={style.item}>
              <MinusCircleOutlined className={style.option} onClick={() => message.success(item)}/>
                <ProForm.Group key={item}>
                  <ProFormText
                    label={"参数名"}
                    name={["apiReqParams",index,"name"]}
                    placeholder={"请输入"}
                  />
                  <ProFormText
                    label={"参数类型"}
                    name={["apiReqParams",index,"type"]}
                    placeholder={"请输入"}
                  />

                  <ProFormText
                    label={"描述"}
                    name={["apiReqParams",index,"desc"]}
                    placeholder={"请输入"}
                  />

                  <ProFormSwitch
                    label={"是否必填"}
                    name={["apiReqParams",index,"require"]}
                    initialValue={"true"}
                  />
                </ProForm.Group>
            </div>

          ))
        }

      </ProForm.Group>

      <ProForm.Group title={"接口响应体信息描述"} collapsible={true} extra={<Button type={"link"} onClick={appendApiRespBodyDescItem}>新增</Button>}>
        {
          apiRespBodyDescItems.map((item,index) => (
            <div className={style.item}>
              <MinusCircleOutlined className={style.option} onClick={() => message.success(item)}/>
                <ProForm.Group key={item}>
                  <ProFormText
                    label={"参数名"}
                    name={["apiRespDesc",index,"name"]}
                    placeholder={"请输入"}
                  />
                  <ProFormText
                    label={"参数类型"}
                    name={["apiRespDesc",index,"type"]}
                    placeholder={"请输入"}
                  />

                  <ProFormText
                    label={"描述"}
                    name={["apiRespDesc",index,"desc"]}
                    placeholder={"请输入"}
                  />

                </ProForm.Group>
            </div>

          ))
        }

      </ProForm.Group>

      <ProForm.Group title={"接口响应示例"}>
        <ProFormTextArea
        name={"apiRespSample"} width={"xl"}/>
      </ProForm.Group>



    </ModalForm>
  );
};

export default AddApiInfoForm;
