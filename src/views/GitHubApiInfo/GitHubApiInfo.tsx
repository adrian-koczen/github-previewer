import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
// Services
import { checkApiLimit } from "services/ApiRequests";

interface Rates {
  rateLimit: string;
  rateLimitRemain: string;
  rateLimitUsed: string;
  rateLimitReset: string;
}

const GitHubApiInfo = () => {
  const [rates, setRates] = useState<Rates>();

  const updateRates = async () => {
    const fetch = await checkApiLimit();
    setRates(fetch);
  };

  useEffect(() => {
    updateRates();
  }, []);

  return (
    <div>
      <h3>Github api rates</h3>
      {rates && (
        <div className={styles.ratesContainer}>
          <span>Rate limit: {rates.rateLimit}</span>
          <span>Remain requests: {rates.rateLimitRemain}</span>
          <span>Used requests: {rates.rateLimitUsed}</span>
          <span>Next rate limit refresh: {rates.rateLimitReset}</span>
        </div>
      )}
    </div>
  );
};

export default GitHubApiInfo;
