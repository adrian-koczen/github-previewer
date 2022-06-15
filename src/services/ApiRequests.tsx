import { httpClient } from "clients/httpClient";

interface SearchQuery {
  name: string | undefined;
  page?: string;
  per_page?: string;
  sort?: string;
  order?: string;
}

export const checkApiLimit = async () => {
  const res = await httpClient.get("/users/react");
  const {
    "x-ratelimit-limit": rateLimit,
    "x-ratelimit-remaining": rateLimitRemain,
    "x-ratelimit-used": rateLimitUsed,
    "x-ratelimit-reset": rateLimitReset,
  } = res.headers;
  let result = {
    rateLimit,
    rateLimitRemain,
    rateLimitUsed,
    rateLimitReset,
  };
  const limitResetDate = new Date(parseInt(rateLimitReset, 10) * 1000)
    .toLocaleString()
    .toString();
  result = { ...result, rateLimitReset: limitResetDate };
  return result;
};

export const getGithubUserProfile = async (username: string) => {
  const res = await httpClient.get(`/users/${username}`);
  const { login, name, email, id, avatar_url, repos_url } = res.data;
  const result = { login, name, email, id, avatar_url, repos_url };
  return result;
};

export const getGithubUserRepositories = async (username: string) => {
  const res = await httpClient.get(`/users/${username}/repos`);
  const result = res.data.map((el: any) => {
    return {
      id: el.id,
      name: el.name,
      url: el.url,
      commitsUrl: el.commits_url,
      full_name: el.full_name,
    };
  });
  return result;
};

export const getRepositoriesByName = async (queries: SearchQuery) => {
  const searchQueries = {
    name: queries.name,
    page: queries.page,
    sort: queries.sort || "followers",
    order: queries.order || "desc",
    per_page: queries.per_page || "30",
  };
  const { name, page, sort, order, per_page } = searchQueries;
  const res = await httpClient.get(
    `/search/repositories?q=${name}&page=${page}&sort=${sort}&order=${order}&per_page=${per_page}`
  );
  return res.data;
};

export const getRepository = async (username: string, repository: string) => {
  const res = await httpClient.get(`/repos/${username}/${repository}`);
  return res.data;
};

export const getCommits = async (username: string, repository: string) => {
  const res = await httpClient.get(`/repos/${username}/${repository}/commits`);
  return res.data;
};

export const getContributors = async (username: string, repository: string) => {
  const res = await httpClient.get(
    `/repos/${username}/${repository}/contributors`
  );
  const data = res.data.map((el: any) => {
    return { login: el.login, id: el.id, avatar: el.avatar_url };
  });
  return data;
};
