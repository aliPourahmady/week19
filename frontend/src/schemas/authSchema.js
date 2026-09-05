import * as yup from "yup";

const usernameSchema = yup.string().required("Username is required");
const passwordSchema = yup.string().min(8, "Must be at least 8 characters");

const loginSchema = yup.object({
  username: usernameSchema,
  password: passwordSchema,
});

const registerSchema = yup.object({
  username: usernameSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export { loginSchema, registerSchema };
