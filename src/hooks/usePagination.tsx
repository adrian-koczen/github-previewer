import React, { useState } from "react";

const usePagination = (page: number) => {
  const [paginationList, setList] = useState([1, 2, 3, 4, 5]);

  const updatePaginationList = (page: number) => {
    if (page > 2) {
      const left = [page - 2, page - 1];
      const right = [page + 1, page + 2];
      const currentPage = [page];
      const list = left.concat(currentPage, right);
      setList(list);
    }
  };

  return [paginationList, updatePaginationList] as const;
};

export default usePagination;
