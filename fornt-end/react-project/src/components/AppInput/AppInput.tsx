import { Controller } from "react-hook-form";
import { camelCaseToKebabCase } from "../../utils/utils";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useState } from "react";
const AppInput = ({
  controlName,
  placeholder,
  type = "text",
  control,
  rules,
  errors,
}: any) => {
  const [inputType, setInputType] = useState(type);
  return (
    <div className="flex relative flex-col">
      <label className="capitalize" htmlFor={controlName}>
        {camelCaseToKebabCase(controlName)}{" "}
        {rules?.required && (
          <span style={{ color: "red" }} className=" text-lg">
            *
          </span>
        )}
      </label>
      <Controller
        name={controlName}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <input
              className="form-input"
              {...field}
              
              value={field?.value || ""}
              id={controlName}
              placeholder={placeholder}
              type={inputType || 'text'}
            />
            <span className="absolute right-2 top-[3rem] transform -translate-y-1/2 cursor-pointer">
              {type === "password" && (
                <RemoveRedEyeIcon
                  onClick={() =>
                    setInputType((prev:string) =>
                      prev === "text" ? "password" : "text"
                    )
                  }
                  className={`${inputType === "text" ? "opacity-[0.5]" : ""}`}
                />
              )}{" "}
            </span>
            <p className="text-red-600 capitalize">
              {errors && errors[controlName]?.message}
            </p>
            <div></div>
          </>
        )}
      />
    </div>
  );
};

export default AppInput;
