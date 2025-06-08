import { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, InputNumber, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';

interface AddLoanFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (values: any) => void;
  loading?: boolean;
}

function AddLoanForm({ open, onClose, onSuccess, loading }: AddLoanFormProps) {
  const [form] = Form.useForm();
  const { farmers } = useAppSelector((state: RootState) => state.farmers);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSuccess(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const farmerOptions = farmers.map((farmer) => ({
    label: `${farmer.firstName} ${farmer.lastName}`,
    value: farmer.id,
  }));

  return (
    <Modal
      title="Add New Loan"
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
          name="farmerId"
          label="Farmer"
          rules={[{ required: true, message: 'Please select a farmer' }]}
        >
          <Select
            placeholder="Select farmer"
            options={farmerOptions}
          />
        </Form.Item>

        <Form.Item
          name="amount"
          label="Loan Amount"
          rules={[{ required: true, message: 'Please enter loan amount' }]}
        >
          <InputNumber
            min={0}
            className="w-full"
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value ? parseFloat(value.replace(/\$\s?|(,*)/g, '')) : 0}
          />
        </Form.Item>

        <Form.Item
          name="interestRate"
          label="Interest Rate (%)"
          rules={[{ required: true, message: 'Please enter interest rate' }]}
        >
          <InputNumber
            min={0}
            max={100}
            className="w-full"
            formatter={(value) => `${value}%`}
            parser={(value) => value ? parseFloat(value.replace('%', '')) : 0}
          />
        </Form.Item>

        <Form.Item
          name="term"
          label="Loan Term (months)"
          rules={[{ required: true, message: 'Please enter loan term' }]}
        >
          <InputNumber
            min={1}
            max={60}
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          name="purpose"
          label="Loan Purpose"
          rules={[{ required: true, message: 'Please enter loan purpose' }]}
        >
          <Select
            placeholder="Select purpose"
            options={[
              { label: 'Equipment Purchase', value: 'equipment' },
              { label: 'Seed Purchase', value: 'seeds' },
              { label: 'Fertilizer Purchase', value: 'fertilizer' },
              { label: 'Land Expansion', value: 'expansion' },
              { label: 'Other', value: 'other' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddLoanForm; 