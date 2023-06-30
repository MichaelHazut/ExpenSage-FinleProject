import { useState, useEffect } from 'react';

const usePostFetch = (url, postData = {}, triggerFetch) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if(!triggerFetch) return;
    const postDataFunction = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
        if (!response.ok) {
          var resJson = await response.json();
          setError(resJson.message || '');
          throw new Error(`Error: ${response.status} : ${resJson.message || ''}`);
        }

        if (response.status === 204) {
          setData(null);
        } else {
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    postDataFunction();
  }, [url, postData, triggerFetch]);

  return { data, error, isLoading };
};

export default usePostFetch;
