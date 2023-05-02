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
          throw new Error(`Error: ${response.status}`);
        }

        if (response.status === 204) {
          setData(null);
        } else {
          const result = await response.json();
          setData(result);
          console.log(result);
        }
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    postDataFunction();
  }, [url, postData, triggerFetch]);

  return { data, error, isLoading };
};

export default usePostFetch;

// }, []);
// fetch(url, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
// })
//     .then((response) => {
//         if (!response.ok) {
//             return response.text().then((text) => {
//                 throw new Error(text);
//             });
//         }
//         return response.json();
//     }
//     )
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.error('There has been a problem with your post operation:', error);
//     });