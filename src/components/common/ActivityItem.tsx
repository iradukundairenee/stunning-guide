import { Card, Tag, Space } from 'antd';
import { Activity } from 'lucide-react';

interface ActivityItemProps {
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

function ActivityItem({ description, timestamp, status }: ActivityItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card size="small">
      <Space>
        <Activity className="text-primary" />
        <div>
          <div className="font-medium">{description}</div>
          <div className="text-gray-500 text-sm">{timestamp}</div>
        </div>
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      </Space>
    </Card>
  );
}

export default ActivityItem; 