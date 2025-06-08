import { Form, Input, InputNumber, Select, Button, Card, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addFarmer } from '../../store/slices/farmerSlice';
import { addGarden } from '../../store/slices/gardenSlice';
import type { RootState } from '../../store';
import type { AuthState } from '../../store/slices/authSlice';
import React, { useState, useEffect } from 'react';

// Rwanda administrative boundaries data
const RWANDA_DISTRICTS = {
  'Kigali': {
    sectors: ['Gasabo', 'Kicukiro', 'Nyarugenge'],
    cells: {
      'Gasabo': ['Bumbogo', 'Gatsata', 'Gikomero', 'Gisozi', 'Jabana', 'Jali', 'Kacyiru', 'Kimihurura', 'Kimironko', 'Kinyinya', 'Ndera', 'Nduba', 'Remera', 'Rusororo', 'Rutunga'],
      'Kicukiro': ['Gatenga', 'Gikondo', 'Kagarama', 'Kanombe', 'Kicukiro', 'Kigarama', 'Masaka', 'Niboye', 'Nyarugunga'],
      'Nyarugenge': ['Gitega', 'Kanyinya', 'Kigali', 'Kimisagara', 'Mageragere', 'Muhima', 'Nyakabanda', 'Nyamirambo', 'Nyarugenge', 'Rwezamenyo']
    }
  },
  'Northern Province': {
    sectors: ['Burera', 'Gakenke', 'Gicumbi', 'Musanze', 'Rulindo'],
    cells: {
      'Burera': ['Bungwe', 'Butaro', 'Cyanika', 'Cyeru', 'Gahunga', 'Gatebe', 'Gitovu', 'Kagogo', 'Kinoni', 'Kinyababa', 'Kivuye', 'Nemba', 'Rugarama', 'Rugengabari', 'Ruhunde', 'Rusarabuye', 'Rwerere'],
      // Add other cells for each sector
    }
  },
  // Add other provinces with their sectors and cells
};

interface FarmerRegistrationForm {
  // Personal Information
  firstName: string;
  lastName: string;
  nationalId: string;
  phone: string;
  email?: string;
  district: string;
  sector: string;
  cell: string;
  
  // Garden Information
  gardenName: string;
  gardenSize: number;
  soilType: string;
  irrigationType: string;
  crops: string[];
  expectedHarvestDate: string;
  landPlotNumber?: string; // Added land plot number
}

function FarmerRegistration() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth as AuthState);
  const [availableSectors, setAvailableSectors] = useState<string[]>([]);
  const [availableCells, setAvailableCells] = useState<string[]>([]);
  const [isValidatingLand, setIsValidatingLand] = useState(false);

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

  const validateLandPlot = async (_: any, value: string) => {
    if (!value) return Promise.resolve();
    
    setIsValidatingLand(true);
    try {
      // Here you would typically make an API call to Rwanda's land registry
      // For now, we'll simulate a validation
      const isValid = await validateLandPlotWithRegistry(value);
      if (!isValid) {
        return Promise.reject('Invalid land plot number or plot not found in registry');
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject('Error validating land plot');
    } finally {
      setIsValidatingLand(false);
    }
  };

  // Simulated land registry validation
  const validateLandPlotWithRegistry = async (plotNumber: string): Promise<boolean> => {
    // This would be replaced with actual API call to Rwanda's land registry
    // For now, we'll simulate a validation
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate validation logic
        const isValid = /^[A-Z]{2}\d{6}$/.test(plotNumber);
        resolve(isValid);
      }, 1000);
    });
  };

  const handleDistrictChange = (district: string) => {
    const sectors = RWANDA_DISTRICTS[district as keyof typeof RWANDA_DISTRICTS]?.sectors || [];
    setAvailableSectors(sectors);
    setAvailableCells([]);
    form.setFieldsValue({ sector: undefined, cell: undefined });
  };

  const handleSectorChange = (sector: string) => {
    const district = form.getFieldValue('district');
    const cells = RWANDA_DISTRICTS[district as keyof typeof RWANDA_DISTRICTS]?.cells[sector] || [];
    setAvailableCells(cells);
    form.setFieldsValue({ cell: undefined });
  };

  const handleSubmit = async (values: FarmerRegistrationForm) => {
    try {
      if (!user) {
        message.error('You must be logged in to register');
        return;
      }

      // Verify that the National ID matches the logged-in user
      if (values.nationalId !== user.nationalId) {
        message.error('National ID must match your account');
        return;
      }

      // Validate land information
      if (values.landPlotNumber) {
        const isValidLand = await validateLandPlotWithRegistry(values.landPlotNumber);
        if (!isValidLand) {
          message.error('Invalid land plot information');
          return;
        }
      }

      // Register farmer
      const farmerResponse = await dispatch(addFarmer({
        firstName: values.firstName,
        lastName: values.lastName,
        nationalId: values.nationalId,
        phone: values.phone,
        email: values.email,
        district: values.district,
        status: 'active',
        userId: user.id, // Link with user account
      })).unwrap();

      // Register garden
      await dispatch(addGarden({
        farmerId: farmerResponse.id,
        name: values.gardenName,
        size: values.gardenSize,
        soilType: values.soilType,
        irrigationType: values.irrigationType,
        crops: values.crops,
        expectedHarvestDate: values.expectedHarvestDate,
        status: 'active',
        landPlotNumber: values.landPlotNumber,
      })).unwrap();

      message.success('Registration completed successfully');
      form.resetFields();
    } catch (error) {
      message.error('Failed to complete registration');
      console.error('Registration error:', error);
    }
  };

  // Pre-fill the National ID if user is logged in
  useEffect(() => {
    if (user?.nationalId) {
      form.setFieldsValue({
        nationalId: user.nationalId,
      });
    }
  }, [user, form]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card title="Farmer Registration" className="shadow-lg">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-6"
        >
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter your last name' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="nationalId"
                label="National ID"
                rules={[
                  { required: true, message: 'Please enter your National ID' },
                  { validator: validateNationalId }
                ]}
              >
                <Input disabled={!!user?.nationalId} />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                  { validator: validatePhone }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="district"
                label="District"
                rules={[{ required: true, message: 'Please select your district' }]}
              >
                <Select
                  options={Object.keys(RWANDA_DISTRICTS).map(district => ({
                    value: district,
                    label: district,
                  }))}
                  onChange={handleDistrictChange}
                />
              </Form.Item>

              <Form.Item
                name="sector"
                label="Sector"
                rules={[{ required: true, message: 'Please enter your sector' }]}
              >
                <Select
                  options={availableSectors}
                  onChange={(value) => {
                    handleSectorChange(value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="cell"
                label="Cell"
                rules={[{ required: true, message: 'Please enter your cell' }]}
              >
                <Select
                  options={availableCells}
                />
              </Form.Item>
            </div>
          </div>

          {/* Garden Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Garden Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="gardenName"
                label="Garden Name"
                rules={[{ required: true, message: 'Please enter your garden name' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="gardenSize"
                label="Garden Size (hectares)"
                rules={[{ required: true, message: 'Please enter garden size' }]}
              >
                <InputNumber
                  min={0.1}
                  step={0.1}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                name="soilType"
                label="Soil Type"
                rules={[{ required: true, message: 'Please select soil type' }]}
              >
                <Select>
                  <Select.Option value="clay">Clay</Select.Option>
                  <Select.Option value="sandy">Sandy</Select.Option>
                  <Select.Option value="loamy">Loamy</Select.Option>
                  <Select.Option value="silt">Silt</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="irrigationType"
                label="Irrigation Type"
                rules={[{ required: true, message: 'Please select irrigation type' }]}
              >
                <Select>
                  <Select.Option value="rainfed">Rain-fed</Select.Option>
                  <Select.Option value="drip">Drip Irrigation</Select.Option>
                  <Select.Option value="sprinkler">Sprinkler</Select.Option>
                  <Select.Option value="flood">Flood Irrigation</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="crops"
                label="Crops to Plant"
                rules={[{ required: true, message: 'Please select at least one crop' }]}
              >
                <Select mode="multiple">
                  <Select.Option value="maize">Maize</Select.Option>
                  <Select.Option value="beans">Beans</Select.Option>
                  <Select.Option value="potatoes">Potatoes</Select.Option>
                  <Select.Option value="rice">Rice</Select.Option>
                  <Select.Option value="wheat">Wheat</Select.Option>
                  <Select.Option value="vegetables">Vegetables</Select.Option>
                  <Select.Option value="fruits">Fruits</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="expectedHarvestDate"
                label="Expected Harvest Date"
                rules={[{ required: true, message: 'Please select expected harvest date' }]}
              >
                <Input type="date" />
              </Form.Item>

              <Form.Item
                name="landPlotNumber"
                label="Land Plot Number"
                rules={[
                  { validator: validateLandPlot }
                ]}
                extra="Enter your land plot number from the land registry (e.g., AB123456)"
              >
                <Input disabled={isValidatingLand} />
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Complete Registration
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default FarmerRegistration; 