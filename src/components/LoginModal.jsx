import { Modal } from 'antd';
import LoginForm from './LoginForm';

function LoginModal({ visible, onCancel }) {
  return (
    <Modal
      title="Login"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={400}
    >
      <LoginForm onSuccess={onCancel} />
    </Modal>
  );
}

export default LoginModal; 