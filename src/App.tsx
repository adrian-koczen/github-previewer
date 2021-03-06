import React from "react";
import styles from "styles/index.module.scss";
import { Routes, Route } from "react-router-dom";
// Views
import Header from "views/Header/Header";
import Search from "views/Search/Search";
import UserProfile from "views/UserProfile/UserProfile";
import NotFound from "views/NotFound/NotFound";
import Repositories from "views/Repositories/Repositories";
import Repository from "views/Repository/Repository";
import Footer from "views/Footer/Footer";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrapper}>
        <Routes>
          <Route index element={<Search />} />
          <Route path="search" element={<Search />} />
          <Route path="username/:username" element={<UserProfile />} />
          <Route
            path="repository/:username/:repository"
            element={<Repository />}
          />
          <Route path="repositories/:repository" element={<Repositories />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
