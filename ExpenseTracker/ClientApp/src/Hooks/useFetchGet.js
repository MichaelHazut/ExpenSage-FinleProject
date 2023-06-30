import { useState } from 'react';

export function useFetchGet(url) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getFetch = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Server responded with an error');
            }
            const json = await res.json();
            setResponse(json);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { response, error, isLoading, getFetch };
}
