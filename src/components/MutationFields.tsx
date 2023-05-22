import { Button, List, Row, Typography } from 'antd';
import React from 'react';

export const MutationFields = (props) => {
  return (
    <Row>
      <Button
        type="link"
        onClick={(e) => props.showDrawerArgs(e)}
        style={{ padding: 0 }}
      >
        {props.el.name}
      </Button>

      <List style={{ paddingTop: 5 }}>
        (
        {props.el.type?.fields.map((el, index) => {
          return (
            <li key={index}>
              <Typography.Text type="success">{props.el.name}</Typography.Text>
            </li>
          );
        })}
        ):<Typography.Text type="warning">{props.el.description}</Typography.Text>
      </List>
    </Row>
  );
};
