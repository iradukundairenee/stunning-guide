import { Card, Statistic } from 'antd';
import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend?: {
    value: string;
    isUp: boolean;
  };
  loading?: boolean;
}

function StatCard({ title, value, icon, trend, loading }: StatCardProps) {
  return (
    <Card loading={loading}>
      <Statistic
        title={title}
        value={value}
        prefix={icon}
        suffix={trend && (
          <span style={{ 
            color: trend.isUp ? '#52c41a' : '#ff4d4f',
            fontSize: '14px',
            marginLeft: '8px'
          }}>
            {trend.value}
          </span>
        )}
      />
    </Card>
  );
}

export default StatCard; 
