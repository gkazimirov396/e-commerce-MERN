import { SendOutlined } from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';

import './NewsLetter.scss';

const NewsLetter = () => {
  return (
    <div className="news-letter">
      <Typography.Title level={1}>Newsletter</Typography.Title>
      <Typography.Paragraph className="description">
        Get timely updates from your favorite products.
      </Typography.Paragraph>
      <div>
        <Input placeholder="Your E-mail" />
        <Button type="primary" className="send-button" icon={<SendOutlined />} />
      </div>
    </div>
  );
};

export default NewsLetter;
