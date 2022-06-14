import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// Components
import Box from "components/Box/Box";
// Services
import { getRepositoriesByName } from "services/ApiRequests";
// Hooks
import usePagination from "hooks/usePagination";

const Repositories = () => {
  const [repositories, setRepositories] = useState<[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [page, setPage] = useState<number>(1);

  // Router
  const { pathname } = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const repository = pathname.split("/")[2];
  const [pagination, updatePagination] = usePagination(page);

  const changePage = (page: number) => {
    const url = pathname.split("/");
    const newUrl = `${url[1]}/${url[2]}/${page}`;
    navigate(`/${newUrl}`);
  };

  const getPage = () => {
    setLoading(true);
    const page = Number(params.page);
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
      setRepositories([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPage();
  }, [params]);

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
      {!loading && repositories.length > 0 && (
        <div className={styles.paginationContainer}>
          {pagination.map((paginationPage: number, i: number) => {
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
      )}
    </Box>
  );
};

export default Repositories;
