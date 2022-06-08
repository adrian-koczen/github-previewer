import { httpClient } from "clients/httpClient";

export const checkApiLimit = async () => {
  const res = await httpClient.get("/users/adrian-koczen");
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
