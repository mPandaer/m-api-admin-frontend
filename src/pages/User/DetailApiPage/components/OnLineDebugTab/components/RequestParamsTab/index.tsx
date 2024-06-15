import { RequestParamItem } from '@/type';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { ProFormList } from '@ant-design/pro-form/lib';

const RequestParamsTab = () => {
  return (
    <ProFormList<RequestParamItem>
      initialValue={[
        {
          id: Date.now() + '',
          name: '',
          value: '',
        },
      ]}
      name="params"
      creatorButtonProps={{
        position: 'bottom',
        creatorButtonText: '新建参数',
      }}
      creatorRecord={() => ({
        id: Date.now() + '',
        name: '',
        value: '',
      })}
    >
      {(field) => (
        <>
          <ProForm.Group key={field.key}>
            <ProFormText name={[field.name, 'name']} addonBefore={'参数名: '} width="md" />
            <ProFormText name={[field.name, 'value']} addonBefore={'参数值: '} width="md" />
          </ProForm.Group>
        </>
      )}
    </ProFormList>
  );
};

export default RequestParamsTab;
