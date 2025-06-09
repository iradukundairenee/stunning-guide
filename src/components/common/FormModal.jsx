import { Modal, Form, Button, Space } from 'antd';

function FormModal({
  title,
  open,
  onClose,
  onSubmit,
  loading = false,
  children,
  initialValues,
  width = 800
}) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      width={width}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        {children}
        
        <Form.Item className="mb-0 mt-6">
          <div className="flex justify-end">
            <Space>
              <Button onClick={onClose}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormModal; 