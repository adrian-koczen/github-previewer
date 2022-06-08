import React from "react";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerLogo}>
          <span>Github previewer</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
