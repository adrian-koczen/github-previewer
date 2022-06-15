import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  login: string;
  avatar: string;
  id: number;
}

const Contributor = ({ login, avatar, id }: Props) => {
  const navigate = useNavigate();

  const showUser = (login: string) => {
    navigate(`/username/${login}`);
  };

  return (
    <div className={styles.container} onClick={() => showUser(login)}>
      <img src={avatar} alt="avatar" className={styles.avatar} />
      <span>{login}</span>
    </div>
  );
};

export default Contributor;
