import { useEffect, useState } from "react";
import RegisterForm from "../../components/RegisterFrom/RegisterForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useNavigate } from "react-router";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken");
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);
  if (isRegister) {
    return (
      <div>
        <RegisterForm setIsRegister={setIsRegister} />
      </div>
    );
  }
  return (
    <div>
      <LoginForm setIsRegister={setIsRegister} />
    </div>
  );
};

export default Login;
