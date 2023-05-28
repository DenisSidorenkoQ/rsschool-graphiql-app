import React, { ReactNode, useEffect, useState } from 'react';
import { Alert, Button, Card, Input, Layout, Space } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { useNavigate } from 'react-router-dom';
import { InputStatus } from 'antd/es/_util/statusUtils';
import { auth, logInWithEmailAndPassword, logout, registerWithEmailAndPassword } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LangContext } from '../context/lang';
import { useLanguage } from '../hooks/useLanguage';

interface Props {
  children: ReactNode;
}

export const PageHeader = ({ children }: Props) => {
  const { language, toggleLanguage } = React.useContext(LangContext);
  const navigate = useNavigate();

  const STANDARD_COLOR = 'Indigo';
  const SCROLL_COLOR = 'Blue';
  const STANDARD_HEADER_HEIGHT = '70px';
  const SCROLL_HEADER_HEIGHT = '51px';
  const SIGN_IN_ERROR_STATUS = 'User not exist';
  const SIGN_IN_OK_STATUS = 'Ok';
  const SIGN_UP_ERROR_STATUS = 'User already exists';
  const SIGN_UP_OK_STATUS = 'User created';
  const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const EMAIL_REGEXP =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

  const [headerColor, setHeaderColor] = useState(STANDARD_COLOR);
  const [headerHeight, setHeaderHeight] = useState(STANDARD_HEADER_HEIGHT);
  const [signInIsOpen, setSignInIsOpen] = useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);

  const [signUpEmailStatus, setSignUpEmailStatus] = useState<InputStatus>('');
  const [signUpPasswordStatus, setSignUpPasswordStatus] = useState<InputStatus>('');
  const [signUpNameStatus, setSignUpNameStatus] = useState<InputStatus>('');
  const [signInEmailStatus, setSignInEmailStatus] = useState<InputStatus>('');
  const [signInPasswordStatus, setSignInPasswordStatus] = useState<InputStatus>('');

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpResult, setSignUpResult] = useState(0);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInResult, setSignInResult] = useState(0);

  const login = useLanguage('login');
  const common = useLanguage('common');

  useEffect(() => {
    setSignInPasswordStatus('');
    setSignInEmailStatus('');
    setSignInResult(0);
  }, [signInIsOpen]);

  useEffect(() => {
    setSignUpPasswordStatus('');
    setSignUpEmailStatus('');
    setSignUpResult(0);
  }, [signUpIsOpen]);

  const onChangeSignUpEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpEmail(e.target.value);
  };
  const onChangeSignUpPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpPassword(e.target.value);
  };
  const onChangeSignUpName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpName(e.target.value);
  };
  const onChangeSignInEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInEmail(e.target.value);
  };
  const onChangeSignInPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInPassword(e.target.value);
  };

  const signInSubmit = async () => {
    if (validationSignIn()) {
      setSignInResult(await logInWithEmailAndPassword(signInEmail, signInPassword));
      if (signInResult === 1) {
        setSignInIsOpen(false);
      }
    }
  };

  const signUpSubmit = async () => {
    if (validationSignUp()) {
      setSignUpResult(await registerWithEmailAndPassword(signUpName, signUpEmail, signUpPassword));
      if (signUpResult === 1) {
        setSignUpIsOpen(false);
      }
    }
  };

  const validationSignIn = () => {
    let validCount = 0;

    if (PASSWORD_REGEXP.test(signInPassword)) {
      setSignInPasswordStatus('');
      validCount++;
    } else {
      setSignInPasswordStatus('error');
    }
    if (EMAIL_REGEXP.test(signInEmail)) {
      setSignInEmailStatus('');
      validCount++;
    } else {
      setSignInEmailStatus('error');
    }

    return validCount === 2;
  };

  const validationSignUp = () => {
    let validCount = 0;

    if (PASSWORD_REGEXP.test(signUpPassword)) {
      setSignUpPasswordStatus('');
      validCount++;
    } else {
      setSignUpPasswordStatus('error');
    }
    if (EMAIL_REGEXP.test(signUpEmail)) {
      setSignUpEmailStatus('');
      validCount++;
    } else {
      setSignUpEmailStatus('error');
    }
    if (signUpName !== '') {
      setSignUpNameStatus('');
      validCount++;
    } else {
      setSignUpNameStatus('error');
    }

    return validCount === 3;
  };

  const signInElement = () => {
    return (
      <div style={{ position: 'fixed', top: '5.5%', right: '0%' }}>
        <Card
          style={{
            backgroundColor: headerColor,
            borderColor: headerColor,
            borderRadius: '0% 0% 0% 10%',
          }}
        >
          <Space direction="vertical">
            <h1>{login?.sign_in}</h1>
            <Input
              status={signInEmailStatus}
              placeholder="Email"
              style={{ borderWidth: '2px' }}
              onChange={onChangeSignInEmail}
            />
            {signInEmailStatus !== '' && (
              <Alert
                message={login?.incorrect_email_address}
                type="error"
                showIcon
                style={{ height: '30px' }}
              />
            )}
            <Input
              status={signInPasswordStatus}
              placeholder={login?.password}
              style={{ borderWidth: '2px' }}
              onChange={onChangeSignInPassword}
            />
            {signInPasswordStatus !== '' && (
              <Alert
                message={login?.incorrect_password}
                type="error"
                showIcon
                style={{ height: '50px', whiteSpace: 'pre-wrap' }}
              />
            )}
            {signInResult === -1 && (
              <Alert
                message={SIGN_IN_ERROR_STATUS}
                type="error"
                showIcon
                style={{ height: '50px', whiteSpace: 'pre-wrap' }}
              />
            )}
            {signInResult === 1 && (
              <Alert
                message={SIGN_IN_OK_STATUS}
                type="success"
                showIcon
                style={{ height: '50px', whiteSpace: 'pre-wrap' }}
              />
            )}
            <Button type="primary" onClick={signInSubmit}>
              {login?.submit}
            </Button>
          </Space>
        </Card>
      </div>
    );
  };

  const signUpElement = () => {
    return (
      <div style={{ position: 'fixed', top: '5.5%', right: '0%' }}>
        <Card
          style={{
            backgroundColor: headerColor,
            borderColor: headerColor,
            borderRadius: '0% 0% 0% 10%',
          }}
        >
          <Space direction="vertical">
            <h1>{login?.sign_up}</h1>
            <Input
              status={signUpNameStatus}
              placeholder={login?.name}
              style={{ borderWidth: '2px' }}
              onChange={onChangeSignUpName}
            />
            <Input
              status={signUpEmailStatus}
              placeholder={login?.email}
              style={{ borderWidth: '2px' }}
              onChange={onChangeSignUpEmail}
            />
            {signUpEmailStatus !== '' && (
              <Alert
                message={login?.incorrect_email_address}
                type="error"
                showIcon
                style={{ height: '30px' }}
              />
            )}
            <Input
              status={signUpPasswordStatus}
              placeholder={login?.password}
              style={{ borderWidth: '2px' }}
              onChange={onChangeSignUpPassword}
            />
            {signUpPasswordStatus !== '' && (
              <Alert
                message={login?.incorrect_password}
                type="error"
                showIcon
                style={{ height: '50px', whiteSpace: 'pre-wrap' }}
              />
            )}
            {signUpResult === -1 && (
              <Alert
                message={SIGN_UP_ERROR_STATUS}
                type="error"
                showIcon
                style={{ height: '50px', whiteSpace: 'pre-wrap' }}
              />
            )}
            {signUpResult === 1 && (
              <Alert
                message={SIGN_UP_OK_STATUS}
                type="success"
                showIcon
                style={{ height: '50px', whiteSpace: 'pre-wrap' }}
              />
            )}
            <Button type="primary" onClick={signUpSubmit}>
              {login?.submit}
            </Button>
          </Space>
        </Card>
      </div>
    );
  };

  const changeColor = () => {
    if (window.scrollY >= 60) {
      setHeaderColor(SCROLL_COLOR);
      setHeaderHeight(SCROLL_HEADER_HEIGHT);
    }
    if (window.scrollY < 40) {
      setHeaderColor(STANDARD_COLOR);
      setHeaderHeight(STANDARD_HEADER_HEIGHT);
    }
  };

  window.addEventListener('scroll', changeColor);

  return (
    <Layout className="layout">
      <Header
        style={{
          position: 'sticky',
          display: 'flex',
          justifyContent: 'end',
          top: 0,
          zIndex: 1,
          width: '100%',
          height: headerHeight,
          backgroundColor: headerColor,
        }}
      >
        {useAuthState(auth)[0]?.uid ? (
          <div>
            <Button
              ghost
              onClick={() => {
                navigate('/main');
              }}
            >
              {common?.main_page}
            </Button>
            <Button
              ghost
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              {common?.logout}
            </Button>
          </div>
        ) : (
          <Space>
            <Button
              ghost
              onClick={() => {
                if (signUpIsOpen) setSignUpIsOpen(false);
                if (signInIsOpen) setSignInIsOpen(false);
                if (!signInIsOpen) setSignInIsOpen(true);
              }}
            >
              {login?.sign_in}
            </Button>
            <Button
              ghost
              onClick={() => {
                if (signInIsOpen) setSignInIsOpen(false);
                if (signUpIsOpen) setSignUpIsOpen(false);
                if (!signUpIsOpen) setSignUpIsOpen(true);
              }}
            >
              {login?.sign_up}
            </Button>
          </Space>
        )}
        {signInIsOpen ? signInElement() : ''}
        {signUpIsOpen ? signUpElement() : ''}
        <Space>
          <Button style={{ marginLeft: '50px' }} ghost onClick={toggleLanguage}>
            {language.toUpperCase()}
          </Button>
        </Space>
      </Header>
      <Content style={{ background: 'white' }}>
        <div className="site-layout-content" style={{ background: 'white' }}>
          {children}
        </div>
      </Content>
    </Layout>
  );
};
