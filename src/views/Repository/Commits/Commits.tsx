import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useLocation } from "react-router-dom";
import { getCommits } from "services/ApiRequests";

interface Commit {
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
}

const Commits = () => {
  const [commits, setCommits] = useState<Commit[]>();
  const { pathname } = useLocation();

  const updateCommits = async () => {
    const username = pathname.split("/")[2];
    const repository = pathname.split("/")[3];
    try {
      const data = await getCommits(username, repository);
      setCommits(data);
    } catch (error) {
      setCommits([]);
    }
  };

  useEffect(() => {
    updateCommits();
  }, []);

  if (commits?.length === 0) {
    return <div>No commits</div>;
  }

  return (
    <div className={styles.container}>
      <h3>Commits</h3>
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.author}>Author</span>
          <span className={styles.date}>Date</span>
        </div>
        <span>Message</span>
      </div>
      <div className={styles.body}>
        {commits &&
          commits.map((commit: Commit, i: number) => {
            const { name, date } = commit.commit.author;
            const newDate = new Date(date).toISOString().split("T")[0];
            const { message } = commit.commit;
            return (
              <div key={i} className={styles.commitContainer}>
                <div className={styles.commitAuthorContainer}>
                  <span className={styles.name}>{name}</span>
                  <span className={styles.date}>{newDate}</span>
                </div>
                <span className={styles.message}>{message}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Commits;
