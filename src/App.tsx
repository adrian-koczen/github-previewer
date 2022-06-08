import React from "react";
import styles from "styles/index.module.scss";
import { Routes, Route, Link } from "react-router-dom";
// Views
import Header from "views/Header/Header";
import Search from "views/Search/Search";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrapper}>
        <Routes>
          <Route index element={<Search />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
