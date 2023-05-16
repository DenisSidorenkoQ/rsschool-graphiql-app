import React from 'react';
import JsonFormatter from 'react-json-formatter';

type ResponsePropsType = {
  res: JSON;
};

export const ResponseView = (props: ResponsePropsType) => {
  return (
    <JsonFormatter
      json={JSON.stringify(props.res)}
      tabWith={4}
      jsonStyle={{
        propertyStyle: { color: 'red' },
        stringStyle: { color: 'green' },
        numberStyle: { color: 'darkorange' },
        style: { padding: '15px' },
      }}
    />
  );
};
