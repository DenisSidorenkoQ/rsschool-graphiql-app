import { Button, Divider, List, Row, Typography } from 'antd';
import React from 'react';
import { MutationFieldsProps } from 'types/types';

export const MutationFields = (props: MutationFieldsProps) => {
  return (
    <Row>
      <Button type="link" onClick={props.showDrawerArgs} style={{ padding: 0 }}>
        {props.el.name}
      </Button>

      <List style={{ paddingTop: 5 }} split={false}>
        (
        <List.Item>
          <Typography.Text type="success">{props.el.name}</Typography.Text>
        </List.Item>
        ):<Typography.Text type="warning">{props.el.description}</Typography.Text>
        <Divider />
      </List>
    </Row>
  );
};
