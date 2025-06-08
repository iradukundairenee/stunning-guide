import { Form, Input, InputNumber, Select, Modal } from 'antd';

interface AddFarmerFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (values: any) => void;
  loading?: boolean;
}

const cropOptions = [
  { label: 'Maize', value: 'maize' },
  { label: 'Wheat', value: 'wheat' },
  { label: 'Rice', value: 'rice' },
  { label: 'Soybeans', value: 'soybeans' },
  { label: 'Cotton', value: 'cotton' },
];

function AddFarmerForm({ open, onClose, onSuccess, loading }: AddFarmerFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSuccess(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Add New Farmer"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter last name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="farmSize"
          label="Farm Size (acres)"
          rules={[{ required: true, message: 'Please enter farm size' }]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item
          name="crops"
          label="Crops"
          rules={[{ required: true, message: 'Please select at least one crop' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select crops"
            options={cropOptions}
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddFarmerForm; 