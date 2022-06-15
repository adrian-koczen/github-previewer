import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// Components
import Box from "components/Box/Box";
import Pagination from "components/Pagination/Pagination";
import RepositoriesListElement from "components/RepositoriesListElement/RepositoriesListElement";
// Services
import { getRepositoriesByName } from "services/ApiRequests";
// Hooks
import usePagination from "hooks/usePagination";

interface SearchQuery {
  name: string | undefined;
  page?: string;
  per_page?: string;
  sort?: string;
  order?: string;
}

const Repositories = () => {
  const [repositories, setRepositories] = useState<[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  // Router
  const params = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Hooks
  const [paginationLoading, queryValues, currentPage] = usePagination();

  const changePage = (page: number) => {
    navigate({
      pathname: pathname,
      search: `?page=${page}&order=desc&sort=followers&per_page=30`,
    });
  };

  const updateRepositories = async (queries: SearchQuery) => {
    try {
      const repositories = await getRepositoriesByName(queries);
      setRepositories(repositories.items);
      setLoading(false);
    } catch (error) {
      setRepositories([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (!paginationLoading) {
      const repositoryName = params.repository;
      const queries = { ...queryValues, name: repositoryName };
      updateRepositories(queries);
    }
  }, [paginationLoading, queryValues]);

  if (loading) {
    return (
      <Box>
        <div>Loading</div>
      </Box>
    );
  }

  return (
    <Box>
      <div className={styles.container}>
        <h3>Repositories</h3>
        {repositories && repositories.length > 0 ? (
          <RepositoriesListElement repositories={repositories} />
        ) : (
          <div>No more results</div>
        )}
      </div>
      {repositories.length > 0 && currentPage && (
        <Pagination currentPage={currentPage} changePage={changePage} />
      )}
    </Box>
  );
};

export default Repositories;
