import { Form, Input, InputNumber, Button, message } from 'antd';
import { useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';
import type { AuthState } from '../../store/slices/authSlice';

interface FarmFormData {
  name: string;
  location: string;
  size: number;
  soilType: string;
  irrigationType: string;
}

function FarmerFarmRegistration() {
  const { user } = useAppSelector((state: RootState) => state.auth as AuthState);

  const handleSubmit = async (values: FarmFormData) => {
    try {
      // Implement farm registration logic here
      message.success('Farm registered successfully');
    } catch (error) {
      message.error('Failed to register farm');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Register New Farm</h1>
      
      <Form
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Farm Name"
          rules={[{ required: true, message: 'Please enter farm name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please enter location' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="size"
          label="Size (hectares)"
          rules={[{ required: true, message: 'Please enter farm size' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>

        <Form.Item
          name="soilType"
          label="Soil Type"
          rules={[{ required: true, message: 'Please enter soil type' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="irrigationType"
          label="Irrigation Type"
          rules={[{ required: true, message: 'Please enter irrigation type' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register Farm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FarmerFarmRegistration; 