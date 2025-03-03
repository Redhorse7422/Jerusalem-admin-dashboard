import { cn } from "@/lib/utils";
import { type HTMLInputTypeAttribute, useId, forwardRef } from "react";

type InputGroupProps = {
  className?: string;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  disabled?: boolean;
  active?: boolean;
  error?: string;
  icon?: React.ReactNode;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({ className, label, type, placeholder, required, disabled, active, error, icon, handleChange, ...props }, ref) => {
    const id = useId();

    return (
      <div className={className}>
        <label htmlFor={id} className="text-body-sm font-medium text-dark dark:text-white">
          {label}
          {required && <span className="ml-1 select-none text-red">*</span>}
        </label>

        <div className="relative mt-3">
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            ref={ref} // <-- Forward the ref
            className={cn(
              "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary",
              error && "border-red-500"
            )}
            required={required}
            disabled={disabled}
            data-active={active}
            onChange={handleChange}
            {...props} // Spread props for react-hook-form
          />
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

export default InputGroup;
