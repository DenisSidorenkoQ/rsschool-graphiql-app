import React from 'react';
import JsonFormatter from 'react-json-formatter';

import { useLanguage } from '../hooks/useLanguage';

type ResponsePropsType = {
  res: string;
};

export const ResponseView = (props: ResponsePropsType) => {
  const editor = useLanguage('editor');

  return (
    <>
      <div style={{ textAlign: 'center', fontSize: 20 }}>
        <span>{editor?.response}</span>
      </div>
      <JsonFormatter
        json={JSON.stringify(props.res)}
        tabWith={4}
        jsonStyle={{
          propertyStyle: { color: 'red' },
          stringStyle: { color: 'green' },
          numberStyle: { color: 'darkorange' },
          style: {
            padding: '15px',
            backgroundColor: 'oldlace',
            border: '2px solid black',
            borderRadius: '10px',
          },
        }}
      />
    </>
  );
};
