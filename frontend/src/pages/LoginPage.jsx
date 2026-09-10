import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useLogin } from "../hooks/mutations";
import { loginSchema } from "../schemas/authSchema";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import styles from "./LoginPage.module.css";
import logo from "../assets/Union.svg";
import { setToken } from "../service/cookie";

function LoginPage() {
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
        const token = response.token;
        setToken(token);
        toast.success("با موفقیت به حساب خود وارد شدید.");
        reset();
        navigate("/admin");
      },
      onError: () => {
        throw new Error("نام کاربری یا پسوورد شما اشتباه است.");
      },
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerBox}>
        <div className={styles.header}>
          <img src={logo} alt="logo" />
          <h2>فرم ورود</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            type="text"
            placeholder="نام کاربری"
            {...register("username")}
          />
          {errors.username && <p>{errors.username.message}</p>}
          <div className={styles.password}>
            <input
              type={isVisible ? "text" : "password"}
              placeholder="رمز عبور"
              {...register("password")}
            />
            <div onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          {error && <p>Invalid username or password.</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "درحال ورود..." : "ورود"}
          </button>
          <Link to="/register">ایحاد حساب کاربری!</Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
