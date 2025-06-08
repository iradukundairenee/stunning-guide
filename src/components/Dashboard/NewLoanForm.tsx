import { Form, Input, InputNumber, Select, DatePicker, Row, Col, Divider } from 'antd';
import FormModal from '../common/FormModal';

interface NewLoanFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (values: any) => void;
  loading?: boolean;
}

function NewLoanForm({ open, onClose, onSuccess, loading }: NewLoanFormProps) {
  // Mock farmers data - replace with actual API call
  const farmers = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' }
  ];

  return (
    <FormModal
      title="Create New Loan"
      open={open}
      onClose={onClose}
      onSubmit={onSuccess}
      loading={loading}
    >
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="farmerId"
            label="Select Farmer"
            rules={[{ required: true, message: 'Please select a farmer' }]}
          >
            <Select>
              {farmers.map((farmer) => (
                <Select.Option key={farmer.id} value={farmer.id}>
                  {farmer.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Divider orientation="left">Loan Details</Divider>
        </Col>

        <Col span={12}>
          <Form.Item
            name="amount"
            label="Loan Amount"
            rules={[{ required: true, message: 'Please enter loan amount' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              min={0}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="interestRate"
            label="Interest Rate (%)"
            rules={[{ required: true, message: 'Please enter interest rate' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={100}
              step={0.01}
              formatter={value => `${value}%`}
              parser={value => value!.replace('%', '')}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="purpose"
            label="Loan Purpose"
            rules={[{ required: true, message: 'Please enter loan purpose' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="duration"
            label="Loan Duration (months)"
            rules={[{ required: true, message: 'Please enter loan duration' }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select start date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="repaymentSchedule"
            label="Repayment Schedule"
            rules={[{ required: true, message: 'Please select repayment schedule' }]}
          >
            <Select>
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="quarterly">Quarterly</Select.Option>
              <Select.Option value="yearly">Yearly</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="collateral"
            label="Collateral Description"
            rules={[{ required: true, message: 'Please enter collateral description' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Col>
      </Row>
    </FormModal>
  );
}

export default NewLoanForm; 