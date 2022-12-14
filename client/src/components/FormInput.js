import { useState } from "react";

function FormInput({ label, errorMessage, onChange, ...inputProps }) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="flex flex-col">
      <label className="font-2 text-xs text-gray-400">{label}</label>
      <input
        onBlur={handleFocus}
        focused={focused.toString()}
        className="peer my-2 p-2  rounded-lg border-2 border-gray-400"
        {...inputProps}
        onChange={onChange}
      />
      {focused && errorMessage != "" && (
        <span className="invisible peer-invalid:visible text-red-500 text-xs">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default FormInput;
