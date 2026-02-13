interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({ children, loading, ...props }: Props) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
    >
      {loading ? "Procesando..." : children}
    </button>
  );
};

export default Button;