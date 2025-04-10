import { useForm, SubmitHandler } from "react-hook-form";
import AppInput from "../AppInput/AppInput";
import axiosInstance from "../../api/axionInstance";
import { useNavigate } from "react-router";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

type loginInputs = {
  email: string;
  password: string;
};

const LoginForm = ({ setIsRegister }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<loginInputs>({
    mode: "onChange",
  });

  const [loader, setLoader] = useState(false);
  const onSubmit: SubmitHandler<loginInputs> = (data) => {
    login(data);
  };

  const navigate = useNavigate();
  const login = async (data: any) => {
    setLoader(true)
    try {
      const response = await axiosInstance.post("/login", data);
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.name);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const values = getValues();
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
            <h1 className="text-4xl font-bold text-gray-800">Login</h1>
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
            <p
              onClick={() => setIsRegister(true)}
              className="max-w-fit capitalize hover:underline active:underline active:text-red-600 cursor-pointer select-none"
            >
              dont have an account?
            </p>
            <div className=" flex justify-end">
              <button
                type="submit"
                className="form-btn"
                disabled={isFormInvalid}
              >
                {loader ? <CircularProgress color="inherit"  size={20}/> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
