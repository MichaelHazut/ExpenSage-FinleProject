import { useState, useEffect } from 'react';

const useFetch = (url, options = {}, triggerFetch) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(!triggerFetch) return;

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        if (response.status === 204) {
          setData(null);
        } else {
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options, triggerFetch]);

  return { data, error, isLoading };
};

export default useFetch;
