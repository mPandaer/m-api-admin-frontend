import React, { useEffect } from 'react';
import { Form, Button } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea, ProFormRadio, ProFormSwitch, ProFormGroup, ProForm } from '@ant-design/pro-components';
import styles from './style.less';

interface UpdateApiInfoFormProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  onCancel: () => void;
  onFinish: (values: API.UpdateApiInfoPO) => Promise<void>;
  initialValues?: API.ApiInfoVO;
}

/**
 * 更新接口信息表单
 * @constructor
 */
const UpdateApiInfoForm = ({ visible, setVisible, onCancel, onFinish, initialValues }: UpdateApiInfoFormProps) => {
  const [form] = Form.useForm<API.ApiInfoVO>();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues ?? {});
    }
  }, [visible, initialValues, form]);

  return (
    <ModalForm<API.ApiInfoVO>
      title={"更新接口信息"}
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
        values.apiId = initialValues?.apiId ?? ""
        await onFinish(values)
      }}
    >

      <ProFormGroup title={"接口基本信息"}>
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
      </ProFormGroup>

      <ProFormGroup title={"接口请求头信息"} collapsible={true}>
        <Form.List name="apiReqHeader">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div className={styles.item} key={key}>
                  <ProFormGroup>
                    <ProFormText
                      label={"字段名"}
                      name={[name, "name"]}
                      placeholder={"请输入"}
                    />
                    <ProFormText
                      label={"字段值"}
                      name={[name, "value"]}
                      placeholder={"请输入"}
                    />
                    <ProForm.Item>
                      <Button type="dashed" onClick={() => add({}, index + 1)} block icon={<PlusCircleOutlined />}>
                        向下插入
                      </Button>
                      <Button type="dashed" onClick={() => remove(name)} block icon={<MinusCircleOutlined />}>
                        删除此项
                      </Button>
                    </ProForm.Item>
                  </ProFormGroup>
                </div>
              ))}
              <ProForm.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusCircleOutlined />}>
                  新增
                </Button>
              </ProForm.Item>
            </>
          )}
        </Form.List>
      </ProFormGroup>

      <ProFormGroup title={"接口请求参数"} collapsible={true}>
        <Form.List name="apiReqParams">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div className={styles.item} key={key}>
                  <ProFormGroup>
                    <ProFormText
                      label={"参数名"}
                      name={[name, "name"]}
                      placeholder={"请输入"}
                    />
                    <ProFormText
                      label={"参数类型"}
                      name={[name, "type"]}
                      placeholder={"请输入"}
                    />
                    <ProFormText
                      label={"描述"}
                      name={[name, "desc"]}
                      placeholder={"请输入"}
                    />
                    <ProFormSwitch
                      label={"是否必填"}
                      name={[name, "require"]}
                      initialValue={true}
                    />
                    <ProForm.Item>
                      <Button type="dashed" onClick={() => add({}, index + 1)} block icon={<PlusCircleOutlined />}>
                        向下插入
                      </Button>
                      <Button type="dashed" onClick={() => remove(name)} block icon={<MinusCircleOutlined />}>
                        删除此项
                      </Button>
                    </ProForm.Item>
                  </ProFormGroup>
                </div>
              ))}
              <ProForm.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusCircleOutlined />}>
                  新增
                </Button>
              </ProForm.Item>
            </>
          )}
        </Form.List>
      </ProFormGroup>

      <ProFormGroup title={"接口响应体信息描述"} collapsible={true}>
        <Form.List name="apiRespDesc">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div className={styles.item} key={key}>
                  <ProFormGroup>
                    <ProFormText
                      label={"参数名"}
                      name={[name, "name"]}
                      placeholder={"请输入"}
                    />
                    <ProFormText
                      label={"参数类型"}
                      name={[name, "type"]}
                      placeholder={"请输入"}
                    />
                    <ProFormText
                      label={"描述"}
                      name={[name, "desc"]}
                      placeholder={"请输入"}
                    />
                    <ProForm.Item>
                      <Button type="dashed" onClick={() => add({}, index + 1)} block icon={<PlusCircleOutlined />}>
                        向下插入
                      </Button>
                      <Button type="dashed" onClick={() => remove(name)} block icon={<MinusCircleOutlined />}>
                        删除此项
                      </Button>
                    </ProForm.Item>
                  </ProFormGroup>
                </div>
              ))}
              <ProForm.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusCircleOutlined />}>
                  新增
                </Button>
              </ProForm.Item>
            </>
          )}
        </Form.List>
      </ProFormGroup>

      <ProFormGroup title={"接口响应示例"}>
        <ProFormTextArea
          name={"apiRespSample"} width={"xl"} />
      </ProFormGroup>

    </ModalForm>
  );
};

export default UpdateApiInfoForm;
