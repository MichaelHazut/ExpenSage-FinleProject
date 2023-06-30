import { useState, useEffect } from 'react';

export function useFetchPost(url) {
  const [postResponse, setPostResponse] = useState(null);
  const [postError, setPostError] = useState(null);
  const [postIsLoading, setPostIsLoading] = useState(false);
  
  const postFetch = async (data) => {
    setPostIsLoading(true);
    setPostError(null);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorJson = await res.json();
        throw new Error(errorJson.error);
      }

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await res.json();
        setPostResponse(json);
      } else {
        const text = await res.text();
        setPostResponse(text);
      }
    } catch (error) {
      setPostError(error.message);
    } finally {
      setPostIsLoading(false);
    }
  };

  return { postResponse, postError, postIsLoading, postFetch };
}
