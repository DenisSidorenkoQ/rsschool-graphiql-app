import { Col, Image, Row, Space } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import React from 'react';
import seminar from '../../assets/Seminar-rafiki.png';
import landing from '../../assets/landing.png';
import optimization from '../../assets/optimization.png';
import workflow from '../../assets/workflow.png';

import { useLanguage } from '../../hooks/useLanguage';

export const Welcome: React.FC = () => {
  const home = useLanguage('home');

  return (
    <Space direction={'vertical'} style={{ padding: '0 50px' }}>
      <Title level={3} style={{ textAlign: 'center', padding: '40px' }}>
        {home?.welcome}
      </Title>

      <Row justify="space-around" align="middle">
        <Col style={{ textAlign: 'center' }} xs={24} sm={24} md={12} lg={12}>
          <Image width={300} src={seminar} preview={false} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Paragraph strong style={{ textAlign: 'center' }}>
            {home?.we_are}{' '}
            <a href="https://github.com/DenisSidorenkoQ" target="_blank" rel="noreferrer">
              DenisSidorenkoQ
            </a>
            ,{' '}
            <a href="https://github.com/kalinkinfiz" target="_blank" rel="noreferrer">
              KalinkinFiz
            </a>
            ,{' '}
            <a href="https://github.com/alexandr2075" target="_blank" rel="noreferrer">
              Alexandr2075
            </a>
            , {home?.latest_project}
          </Paragraph>
        </Col>
      </Row>

      <Row justify="space-around" align={'middle'}>
        <Col xs={24} sm={24} md={12} lg={14}>
          <Paragraph strong style={{ textAlign: 'center' }}>
            {home?.team}
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
            {home?.project}
          </Paragraph>
        </Col>
      </Row>

      <Row justify="space-around" align={'middle'}>
        <Col xs={24} sm={24} md={12} lg={14}>
          <Paragraph strong style={{ textAlign: 'center' }}>
            {home?.think}
          </Paragraph>
        </Col>
        <Col style={{ textAlign: 'center' }} xs={24} sm={24} md={12} lg={10}>
          <Image width={300} src={workflow} preview={false} />
        </Col>
      </Row>
    </Space>
  );
};
