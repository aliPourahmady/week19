import { useMutation } from "@tanstack/react-query";
import api from "../service/api";

const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data) => {
      const response = await api.post("/auth/register", data);
      return response.data;
    },
  });
};

const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
  });
};

export { useRegister, useLogin };
