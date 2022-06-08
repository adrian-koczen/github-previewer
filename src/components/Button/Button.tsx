import React from "react";
import styles from "./styles.module.scss";
import { ButtonVariant } from "interfaces";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: ButtonVariant;
}

const Button = ({ children, type, variant }: Props) => {
  return (
    <button type={type} className={`${styles.container} ${styles[variant]}`}>
      {children}
    </button>
  );
};

export default Button;
