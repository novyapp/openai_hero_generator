import Image from "next/image";
import React from "react";

interface RadioInputProps {
  label: string;
  check: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  image?: string;
  color?: string;
}

const RadioInput = ({
  label,
  check,
  onChange,
  image,
  color = "",
}: RadioInputProps) => {
  const labelValue = label.toLowerCase();
  const selectedStyle = check === labelValue;

  return (
    <label className="text-sm">
      {image && (
        <Image
          className={`bg-r rounded-md border-4 ${
            selectedStyle ? "border-orange-500" : "border-gray-300"
          }`}
          src={image}
          alt={label}
          width={100}
          height={100}
        />
      )}
      {color && (
        <div
          className={`h-16 w-16 rounded-md ${color} border-4 ${
            selectedStyle ? "border-orange-500" : "border-gray-300"
          }`}
        />
      )}
      <input
        className="mr-1"
        type="radio"
        value={labelValue}
        checked={selectedStyle}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default RadioInput;
