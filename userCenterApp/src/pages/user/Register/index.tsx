import Footer from '@/components/Footer';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import styles from './index.less';
import {Night_City_LINK, SYSTEM_LOGO} from '@/constants';
import {register} from "@/services/ant-design-pro/api";


const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  //表单提交
  const handleSubmit = async (values: API.RegisterParams) => {
    //校验
    const {password, checkPassword} = values;
    if (password !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    try {
      // 注册
      const id = await register(values);
      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;

        history.push({
          query,
          pathname: '/user/login',
        });
        return;
      }
      // 如果失败去设置用户错误信息
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={
            {
              searchConfig: {
                submitText: '注册'
              }
            }}
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="夜之城用户中心"
          subTitle={<a href={Night_City_LINK} target="_blank" rel="noreferrer">猜猜夜之城的传奇都在哪扎堆？</a>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'ID 密码注册'}/>
          </Tabs>


          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'勇士你好，请输入你的ID'}
                rules={[
                  {
                    required: true,
                    message: '连ID都不输入，你还是个传奇嘛！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'芝麻开门，先给密码'}
                rules={[
                  {
                    required: true,
                    message: '英雄，你自己的密码都会忘嘛？？',
                  }, {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于8',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'输入二次密码'}
                rules={[
                  {
                    required: true,
                    message: '必须写！！',
                  }, {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于8',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Register;
