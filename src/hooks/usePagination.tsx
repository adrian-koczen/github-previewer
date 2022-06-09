import React, { useEffect, useState } from "react";

const usePagination = (page: number) => {
  const [list, setList] = useState([1, 2, 3, 4, 5]);

  const updateList = (page: number) => {
    // TO DO
  };

  useEffect(() => {
    console.log("HEY", list);
  });
  return [list, updateList] as const;
};

export default usePagination;
