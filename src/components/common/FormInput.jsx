import React from 'react';
import { Form, Input } from 'antd';

const FormInput = ({
  name,
  label,
  rules = [],
  prefix,
  type = 'text',
  placeholder,
  ...rest
}) => {
  const InputComponent = type === 'password' ? Input.Password : Input;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
    >
      <InputComponent
        prefix={prefix}
        placeholder={placeholder}
        type={type}
        {...rest}
      />
    </Form.Item>
  );
};

export default FormInput; 