import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const usePagination = () => {
  const [queryValues, setQueryValues] = useState({});
  const [currentPage, setCurrentPage] = useState<string>();
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();

  const handle = async () => {
    await getSearchQueryValues();
    setLoading(false);
  };

  const getSearchQueryValues = () => {
    return new Promise<void>((resolve) => {
      const values = new URLSearchParams(search);
      const page = values.get("page");
      const sort = values.get("sort");
      const order = values.get("order");
      const per_page = values.get("per_page");
      setQueryValues({ page, sort, order, per_page });
      if (page) {
        setCurrentPage(page);
      } else {
        setCurrentPage("0");
      }
      resolve();
    });
  };

  useEffect(() => {
    setLoading(true);
    handle();
  }, [search]);

  return [loading, queryValues, currentPage];
};

export default usePagination;
