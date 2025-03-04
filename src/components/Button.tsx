interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

function Button({ text, ...props }: ButtonProps) {
  return <button {...props}>{text}</button>;
}

export default Button;
