import React from 'react';
import { Button, Input, Row, Tabs, notification } from 'antd';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import './Main.css';

import githubService from '../../service/GithubService';

import { ResponseView } from '../../components/ResponseView';
import { useLanguage } from '../../hooks/useLanguage';
import { DocumentationDrawer } from '../../components/DocumentationDrawer';

const headerGraphqlRequest = `{'Content-type': 'application/json'}`;

export const Main = () => {
  const editor = useLanguage('editor');

  const [graphQLRequest, setGraphQLRequest] = React.useState(`__typename ## Placeholder value`);
  const [githubToken, setGithubToken] = React.useState(localStorage.getItem('githubToken'));
  const [variables, setVariables] = React.useState(`{}`);
  const [validateGithubToken, setValidateGithubToken] = React.useState(false);
  const [response, setResponse] = React.useState('');
  const [api, contextHolder] = notification.useNotification();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: { Authorization: `bearer ${githubToken}` },
  });

  const onChangeVariables = React.useCallback((value: string) => {
    setVariables(value);
  }, []);

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
      localStorage.setItem('githubToken', githubToken);
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
          variables: JSON.parse(variables),
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

  const tabsItems = [
    {
      key: '1',
      label: `${editor?.variables}`,
      children: (
        <CodeEditor
          value={variables}
          language="graphql"
          onChange={(evn) => onChangeVariables(evn.target.value)}
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
      ),
    },
    {
      key: '2',
      label: `${editor?.headers}`,
      children: (
        <CodeEditor
          value={headerGraphqlRequest}
          language="graphql"
          readOnly={true}
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
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      {!validateGithubToken && (
        <div style={{ textAlign: 'center', alignItems: 'center' }}>
          <span>
            {editor?.validate} <a href="https://github.com/settings/tokens"> {editor?.link}</a>.
          </span>
          <Input
            value={githubToken}
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
            <Button onClick={onShowDrawer}>{editor?.docs}</Button>
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
                language="graphql"
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
              <Tabs centered items={tabsItems} />
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
