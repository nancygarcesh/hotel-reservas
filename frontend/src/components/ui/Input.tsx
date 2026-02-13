import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({ label, error, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>

      <input
        {...props}
        className={`p-3 rounded-xl border transition focus:outline-none focus:ring-2
        ${error ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-teal-300"}
        dark:bg-gray-800`}
      />

      {error && (
        <span className="text-red-500 text-sm" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;