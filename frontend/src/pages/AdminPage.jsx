import { useProducts } from "../hooks/queries";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import { useState } from "react";
import AddProductsModal from "../components/AddProductsModal";

function AdminPage() {
  const [showModal, setShowModal] = useState(false);
  const { error, data, isLoading } = useProducts();

  if (isLoading) return <p>در حال بارگذاری...</p>;

  if (error) return <p>خطا در دریافت اطلاعات: {error.message}</p>;

  if (!data || data.length === 0) return <p>محصولی یافت نشد.</p>;
  return (
    <div>
      {showModal && <AddProductsModal setShowModal={setShowModal} />}
      <header>
        <input type="text" placeholder="جستجوی کالا" />
        <img src="" alt="" />
        <h2>میلاد عظمی</h2>
        <p>مدیر</p>
      </header>
      <main>
        <div>
          <h2>مدیریت کالا</h2>
          <button onClick={() => setShowModal(true)}>افزودن محصول</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>نام کاربری</th>
              <th>موجودی</th>
              <th>قیمت</th>
              <th>شناسه کالا</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price} هزار تومان</td>
                <td>{item.id}</td>
                <td>
                  <img src={edit} alt="edit" />
                  <img src={trash} alt="trash" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default AdminPage;
