import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
// Components
import Box from "components/Box/Box";
import RadioButton from "components/RadioButton/RadioButton";
// Views
import Commits from "./Commits/Commits";
// Services
import { getRepository } from "services/ApiRequests";
import Contributors from "./Contributors/Contributors";

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
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handleQuery = () => {
    const values = new URLSearchParams(search);
    const view = values.get("view");
    switch (view) {
      case Tabs.Commits:
        return handleActiveTab(Tabs.Commits);
      case Tabs.Contributors:
        return handleActiveTab(Tabs.Contributors);
    }
  };

  const handleActiveTab = (tabname: Tabs) => {
    switch (tabname) {
      case Tabs.Commits:
        navigate(`${pathname}?view=Commits`);
        return setActiveTab({
          ...initialActiveTabsState,
          commits: !activeTab.commits,
        });
      case Tabs.Contributors:
        navigate(`${pathname}?view=Contributors`);
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
    handleQuery();
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
      {activeTab.contributors && <Contributors />}
    </Box>
  );
};

export default Repository;
