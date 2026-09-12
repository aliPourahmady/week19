import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import useDebounce from "../hooks/useDebounce";
import styles from "./SearchBox.module.css";

function SearchBox({ placeholder = "جستجوی کالا" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("name") || "");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setValue(searchParams.get("name") || "");
  }, [searchParams.get("name")]);

  useEffect(() => {
    const current = Object.fromEntries(searchParams.entries());
    const updated = { ...current, page: "1" };

    if (debouncedValue) {
      updated.name = debouncedValue;
    } else {
      delete updated.name;
    }

    if ((current.name || "") === debouncedValue) return;

    setSearchParams(updated);
  }, [debouncedValue]);

  return (
    <div className={styles.searchBox}>
      <CiSearch className={styles.icon} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;
