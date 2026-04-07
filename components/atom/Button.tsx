import clsx from "clsx";
import React from "react";

type ButtonProps = {
  label: string;
  name?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  isLoading?: boolean;
  loadingName?: string;
  onClick?: () => void;
  bgColor?: string;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  name = "btn-custom",
  type = "button",
  loadingName = "in progress...",
  disabled = false,
  isLoading = false,
  onClick,
  bgColor = "#007bff",
  className,
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      name={name}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={{ backgroundColor: isDisabled ? "#9298A1" : bgColor }}
      className={clsx(
        "btn",
        "btn-primary",
        "px-8",
        "py-4",
        "rounded-[10px]",
        "cursor-pointer",
        {
          "cursor-not-allowed opacity-70": isDisabled,
        },
        className
      )}
    >
      {isLoading ? loadingName : label}
    </button>
  );
};

export default Button;
