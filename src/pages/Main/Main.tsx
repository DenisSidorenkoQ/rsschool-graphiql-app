import React from 'react';
import { Button, Input, Row, notification } from 'antd';
import { InputStatus } from 'antd/es/_util/statusUtils';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import CodeEditor from '@uiw/react-textarea-code-editor';
import './Main.css';

import githubService from '../../service/GithubService';

import { ResponseView } from '../../components/ResponseView';
import { useLanguage } from '../../hooks/useLanguage';
import { DocumentationDrawer } from '../../components/DocumentationDrawer';

export const Main = () => {
  const editor = useLanguage('editor');

  const [graphQLRequest, setGraphQLRequest] = React.useState(`__typename ## Placeholder value`);
  const [githubToken, setGithubToken] = React.useState<InputStatus>('');
  const [validateGithubToken, setValidateGithubToken] = React.useState(false);
  const [response, setResponse] = React.useState('');
  const [api, contextHolder] = notification.useNotification();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: { Authorization: `bearer ${githubToken}` },
  });

  const openErrorNotification = () => {
    api.error({
      message: `Error`,
      description: `${editor?.request_error_message}`,
      placement: 'topRight',
    });
  };

  const openOkNotification = () => {
    api.success({
      message: `OK`,
      description: `${editor?.request_ok_message}`,
      placement: 'topRight',
    });
  };

  const onChangeGithubToken = (e) => {
    setGithubToken(e.target.value);
  };

  const accessTokenSubmit = async () => {
    if (await githubService.validToken(githubToken)) {
      setValidateGithubToken(true);
    } else {
      setValidateGithubToken(false);
    }
  };

  const requestSubmit = async () => {
    try {
      await client
        .query({
          query: gql`
            ${graphQLRequest}
          `,
        })
        .then((response) => setResponse(response.data));
      openOkNotification();
    } catch (e) {
      openErrorNotification();
    }
  };

  const onShowDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      {contextHolder}
      {!validateGithubToken && (
        <div style={{ textAlign: 'center', alignItems: 'center' }}>
          <span>
            {editor?.validate} <a href="https://github.com/settings/tokens"> {editor?.link}</a>.
          </span>
          <Input
            status={githubToken}
            placeholder={editor?.token}
            style={{ borderWidth: '2px' }}
            onChange={onChangeGithubToken}
          />
          <Button type="primary" onClick={accessTokenSubmit}>
            {editor?.submit}
          </Button>
        </div>
      )}
      {validateGithubToken && (
        <>
          <Row align="middle" justify="end">
            <Button onClick={onShowDrawer}>Docs</Button>
            <DocumentationDrawer
              openDrawer={openDrawer}
              onCloseDrawer={onCloseDrawer}
              githubToken={githubToken}
            />
          </Row>

          <div className="wrapper">
            <div id="codeEditor">
              <div style={{ textAlign: 'center', fontSize: 20, borderRadius: '10px' }}>
                <span>{editor?.request}</span>
              </div>
              <CodeEditor
                value={graphQLRequest}
                language="js"
                placeholder={editor?.enter_graphql}
                onChange={(evn) => setGraphQLRequest(evn.target.value)}
                padding={10}
                style={{
                  fontSize: 14,
                  backgroundColor: 'oldlace',
                  border: '2px solid black',
                  borderRadius: '10px',
                  fontFamily:
                    'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              />
            </div>
            <div id="response">
              <ResponseView res={response} />
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Button type="primary" onClick={requestSubmit}>
              {editor?.send}
            </Button>
          </div>
        </>
      )}
    </>
  );
};
