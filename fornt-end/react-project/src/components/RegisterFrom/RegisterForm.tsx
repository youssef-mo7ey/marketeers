import { useForm, SubmitHandler } from "react-hook-form";
import AppInput from "../AppInput/AppInput";
import axiosInstance from "../../api/axionInstance";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

type regInputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = ({ setIsRegister }: any) => {
  const [loader, setLoader] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<regInputs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<regInputs> = (data) => {
    register(data);
  };
  const values = getValues();

  const register = async (data: any) => {
    setLoader(true);
    try {
      const response = await axiosInstance.post("/register", data);
      if (response.status === 201) {
        setIsRegister(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const isFormInvalid =
    Object.keys(errors).length > 0 || !values.email || !values.password;
  return (
    <>
      <div className="flex justify-center h-screen items-center ">
        <div className="custom-card w-[40rem] max-h-fit">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <h1 className="text-4xl font-bold text-gray-800">Register</h1>
            <AppInput
              control={control} // Pass control to AppInput
              controlName="name"
              rules={{
                required: "Name is required",
              }}
              placeholder="Name"
              errors={errors}
            />
            <AppInput
              control={control} // Pass control to AppInput
              controlName="email"
              rules={{
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              }}
              placeholder="Email"
              errors={errors}
            />
            <AppInput
              control={control} // Pass control to AppInput
              controlName="password"
              type="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              placeholder="Password"
              errors={errors}
            />
            <AppInput
              control={control} // Pass control to AppInput
              controlName="confirmPassword"
              type="password"
              rules={{
                required: "Password is required",
                validate: (value: string) => {
                  if (value !== values.password) {
                    return "Passwords do not match";
                  }
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              placeholder="Password"
              errors={errors}
            />
            <p
              onClick={() => setIsRegister(false)}
              className=" capitalize hover:underline max-w-fit active:underline active:text-red-600 cursor-pointer select-none"
            >
              already have an account?
            </p>
            <div className=" flex justify-end">
              <button
                type="submit"
                className="form-btn"
                disabled={isFormInvalid}
              >
                {loader ? <CircularProgress color="inherit" size={20} /> : "Register"}
                
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
