import React from 'react';
import { Form, Input } from 'antd';
import type { InputProps } from 'antd/lib/input';
import type { Rule } from 'antd/lib/form';

interface FormInputProps extends InputProps {
  name: string;
  label?: string;
  rules?: Rule[];
  prefix?: React.ReactNode;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
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