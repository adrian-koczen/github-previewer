import React from "react";

interface Props {
  repositories: [];
}

const RepositoriesListElement = ({ repositories }: Props) => {
  return (
    <>
      {repositories.map((repo: any) => {
        return <div key={repo.id}>{repo.name}</div>;
      })}
    </>
  );
};

export default RepositoriesListElement;
