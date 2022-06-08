import React, { useState } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: Props) => {
  const [isActive, setActive] = useState(true);
  if (!isActive) return <></>;

  const close = (e: any) => {
    if (e.target.className === styles.container) {
      onClose();
      setActive(false);
    }
  };

  return (
    <div className={styles.container} onClick={(e) => close(e)}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Modal;
