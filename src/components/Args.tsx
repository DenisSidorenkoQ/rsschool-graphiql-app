import { Drawer, Space, Typography } from 'antd';
import React from 'react';
import { ArgsProps } from 'types/types';

export const Args = (props: ArgsProps) => {
  return (
    <Drawer
      title="Args"
      width={500}
      placement="right"
      onClose={props.closeArgs}
      open={props.openArgs}
    >
      <p>{props.queryNameArgs}</p>
      <Space direction="vertical" size={'large'}>
        {props.currentArgs.map((el, index) => {
          return (
            <Space key={index} direction="vertical">
              <Typography.Text type="success">{el.name}</Typography.Text>
              <Typography.Text type="warning">{el.description}</Typography.Text>
            </Space>
          );
        })}
      </Space>
    </Drawer>
  );
};
