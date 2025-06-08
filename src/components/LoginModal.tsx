import { Modal } from 'antd';
import LoginForm from './LoginForm';
import { useState } from 'react';

interface LoginModalProps {
  visible: boolean;
  onCancel: () => void;
}

function LoginModal({ visible, onCancel }: LoginModalProps) {
  return (
    <Modal
      title="Sign in to your account"
      visible={visible}
      onCancel={onCancel}
      footer={null} // Hide the default footer buttons
    >
      <LoginForm onSuccess={onCancel} />
    </Modal>
  );
}

export default LoginModal; 