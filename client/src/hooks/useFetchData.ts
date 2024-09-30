import { useCallback, useEffect, useRef, useState } from "react";
import { CommonError, CommonResponse } from "../types";

interface useFetchDataProps<T, E, R> {
  fetchFunc: (data?: R) => Promise<CommonResponse<T, E>>;
  immediatelyFetch?: boolean;
}

const useFetchData = <T, E = CommonError, R = undefined>({
  fetchFunc,
  immediatelyFetch = true,
}: useFetchDataProps<T, E, R>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<E | null>(null);

  const fetchedRef = useRef(false);

  const fetchData = useCallback(
    async (data?: R) => {
      if (fetchedRef.current && immediatelyFetch) return;
      fetchedRef.current = true;

      setisLoading(true);
      setError(null);

      const res = await fetchFunc(data);

      if (res.data?.data) {
        setData(res.data.data);
      }

      if (res.error) {
        setError(res.error);
      }

      setisLoading(false);

      return res;
    },
    [fetchFunc, immediatelyFetch]
  );

  useEffect(() => {
    if (immediatelyFetch) {
      fetchData();
    }
  }, [immediatelyFetch, fetchData]);

  return {
    fetchData,
    data,
    isLoading,
    error,
  };
};

export default useFetchData;
