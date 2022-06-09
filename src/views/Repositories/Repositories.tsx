import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useLocation } from "react-router-dom";
// Components
import Box from "components/Box/Box";
// Services
import { getRepositoriesByName } from "services/ApiRequests";
import usePagination from "hooks/usePagination";

const Repositories = () => {
  const [repositories, setRepositories] = useState<[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [page, setPage] = useState<number>(1);
  const { search, pathname } = useLocation();
  const repository = pathname.split("/")[2];
  const [pagination, updatePagination] = usePagination(page);

  const getPage = () => {
    setLoading(true);
    const searchParams = new URLSearchParams(search);
    const page = Number(searchParams.get("page"));
    updatePage(page);
  };

  const updatePage = (page: number) => {
    if (page < 0) {
      setPage(page * -1);
    } else {
      setPage(page);
    }
    updateRepositories(repository, page);
    updatePagination(page);
  };

  const updateRepositories = async (name: string, page: number) => {
    try {
      const repositories = await getRepositoriesByName(name, page);
      setRepositories(repositories);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <Box>
      {loading && <div>Loading</div>}
      {!loading && (
        <div>
          <h3>Repositories</h3>
          <div>
            {repositories && repositories.length > 0 ? (
              repositories.map((repo: any) => {
                return <div key={repo.id}>{repo.name}</div>;
              })
            ) : (
              <div>No more results</div>
            )}
          </div>
        </div>
      )}
      <div className={styles.paginationContainer}>PAGINATION</div>
    </Box>
  );
};

export default Repositories;
