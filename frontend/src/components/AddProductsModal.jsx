import React from "react";
import { useActionData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAddProducts } from "../hooks/mutations";
import { addProductsSchema } from "../schemas/productsSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import styles from "./AddProductsModal.module.css";

function AddProductsModal({ setShowModal }) {
  const { mutate, error, isLoading } = useAddProducts();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductsSchema),
    defaultValues: { name: "", price: "", quantity: "" },
  });

  const onSubmit = (formData) => {
    const payload = {
      name: formData.name,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };
    console.log(payload);
    mutate(payload, {
      onSuccess: () => {
        setShowModal(false);
        toast.success("محصول با موفقیت ثبت شد ");
        reset();
      },
      onError: (err) => {
        toast.error("خطا در افزودن محصول ", err);
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>افزودن محصول جدید</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type="text" placeholder="نام محصول" {...register("name")} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <input type="number" placeholder="قیمت" {...register("price")} />
            {errors.price && <p>{errors.price.message}</p>}
          </div>
          <div>
            <input
              type="number"
              placeholder="موجودی"
              {...register("quantity")}
            />
            {errors.quantity && <p>{errors.quantity.message}</p>}
          </div>
          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "درحال افزودن" : "افزودن"}
            </button>
            <button type="button" onClick={() => setShowModal(false)}>
              لفو
            </button>
            {error && <p>{error.message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductsModal;
