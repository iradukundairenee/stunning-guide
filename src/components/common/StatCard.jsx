import { Card, Statistic } from 'antd';

function StatCard({ title, value, icon, trend, loading }) {
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