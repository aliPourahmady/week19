import { useQueries, useQuery } from "@tanstack/react-query";
import api from "../service/api";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data;
    },
  });
};

export { useProducts };
