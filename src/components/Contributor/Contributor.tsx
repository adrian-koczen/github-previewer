import React from "react";
import styles from "./styles.module.scss";

interface Props {
  login: string;
  avatar: string;
  id: number;
}

const Contributor = ({ login, avatar, id }: Props) => {
  return (
    <div className={styles.container}>
      <img src={avatar} alt="avatar" className={styles.avatar} />
      <span>{login}</span>
    </div>
  );
};

export default Contributor;
