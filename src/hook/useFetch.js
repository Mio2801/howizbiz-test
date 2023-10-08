import { useState, useCallback } from "react";
import { logger } from "../utils/logger";
import axios from "axios";

export const useFetch = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getData = useCallback(async (url, params = {}) => {
    logger.group(`fetch ${url}`, params);
    try {
      logger.log("loading: true");
      setLoading(true);
      const response = await axios.get(url, { params });
      setData(response.data);
      logger.log("data: ", response.data);
    } catch (err) {
      logger.log("error: ", err);
      setError(err);
    } finally {
      setLoading(false);
      logger.log("loading: false");
    }
    logger.groupEnd(`fetch ${url}`, params);
  }, []);
  return { data, setData, error, setError, loading, setLoading, getData };
};
