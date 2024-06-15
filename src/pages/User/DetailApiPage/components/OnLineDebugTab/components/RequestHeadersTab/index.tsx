import { RequestHeaderItem } from '@/type';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { ProFormList } from '@ant-design/pro-form/lib';

const RequestHeadersTab = () => {
  return (
    <ProFormList<RequestHeaderItem>
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
        creatorButtonText: '新建请求头',
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
            <ProFormText name={[field.name, 'name']} addonBefore={'请求头字段名: '} width="md" />
            <ProFormText name={[field.name, 'value']} addonBefore={'请求头字段值: '} width="md" />
          </ProForm.Group>
        </>
      )}
    </ProFormList>
  );
};

export default RequestHeadersTab;
