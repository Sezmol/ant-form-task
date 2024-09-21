import { useEffect, useRef, useState } from "react";
import { CommonError, CommonResponse } from "../types";

interface useFetchDataProps<T> {
  fetchFunc: () => Promise<CommonResponse<T>>;
}

const useFetchData = <T>({ fetchFunc }: useFetchDataProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<CommonError | null>(null);

  const fetchedRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (fetchedRef.current) return;
      fetchedRef.current = true;

      setisLoading(true);
      setError(null);

      const { data: res, error } = await fetchFunc();

      if (res) {
        setData(res.data);
      }

      if (error) {
        setError(error);
      }

      setisLoading(false);
    };

    fetchData();
  }, [fetchFunc, data]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetchData;
