import ProductsTable from "../components/ProductsTable";
import { TbLogout2 } from "react-icons/tb";

import styles from "./AdminPage.module.css";
import { removeToken } from "../service/cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import ThemeToggle from "../components/ThemeToggle";

function AdminPage() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    removeToken();
    toast.success("با موفقیت از حساب خود خارج شدید");
    navigate("/", { replace: true });
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header>
          <SearchBox />
          <div className={styles.user}>
            <div style={styles.accont}>
              <h2>میلاد عظمی</h2>
              <p>مدیر</p>
            </div>
            <ThemeToggle />
            <TbLogout2 className={styles.logout} onClick={logoutHandler} />
          </div>
        </header>
        <main>
          <ProductsTable />
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
