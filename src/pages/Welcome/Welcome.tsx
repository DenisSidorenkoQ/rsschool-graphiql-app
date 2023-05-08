import { Col, Image, Row, Space } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import React from 'react';
import seminar from '../../assets/Seminar-rafiki.png';
import landing from '../../assets/landing.png';
import optimization from '../../assets/optimization.png';
import workflow from '../../assets/workflow.png';

export const Welcome: React.FC = () => {
  return (
    <Space direction={'vertical'} style={{ padding: '0 50px' }}>
      <Title level={3} style={{ textAlign: 'center', padding: '40px' }}>
        Welcome to our project page!
      </Title>

      <Row justify="space-around" align="middle">
        <Col style={{ textAlign: 'center' }} xs={24} sm={24} md={12} lg={12}>
          <Image width={300} src={seminar} preview={false} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Paragraph strong style={{ textAlign: 'center' }}>
            We are{' '}
            <a href="https://github.com/DenisSidorenkoQ" target="_blank" rel="noreferrer">
              DenisSidorenkoQ
            </a>
            ,{' '}
            <a href="https://github.com/kalinkinfiz" target="_blank" rel="noreferrer">
              KalinkinFiz
            </a>
            , and{' '}
            <a href="https://github.com/alexandr2075" target="_blank" rel="noreferrer">
              Alexandr2075
            </a>
            , and we are excited to present our latest project: a GraphiQL playground/IDE for
            GraphQL requests.
          </Paragraph>
        </Col>
      </Row>

      <Row justify="space-around" align={'middle'}>
        <Col xs={24} sm={24} md={12} lg={14}>
          <Paragraph strong style={{ textAlign: 'center' }}>
            Our team consists of experienced developers with a passion for creating innovative
            solutions to complex problems. We believe that GraphQL is the future of APIs, and we are
            committed to building tools that make it easier for developers to work with this
            powerful technology.
          </Paragraph>
        </Col>
        <Col style={{ textAlign: 'center' }} xs={24} sm={24} md={12} lg={10}>
          <Image width={300} src={optimization} preview={false} />
        </Col>
      </Row>

      <Row justify="space-around" align="middle">
        <Col style={{ textAlign: 'center' }} xs={24} sm={24} md={12} lg={12}>
          <Image width={300} src={landing} preview={false} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Paragraph strong style={{ textAlign: 'center' }}>
            This project is part of the RS SCHOOL React Course, an intensive training program
            designed to help developers master the latest front-end technologies. As part of this
            program, we have been working hard to create a tool that will help developers of all
            levels to experiment with GraphQL queries and learn more about this exciting technology.
          </Paragraph>
        </Col>
      </Row>

      <Row justify="space-around" align={'middle'}>
        <Col xs={24} sm={24} md={12} lg={14}>
          <Paragraph strong style={{ textAlign: 'center' }}>
            Whether you are an experienced GraphQL developer or just getting started with this
            powerful tool, we believe that our GraphiQL playground/IDE will be a valuable addition
            to your toolkit. So take a look around, try out some queries, and let us know what you
            think!
          </Paragraph>
        </Col>
        <Col style={{ textAlign: 'center' }} xs={24} sm={24} md={12} lg={10}>
          <Image width={300} src={workflow} preview={false} />
        </Col>
      </Row>
    </Space>
  );
};
