import { useEffect, useState } from "react"

const url = 'http://localhost:3502';

export function useFetch<T>(route: string, fetchMethod: string, token: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetching = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch(`${url}${route}`, {
          method: fetchMethod,
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
          }
        });
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as any)
      } finally {
        setIsLoading(false)
      }
    }
    fetching()
  }, [route, fetchMethod, token])

  return { data, error, isLoading };
}