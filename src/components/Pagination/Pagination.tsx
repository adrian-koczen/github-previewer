import React from "react";
import styles from "./styles.module.scss";

interface Props {
  paginationList: number[];
  changePage: (page: number) => void;
}

const Pagination = ({ paginationList, changePage }: Props) => {
  return (
    <div className={styles.container}>
      {paginationList.map((paginationPage: number, i: number) => {
        return (
          <div
            key={i}
            className={styles.paginationPage}
            onClick={() => changePage(paginationPage)}
          >
            {paginationPage}
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
