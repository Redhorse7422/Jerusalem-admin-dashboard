import { cn } from "@/lib/utils";
import { useId } from "react";
import { UseFormRegisterReturn } from "react-hook-form"; // Import type

interface PropsType {
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  icon?: React.ReactNode;
  error?: string;
  register?: UseFormRegisterReturn; // Accept register from React Hook Form
}

export function TextAreaGroup({
  label,
  placeholder,
  required,
  disabled,
  active,
  className,
  icon,
  error,
  register, // Receive register object
}: PropsType) {
  const id = useId();

  return (
    <div className={cn(className)}>
      <label
        htmlFor={id}
        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
        {required && <span className="ml-1 select-none text-red">*</span>}
      </label>

      <div className="relative mt-3 [&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:left-5.5 [&_svg]:top-5.5">
        <textarea
          id={id}
          rows={6}
          placeholder={placeholder}
          {...register} // Spread register to bind value, onChange, and ref
          className={cn(
            "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary",
            icon && "py-5 pl-13 pr-5",
            error && "border-red-500"
          )}
          required={required}
          disabled={disabled}
          data-active={active}
        />

        {icon}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>} {/* Show error */}
    </div>
  );
}
