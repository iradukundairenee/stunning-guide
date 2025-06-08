import { Form, Input, Button, Card, message } from 'antd';
import { useAppDispatch } from '../../store/hooks';

interface FarmerRegistrationForm {
  firstName: string;
  lastName: string;
  nationalId: string;
  phone: string;
  email?: string;
}

function AdminFarmerRegistration() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const validateNationalId = (_: any, value: string) => {
    // Rwanda National ID format: 1XXXXXXXXXXXXXX (16 digits)
    const nationalIdRegex = /^1\d{15}$/;
    if (!value || !nationalIdRegex.test(value)) {
      return Promise.reject('Please enter a valid National ID (16 digits starting with 1)');
    }
    return Promise.resolve();
  };

  const validatePhone = (_: any, value: string) => {
    // Rwanda phone number format: +2507XXXXXXXX
    const phoneRegex = /^\+2507\d{8}$/;
    if (!value || !phoneRegex.test(value)) {
      return Promise.reject('Please enter a valid phone number (+2507XXXXXXXX)');
    }
    return Promise.resolve();
  };

  const handleSubmit = async (values: FarmerRegistrationForm) => {
    try {
      // TODO: Implement API call to register farmer
      console.log('Registering farmer:', values);
      message.success('Farmer registered successfully');
      form.resetFields();
    } catch (error) {
      message.error('Failed to register farmer');
      console.error('Registration error:', error);
    }
  };

  return (
    <Card title="Register New Farmer" className="max-w-2xl mx-auto">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
        </div>

        <Form.Item
          name="nationalId"
          label="National ID"
          rules={[
            { required: true, message: 'Please enter National ID' },
            { validator: validateNationalId }
          ]}
        >
          <Input placeholder="Enter National ID (16 digits)" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please enter phone number' },
            { validator: validatePhone }
          ]}
        >
          <Input placeholder="Enter phone number (+2507XXXXXXXX)" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email (Optional)"
          rules={[
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register Farmer
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AdminFarmerRegistration; 