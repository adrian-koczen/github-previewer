import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useLocation, useNavigate, Link } from "react-router-dom";
// Icons
import { ReactComponent as RepositoryIcon } from "icons/repository.svg";
// Components
import Box from "components/Box/Box";
// Services
import {
  getGithubUserProfile,
  getGithubUserRepositories,
} from "services/ApiRequests";

interface Profile {
  login: string;
  name: string;
  email: string;
  id: number;
  avatar_url: string;
  repos_url: string;
}

interface Repositories {
  id: number;
  name: string;
  commitsUrl: string;
  full_name: string;
}

interface ProfileCart {
  data: Profile;
}

interface UserRepositories {
  data: Repositories[];
}

const ProfileCart = ({ data }: ProfileCart) => {
  return (
    <div className={styles.profileHeader}>
      <img src={data.avatar_url} alt={data.name} className={styles.avatar} />
      <div className={styles.profileInfo}>
        <span>{data.name ? data.name : data.login}</span>
      </div>
    </div>
  );
};

const UserRepositories = ({ data }: UserRepositories) => {
  return (
    <div className={styles.repositoriesContainer}>
      {data.map((repo) => {
        return (
          <div key={repo.id} className={styles.repositoryContainer}>
            <div className={styles.repositoryName}>
              <Link
                to={`/repository/${repo.full_name}`}
                className={styles.link}
              >
                <RepositoryIcon className={styles.icon} />
                <span>{repo.name}</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<Profile>();
  const [userRepositories, setUserRepositories] = useState<Repositories[]>();
  const username = location.pathname.split("/")[2];

  const updateProfile = async () => {
    try {
      const profile = await getGithubUserProfile(username);
      setUserProfile(profile);
    } catch (error) {
      navigate("/404");
    }
  };

  const updateRepositories = async () => {
    const repositories = await getGithubUserRepositories(username);
    setUserRepositories(repositories);
  };

  useEffect(() => {
    updateProfile();
    updateRepositories();
  }, []);

  return (
    <Box>
      <h3>User profile</h3>
      {userProfile && <ProfileCart data={userProfile} />}
      <h3>User repositories</h3>
      {userRepositories && <UserRepositories data={userRepositories} />}
    </Box>
  );
};

export default UserProfile;
