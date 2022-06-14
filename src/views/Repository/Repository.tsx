import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
// Components
import Box from "components/Box/Box";
// Views
import Commits from "./Commits/Commits";
// Services
import { getRepository, getCommits } from "services/ApiRequests";

interface Repository {
  name: string;
  owner: {
    login: string;
  };
}

const Repository = () => {
  const [repository, setRepository] = useState<Repository>();
  const { pathname } = useLocation();

  const updateRepository = async () => {
    const username = pathname.split("/")[2];
    const repository = pathname.split("/")[3];
    const data = await getRepository(username, repository);
    setRepository(data);
  };

  useEffect(() => {
    updateRepository();
  }, []);

  return (
    <Box>
      <h3>Repository</h3>
      {repository && (
        <div className={styles.name}>
          <span>Repository name: {repository.name}</span>
          <span>Owner: {repository.owner.login}</span>
        </div>
      )}
      <h3>Commits</h3>
      <Commits />
    </Box>
  );
};

export default Repository;
