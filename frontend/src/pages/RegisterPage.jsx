import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordChecklist from "react-password-checklist";
import toast from "react-hot-toast";
import { FaCheck, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import { useLogin, useRegister } from "../hooks/mutations";
import { registerSchema } from "../schemas/authSchema";
import logo from "../assets/Union.svg";
import styles from "./RegisterPage.module.css";
import { setToken } from "../service/cookie";

function RegisterPage() {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { username: "", password: "", confirmPassword: "" },
  });

  const {
    mutate: registerMutate,
    isLoading: isRegistering,
    error: registerError,
  } = useRegister();
  const {
    mutate: loginMutate,
    isLoading: isLoggingIn,
    error: loginError,
  } = useLogin();

  const onSubmit = (formData) => {
    const { confirmPassword, ...registrationData } = formData;

    registerMutate(registrationData, {
      onSuccess: () => {
        loginMutate(
          {
            username: registrationData.username,
            password: registrationData.password,
          },
          {
            onSuccess: (loginResponse) => {
              const token = loginResponse.token;
              if (token) {
                setToken(token);
                navigate("/admin", { replace: true });
                reset();
                setIsPasswordValid(false);
                toast.success("ثبت نام با موفقیت انجام شد ");
              } else {
                toast.error("توکن پیدا نشد ");
              }
            },
            onError: (err) => {
              toast.error("ثبت نام با شکست مواجه شد لطفا دوباره ثبت کنید ");
              navigate("/");
            },
          },
        );
      },
      onError: (err) => {
        console.error("Registration faild:", err);
      },
    });
  };

  const isLoading = isRegistering || isLoggingIn;

  return (
    <div className={styles.container}>
      <div className={styles.containerBox}>
        <div className={styles.header}>
          <img src={logo} alt="logo" />
          <h2>فرم ثبت نام</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <input
              type="text"
              placeholder="نام کاربری"
              {...register("username")}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
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
          <div>
            <input
              type="password"
              placeholder="تکرار رمز عبور"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            {watch("password") && (
              <div className={styles.checkList}>
                <PasswordChecklist
                  className={styles.validation}
                  validTextColor="#4ade80"
                  invalidTextColor="#f43f5e"
                  rules={["minLength", "number", "capital", "match"]}
                  minLength={8}
                  value={watch("password")}
                  valueAgain={watch("confirmPassword")}
                  onChange={setIsPasswordValid}
                  messages={{
                    minLength: "رمز عبور باید بیشتر از 8 کاراکتر باشد ",
                    number: "رمز عبور باید شامل عدد باشد ",
                    capital:
                      "رمز عبور باید شامل حداقل یک حرف بزرگ انگلیسی باشد ",
                    match: "رمز عبور و تکرار آن باید یکسان باشند",
                  }}
                  iconComponents={{
                    ValidIcon: <FaCheck color="#4ade80" />,
                    InvalidIcon: <IoClose color="#f43f5e" />,
                  }}
                />
              </div>
            )}
          </div>
          {(registerError || loginError) && (
            <p>
              {registerError?.response.data.message ||
                loginError?.response.data.message}
            </p>
          )}
          <button type="submit" disabled={isLoading || !isPasswordValid}>
            {isLoading ? "درحال ثبت نام..." : "ثبت نام"}
          </button>
          <Link to="/">حساب کاربری دارید؟</Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
