import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useLogin } from "../hooks/mutations";
import { useAuth } from "../context/authContext";
import { loginSchema } from "../schemas/authSchema";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function LoginPage() {
  const { setAuth } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const { mutate, isLoading, error } = useLogin();

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: (response) => {
        setAuth(response);
        toast.success("Login successful!");
        reset();
        navigate("/admin");
      },
      onError: (error) => {
        throw new Error("Invalid username or password.");
      },
    });
  };
  return (
    <div>
      <h2>فرم ورود</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="نام کاربری" {...register("username")} />
        {errors.username && (
          <p style={{ color: "red" }}>{errors.username.message}</p>
        )}
        <div>
          <input
            type={isVisible ? "text" : "password"}
            placeholder="رمز عبور"
            {...register("password")}
          />
          <div onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        {error && <p style={{ color: "red" }}>Invalid username or password.</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "درحال ورود..." : "ورود"}
        </button>
      </form>
      <Link to="/register">حساب کاربری ندارید؟</Link>
    </div>
  );
}

export default LoginPage;
