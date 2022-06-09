import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
// Icons
import { ReactComponent as Info } from "icons/info.svg";
// Components
import Modal from "components/Modal/Modal";
// Views
import GitHubApiInfo from "views/GitHubApiInfo/GitHubApiInfo";

const Header = () => {
  const [githubInfoModal, setGithubInfoModal] = useState<Boolean>(false);

  const closeGithubInfoModal = () => {
    setGithubInfoModal(false);
  };

  return (
    <header className={styles.header}>
      {githubInfoModal && (
        <Modal onClose={closeGithubInfoModal}>
          <GitHubApiInfo />
        </Modal>
      )}
      <div className={styles.headerWrapper}>
        <div className={styles.headerLogo}>
          <span>Github previewer</span>
        </div>
        <div className={styles.headerButtons}>
          <Link className={styles.link} to="/search">
            Search
          </Link>
          <Info
            className={styles.infoIcon}
            onClick={() => setGithubInfoModal(true)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
