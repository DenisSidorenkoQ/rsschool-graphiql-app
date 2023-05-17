import React from 'react';
import './Main.css';
import { Button, Input, notification } from 'antd';
import { InputStatus } from 'antd/es/_util/statusUtils';
import githubService from '../../service/GithubService';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const Main = () => {
  const REQUEST_ERROR_MESSAGE = 'Something wrong';
  const REQUEST_OK_MESSAGE = 'Request received';

  const [graphQLRequest, setGraphQLRequest] = React.useState(`__typename ## Placeholder value`);
  const [githubToken, setGithubToken] = React.useState<InputStatus>('');
  const [validateGithubToken, setValidateGithubToken] = React.useState(false);
  const [response, setResponse] = React.useState('');
  const [api, contextHolder] = notification.useNotification();

  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: { Authorization: `bearer ${githubToken}` },
  });

  const openErrorNotification = () => {
    api.error({
      message: `Error`,
      description: `${REQUEST_ERROR_MESSAGE}`,
      placement: 'topRight',
    });
  };

  const openOkNotification = () => {
    api.success({
      message: `OK`,
      description: `${REQUEST_OK_MESSAGE}`,
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

  return (
    <>
      {contextHolder}
      {!validateGithubToken && (
        <div style={{ textAlign: 'center', alignItems: 'center' }}>
          <span>
            Before proceeding further please validate your token. To generate token refer{' '}
            <a href="https://github.com/settings/tokens">this</a>.
          </span>
          <Input
            status={githubToken}
            placeholder="Token"
            style={{ borderWidth: '2px' }}
            onChange={onChangeGithubToken}
          />
          <Button type="primary" onClick={accessTokenSubmit}>
            Submit
          </Button>
        </div>
      )}
      {validateGithubToken && (
        <>
          <div className="wrapper">
            <div id="codeEditor">
              <div style={{ textAlign: 'center', fontSize: 20, borderRadius: '10px' }}>
                <span>Request</span>
              </div>
              <CodeEditor
                value={graphQLRequest}
                language="js"
                placeholder="Please enter GraphQL"
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
            <div id="response"></div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Button type="primary" onClick={requestSubmit}>
              Send
            </Button>
          </div>
        </>
      )}
    </>
  );
};
