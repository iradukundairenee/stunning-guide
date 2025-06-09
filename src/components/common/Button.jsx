import { Button as AntButton } from 'antd';

function Button({
  children,
  icon,
  fullWidth = false,
  variant = 'primary',
  className = '',
  ...props
}) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300';
      case 'outline':
        return 'bg-transparent border-2 hover:bg-gray-50';
      case 'text':
        return 'bg-transparent border-none hover:bg-gray-50';
      default:
        return 'bg-green-600 text-white hover:bg-green-700 border-green-600';
    }
  };

  return (
    <AntButton
      className={`flex items-center justify-center gap-2 rounded-lg transition-all duration-200 ${getVariantClasses()} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      icon={icon}
      {...props}
    >
      {children}
    </AntButton>
  );
}

export default Button; 