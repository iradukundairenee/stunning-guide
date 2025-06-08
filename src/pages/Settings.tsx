import { Card, Form, Input, Switch, Button, Row, Col, Divider, Select } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

function Settings() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Settings saved:', values);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your application settings</p>
      </Card>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          notifications: true,
          emailNotifications: true,
          language: 'en',
          timezone: 'UTC',
          currency: 'USD'
        }}
      >
        <Card title="General Settings">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="language"
                label="Language"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="en">English</Select.Option>
                  <Select.Option value="es">Spanish</Select.Option>
                  <Select.Option value="fr">French</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="timezone"
                label="Timezone"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="UTC">UTC</Select.Option>
                  <Select.Option value="EST">EST</Select.Option>
                  <Select.Option value="PST">PST</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="currency"
            label="Default Currency"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="USD">USD</Select.Option>
              <Select.Option value="EUR">EUR</Select.Option>
              <Select.Option value="GBP">GBP</Select.Option>
            </Select>
          </Form.Item>
        </Card>

        <Card title="Notification Settings" className="mt-6">
          <Form.Item
            name="notifications"
            label="Enable Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="emailNotifications"
            label="Email Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="notificationEmail"
            label="Notification Email"
            rules={[{ type: 'email' }]}
          >
            <Input />
          </Form.Item>
        </Card>

        <Card title="API Settings" className="mt-6">
          <Form.Item
            name="apiKey"
            label="API Key"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="apiSecret"
            label="API Secret"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
          >
            Save Settings
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Settings; 