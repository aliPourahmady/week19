import { useState } from "react";
import ProductsItem from "./ProductsItem";
import AddProductsModal from "./AddProductsModal";
import UpdateProductsModal from "./UpdateProductsModal";
import DeleteModal from "./DeleteModal";
import { useProducts } from "../hooks/queries";

import setting from "../assets/setting-3.svg";
import styles from "./ProductsTable.module.css";

function ProductsTable() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [ShowEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteSelected, setDeleteSelected] = useState([]);

  const { error, data, isLoading } = useProducts();

  if (isLoading) return <p>در حال بارگذاری...</p>;

  if (error) return <p>خطا در دریافت اطلاعات: {error.message}</p>;

  if (!data || data.length === 0) return <p>محصولی یافت نشد.</p>;
  return (
    <>
      {showAddModal && <AddProductsModal setShowModal={setShowAddModal} />}
      {ShowEditModal && (
        <UpdateProductsModal
          setShowModal={setShowEditModal}
          product={selected}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          product={selected}
          setShowModal={setShowDeleteModal}
          deleteSelected={deleteSelected}
          setDeleteSelected={setDeleteSelected}
        />
      )}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <img src={setting} alt="setting" />
          <p>مدیریت کالا</p>
        </div>
        <div className={styles.headerBtn}>
          <button onClick={() => setShowAddModal(true)}>+ افزودن محصول</button>
          <button
            onClick={() => {
              setShowDeleteModal(true);
              setSelected(null);
            }}
            disabled={deleteSelected.length === 0}
          >
            حذف موارد انتخاب شده {deleteSelected.length}
          </button>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>نام کالا</th>
              <th>موجودی</th>
              <th>قیمت</th>
              <th>شناسه کالا</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((product) => (
              <tr key={product.id}>
                <ProductsItem
                  product={product}
                  setSelected={setSelected}
                  setShowEditModal={setShowEditModal}
                  setShowDelteModal={setShowDeleteModal}
                  deleteSelected={deleteSelected}
                  setDeleteSelected={setDeleteSelected}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductsTable;
