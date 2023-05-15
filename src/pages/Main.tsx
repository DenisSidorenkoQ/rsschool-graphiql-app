import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

export const Main = () => {
    const [code, setCode] = React.useState(
        `function add(a, b) {\n  return a + b;\n}`
    );

  return (
    <>
        <CodeEditor
            value={code}
            language="js"
            placeholder="Please enter GraphQL"
            onChange={(evn) => setCode(evn.target.value)}
            padding={10}
            style={{
                fontSize: 12,
                backgroundColor: "gray",
                fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
            }}
        />
    </>
  );
};
