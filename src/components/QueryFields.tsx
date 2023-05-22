import { Button, List, Row, Typography } from 'antd';
import React from 'react';
import { QueryFieldsProps } from 'types/types';

export const QueryFields = (props: QueryFieldsProps) => {
  return (
    <Row>
      <Button
        type="link"
        onClick={(e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) =>
          props.showDrawerArgs(e)
        }
        style={{ padding: 0 }}
      >
        {props.el.name}
      </Button>

      <List style={{ paddingTop: 5 }}>
        (
        {props.el.args.map((el, index) => {
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
