import React, { useId } from "react";

function Select({ options = [], label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        id={id}
        {...props}
        ref={ref}
        className={`px-3 py-2 bg-white text-black rounded-lg w-full border border-gray-200 focus:bg-gray-50
        outline-none ${className}`}
      >
        {options?.map((option) => {
          <option value={option} key={option}>
            {option}
          </option>;
        })}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
