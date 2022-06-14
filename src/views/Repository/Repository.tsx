import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
// Components
import Box from "components/Box/Box";
import RadioButton from "components/RadioButton/RadioButton";
// Views
import Commits from "./Commits/Commits";
// Services
import { getRepository } from "services/ApiRequests";

const initialActiveTabsState = {
  commits: false,
  contributors: false,
};

enum Tabs {
  Commits = "Commits",
  Contributors = "Contributors",
}

interface Repository {
  name: string;
  owner: {
    login: string;
  };
}

const Repository = () => {
  const [repository, setRepository] = useState<Repository>();
  const [activeTab, setActiveTab] = useState(initialActiveTabsState);
  const { pathname } = useLocation();

  const handleActiveTab = (tabname: Tabs) => {
    switch (tabname) {
      case Tabs.Commits:
        return setActiveTab({
          ...initialActiveTabsState,
          commits: !activeTab.commits,
        });
      case Tabs.Contributors:
        return setActiveTab({
          ...initialActiveTabsState,
          contributors: !activeTab.contributors,
        });
    }
  };

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
        <div className={styles.nameContainer}>
          <span className={styles.name}>
            Repository name: {repository.name}
          </span>
          <span>Owner: {repository.owner.login}</span>
        </div>
      )}
      <h3>Select view</h3>
      <div
        onClick={() => {
          handleActiveTab(Tabs.Commits);
        }}
      >
        <RadioButton active={activeTab.commits}>Commits</RadioButton>
      </div>
      <div
        onClick={() => {
          handleActiveTab(Tabs.Contributors);
        }}
      >
        <RadioButton active={activeTab.contributors}>Contributors</RadioButton>
      </div>
      {activeTab.commits && <Commits />}
    </Box>
  );
};

export default Repository;
