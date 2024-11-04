import Footer from '@/components/Footer';
import {login} from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {Alert, Divider, message, Space, Tabs} from 'antd';
import React, {useState} from 'react';
import {history, Link, useModel} from 'umi';
import styles from './index.less';
import {Night_City_LINK, SYSTEM_LOGO} from '@/constants';

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({
        ...values,
        type,
      });
      if (user) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        const {redirect} = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(user);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  const {status, type: loginType} = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="夜之城用户中心"
          subTitle={<p><a href={Night_City_LINK} target="_blank" rel="noreferrer">猜猜夜之城的传奇都在哪扎堆？</a></p>

          }
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'ID 密码登录'}/>
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码'}/>
          )}
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
                    message: '连ID都不输入就想登录？真当自己是黑客？',
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
            </>
          )}

          {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误"/>}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space split={<Divider type={"vertical"}/>}> <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
              <Link to={'/user/register'}>新用户注册</Link>
              <a
                style={{
                  float: 'right',
                }}
                target="_blank"
              >
                忘记密码
              </a></Space>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  )
    ;
};
export default Login;
