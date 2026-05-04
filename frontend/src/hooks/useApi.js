import { useState, useEffect, useCallback } from 'react';

export default function useApi(asyncFn, immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn(...args);
      setData(result?.data ?? result);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [asyncFn]);

  useEffect(() => {
    if (!immediate) return;
    execute();
  }, [execute, immediate]);

  return { data, loading, error, execute };
}
