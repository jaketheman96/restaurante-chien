import { useEffect, useState } from "react"

const url = 'http://localhost:3502';

export function useFetch<T>(route: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetching = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch(`${url}${route}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as any)
      } finally {
        setIsLoading(false)
      }
    }
    fetching()
  }, [route])

  return { data, error, isLoading };
}