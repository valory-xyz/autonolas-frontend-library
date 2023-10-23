import React from 'react';
import { Button, Row, Col } from 'antd';
import { notifyError } from './functions';

export default {
  title: 'Functions',
};

export const NotifyError = (): JSX.Element => {
  return (
    <Row gutter={[16, 0]}>
      <Col span={3}>
        <Button onClick={() => notifyError('Error Message Only')}>
          Notify Error Only
        </Button>
      </Col>

      <Col span={3}>
        <Button
          onClick={() => notifyError('Error Message', 'Error Description')}
        >
          Notify Error and Description
        </Button>
      </Col>
    </Row>
  );
};
