import { Form, Input, Select, InputNumber, Button, DatePicker } from 'antd';
import { useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';
import type { AuthState } from '../../store/slices/authSlice';

interface CropFormData {
  name: string;
  variety: string;
  area: number;
  plantingDate: string;
  expectedHarvestDate: string;
}

function CropRegistration() {
  const { user } = useAppSelector((state: RootState) => state.auth as AuthState);

  const handleSubmit = async (values: CropFormData) => {
    try {
      // Implement crop registration logic here
      console.log('Crop registration:', values);
    } catch (error) {
      console.error('Failed to register crop:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Register New Crop</h1>
      
      <Form
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Crop Name"
          rules={[{ required: true, message: 'Please enter crop name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="variety"
          label="Variety"
          rules={[{ required: true, message: 'Please enter crop variety' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="area"
          label="Area (hectares)"
          rules={[{ required: true, message: 'Please enter area' }]}
        >
          <InputNumber min={0} step={0.1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="plantingDate"
          label="Planting Date"
          rules={[{ required: true, message: 'Please select planting date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="expectedHarvestDate"
          label="Expected Harvest Date"
          rules={[{ required: true, message: 'Please select expected harvest date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register Crop
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CropRegistration; 