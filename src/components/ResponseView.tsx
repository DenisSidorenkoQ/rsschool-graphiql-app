import React from 'react';
import JsonFormatter from 'react-json-formatter';

type ResponsePropsType = {
  res: JSON;
};

export const ResponseView = (props: ResponsePropsType) => {
  return (
    <>
    <div style={{textAlign: 'center', fontSize: 20}}><span>Response</span></div>
    <JsonFormatter
      json={JSON.stringify(props.res)}
      tabWith={4}
      jsonStyle={{
        propertyStyle: { color: 'red' },
        stringStyle: { color: 'green' },
        numberStyle: { color: 'darkorange' },
        style: { 
          padding: '15px',
          backgroundColor: "oldlace",
          border: '2px solid black',
          borderRadius: '10px'
        },
      }}
    />
    </>
  );
};
