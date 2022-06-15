import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useLocation } from "react-router-dom";
// Services
import { getContributors } from "services/ApiRequests";
// Components
import Contributor from "components/Contributor/Contributor";

const Contributors = () => {
  const [contributors, setContributors] = useState<[]>();
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  const updateContributors = async () => {
    try {
      const username = pathname.split("/")[2];
      const repository = pathname.split("/")[3];
      const data = await getContributors(username, repository);
      setContributors(data);
    } catch (error) {
      setContributors([]);
    }
  };

  useEffect(() => {
    updateContributors();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h3>Contributors</h3>
      <div className={styles.contributorsContainer}>
        {contributors?.map((contributor) => {
          const { id, login, avatar } = contributor;
          return <Contributor key={id} id={id} login={login} avatar={avatar} />;
        })}
      </div>
    </div>
  );
};

export default Contributors;
