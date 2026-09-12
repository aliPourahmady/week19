import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";

import styles from "./ProductsItem.module.css";
function ProductsItem({
  product,
  setSelected,
  setShowEditModal,
  setShowDelteModal,
  deleteSelected,
  setDeleteSelected,
}) {
  const selectedDeleteHandler = () => {
    setDeleteSelected((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product],
    );
  };

  return (
    <>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{product.price.toLocaleString("fa-IR")} تومان</td>
      <td>{product.id}</td>
      <td className={styles.btn}>
        <img
          onClick={() => {
            setShowEditModal(true);
            setSelected(product);
          }}
          src={edit}
          alt="edit"
        />
        <img
          onClick={() => {
            setShowDelteModal(true);
            setSelected(product);
            setDeleteSelected([]);
          }}
          src={trash}
          alt="trash"
        />
        <input
          type="checkbox"
          checked={deleteSelected.some((p) => p.id === product.id)}
          onChange={() => selectedDeleteHandler(product.id)}
        />
      </td>
    </>
  );
}

export default ProductsItem;
