import { useMemo, useState } from "react";
import { Resume } from "../types/resumeTypes";

interface FetchArgs<T> {
  method: string;
  url?: string;
  body?: T;
}

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const fetchResume = async <T,>({ method, url, body }: FetchArgs<T>) => {
    console.log(`[${method}]: ${url}`);
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}${url ? `/${url}` : ""}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      setIsLoading(false);
      return responseJson;
    } else {
      console.log({ responseJson });
      setIsLoading(false);
      setError(responseJson);
      throw Error(responseJson);
    }
  };

  const api = useMemo(
    () => ({
      get: async (id?: string) => await fetchResume({ method: "GET", url: id }),
      post: async (body: Resume) => fetchResume({ method: "POST", body }),
      patch: async (id: string, body: Resume) =>
        fetchResume({ method: "PATCH", url: id, body }),
      delete: async (id: string) => fetchResume({ method: "DELETE", url: id }),
    }),
    [],
  );

  return { api, error, isLoading };
};

export default useApi;
