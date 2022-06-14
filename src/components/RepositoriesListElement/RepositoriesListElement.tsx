import React from "react";
import styles from "./styles.module.scss";
// Router
import { Link } from "react-router-dom";
// Icons
import { ReactComponent as ArrowRight } from "icons/rightArrow.svg";

interface Props {
  repositories: [];
}

const RepositoriesListElement = ({ repositories }: Props) => {
  return (
    <>
      {repositories.map((repo: any) => {
        return (
          <div key={repo.id} className={styles.container}>
            <div className={styles.name}>{repo.name}</div>
            <Link to={`/repository/${repo.full_name}`} className={styles.link}>
              <ArrowRight className={styles.icon} />
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default RepositoriesListElement;
