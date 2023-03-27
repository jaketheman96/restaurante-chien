import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../slicers/loading.slicer';

const url = 'http://localhost:3502';

export function useGetFetch<T>(route: string, token: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetching = async (): Promise<void> => {
      try {
        dispatch(setIsLoading(true));
        const response = await fetch(`${url}${route}`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            Authorization: token,
          },
        });
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as any);
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    fetching();
  }, [route, dispatch, token]);
  
  return { data, error, setData };
}
