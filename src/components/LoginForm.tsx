import { Form, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import type { AuthState } from '../store/slices/authSlice';
import FormInput from './common/FormInput';
import FormButton from './common/FormButton';

interface LoginFormProps {
  onSuccess?: () => void;
}

function LoginForm({ onSuccess }: LoginFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state: RootState) => state.auth) as AuthState;

  const handleSubmit = async (values: any) => {
    try {
      await dispatch(login(values)).unwrap();
      message.success('Login successful!');
      if (onSuccess) {
        onSuccess();
      }
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed. Please check your credentials.';
      message.error(errorMessage);
      console.error('Login error details:', err);
    }
  };

  return (
    <Form
      name="login"
      onFinish={handleSubmit}
      layout="vertical"
    >
      <FormInput
        name="email"
        label="Email Address"
        type="email"
        prefix={<UserOutlined />}
        placeholder="Email Address"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email!' },
        ]}
      />

      <FormInput
        name="password"
        label="Password"
        type="password"
        prefix={<LockOutlined />}
        placeholder="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      />

      <Form.Item>
        <FormButton
          type="primary"
          htmlType="submit"
          loading={loading}
          fullWidth
          size="large"
        >
          Sign in
        </FormButton>
      </Form.Item>
    </Form>
  );
}

export default LoginForm; 