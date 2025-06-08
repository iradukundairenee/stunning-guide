import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd/lib/button';

interface FormButtonProps extends ButtonProps {
  fullWidth?: boolean;
  loading?: boolean;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  htmlType?: 'button' | 'submit' | 'reset';
}

const FormButton: React.FC<FormButtonProps> = ({
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