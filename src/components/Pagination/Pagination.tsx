import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface Props {
  currentPage: string | {};
  changePage: (page: number) => void;
}

const Pagination = ({ currentPage, changePage }: Props) => {
  const [loading, setLoading] = useState(true);
  const [paginationList, setPaginationlist] = useState<number[]>([]);

  const updatePaginationList = () => {
    const page = Number(currentPage);
    let left = [page - 1];
    let right = [page + 1];
    if (page < 1) {
      left = [];
      right = [page + 1, page + 2];
    }
    let result = left.concat(page, right);
    setPaginationlist(result);
    setLoading(false);
  };

  useEffect(() => {
    updatePaginationList();
  }, [currentPage]);

  return (
    <div className={styles.container}>
      {!loading &&
        paginationList &&
        paginationList.map((paginationPage: number, i: number) => {
          return (
            <div
              key={i}
              className={
                currentPage !== "0"
                  ? styles.paginationPage
                  : styles.paginationPageZero
              }
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
