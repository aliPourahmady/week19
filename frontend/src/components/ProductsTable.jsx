import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import ProductsItem from "./ProductsItem";
import AddProductsModal from "./AddProductsModal";
import UpdateProductsModal from "./UpdateProductsModal";
import DeleteModal from "./DeleteModal";
import { useProducts } from "../hooks/queries";

import setting from "../assets/setting-3.svg";
import styles from "./ProductsTable.module.css";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import PriceRange from "./PriceRange";

function ProductsTable() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [ShowEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteSelected, setDeleteSelected] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const filters = {
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
    name: searchParams.get("name") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  };

  const { error, data, isLoading } = useProducts(filters);
  const updateFilters = (newParams, resetPage = false) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...currentParams, ...newParams };
    if (resetPage) {
      updatedParams.page = "1";
    }
    Object.keys(updatedParams).forEach((key) => {
      if (updatedParams[key] === "" || updatedParams[key] === undefined) {
        delete updatedParams[key];
      }
    });

    setSearchParams(updatedParams);
  };

  console.log(data);
  const totalCount = data?.totalProducts || 0;

  if (error)
    return (
      <p style={{ color: "f43f5e" }}>خطا در دریافت اطلاعات: {error.message}</p>
    );

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
      <div className={styles.filtersContainer}>


        <PriceRange
          initialMin={filters.minPrice}
          initialMax={filters.maxPrice}
          minPrice={0}
          maxPrice={10000000}
          onRangeChange={({ min, max }) => {
            updateFilters(
              {
                minPrice: min.toString(),
                maxPrice: max.toString(),
              },
              true,
            );
          }}
        />
      </div>

      {isLoading ? (
        <div className={styles.loading}>
          <RotatingLines strokeColor="#3a8ebd" strokeWidth={2} />
        </div>
      ) : (
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
              {!data?.data.length ? (
                <tr className={styles.empty}>
                  <td colSpan={5}>محصولی یافت نشد</td>
                </tr>
              ) : (
                data.data.map((product) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        currentPage={filters.page}
        pageSize={filters.limit}
        totalCount={totalCount}
        onPageChange={(newPage) => {
          updateFilters({ page: newPage.toString() });
        }}
        onPageSizeChange={(newSize) => {
          updateFilters({ limit: newSize.toString() }, true);
        }}
      />
    </>
  );
}

export default ProductsTable;
