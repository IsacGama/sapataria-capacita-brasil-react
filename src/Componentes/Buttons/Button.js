import './Button.css';

export default function Button({ 
  title, 
  variant = 'primary', 
  onPress, 
  type = 'button',
  disabled = false,
  ...props 
}) {
  return (
    <button
      className={`button button--${variant}`}
      onClick={onPress}
      type={type}
      disabled={disabled}
      {...props}
    >
      {title}
    </button>
  );
}