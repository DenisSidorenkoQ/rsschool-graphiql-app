import React, { ReactNode } from 'react';
import { Avatar, Col, Row, Space, Typography, theme, Image, Layout } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import den from '../assets/den.webp';
import max from '../assets/max.png';
import al from '../assets/al.png';
import rs from '../assets/rs.svg';
import copy from '../assets/copy.png';

const { useToken } = theme;

interface Props {
  children: ReactNode;
}

export const PageFooter = ({ children }: Props) => {
  const { token } = useToken();

  return (
    <Layout className="layout">
      <Content style={{ background: 'white', padding: '0 50px' }}>
        <div className="site-layout-content" style={{ background: 'white' }}>
          {children}
        </div>
      </Content>
      <Footer style={{ padding: '0' }}>
        <Row justify="center" style={{ backgroundColor: token['orange-7'], padding: '20px' }}>
          <Col xs={8} sm={6} md={4} lg={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="https://github.com/DenisSidorenkoQ" target="_blank" rel="noreferrer">
              <Space direction="vertical" align="center">
                <Avatar
                  src={den}
                  size={100}
                  shape="square"
                  style={{ borderColor: token['orange-4'], backgroundColor: token['orange-6'] }}
                />
                <Typography.Text>DenisSidorenkoQ</Typography.Text>
              </Space>
            </a>
          </Col>

          <Col xs={8} sm={6} md={4} lg={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="https://github.com/kalinkinfiz" target="_blank" rel="noreferrer">
              <Space direction="vertical" align="center">
                <Avatar
                  src={max}
                  size={100}
                  shape="square"
                  style={{ borderColor: token['orange-4'], backgroundColor: token['orange-6'] }}
                />
                <Typography.Text>KalinkinFiz</Typography.Text>
              </Space>
            </a>
          </Col>

          <Col xs={8} sm={6} md={4} lg={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="https://github.com/alexandr2075" target="_blank" rel="noreferrer">
              <Space direction="vertical" align="center">
                <Avatar
                  src={al}
                  size={100}
                  shape="square"
                  style={{ borderColor: token['orange-4'], backgroundColor: token['orange-6'] }}
                />
                <Typography.Text>Alexandr2075</Typography.Text>
              </Space>
            </a>
          </Col>
        </Row>

        <Row
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: token['orange-7'],
            padding: '10px',
          }}
        >
          <Col
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
              <Image width={60} src={rs} preview={false} />
            </a>
            <Space style={{ marginTop: '5px' }}>
              <Image width={14} src={copy} preview={false} />
              <Typography.Text>2023</Typography.Text>
            </Space>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};
