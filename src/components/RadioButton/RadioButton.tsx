import React from "react";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  active: Boolean;
}

const RadioButton = ({ children, active }: Props) => {
  return (
    <div
      className={
        active ? `${styles.container} ${styles.active}` : styles.container
      }
    >
      {children}
    </div>
  );
};

export default RadioButton;
