import React from "react";
import styles from "./styles.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, type }: Props) => {
  return (
    <button type={type} className={`${styles.container}`}>
      {children}
    </button>
  );
};

export default Button;
