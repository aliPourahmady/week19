import { useMutation, useQueryClient } from "@tanstack/react-query";
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

const useAddProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addProducts"],
    mutationFn: async (data) => {
      const response = await api.post("/products", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export { useRegister, useLogin, useAddProducts };
