import React from 'react';
import { Button } from 'antd';

const FormButton = ({
  children,
  fullWidth = false,
  loading = false,
  type = 'primary',
  htmlType = 'button',
  className = '',
  ...rest
}) => {
  return (
    <Button
      type={type}
      htmlType={htmlType}
      loading={loading}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default FormButton; 