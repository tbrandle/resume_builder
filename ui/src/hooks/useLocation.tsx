import qs from "qs";
import { useMemo } from "react";


const useLocation = () => {
  const queryParams = useMemo(() => qs.parse(window.location.search, { ignoreQueryPrefix: true }), [window.location.search])
  const setQueryParams = (params: Record<any, string>) => {
    // window.history.pushState(`${window.location.pathname}?${{...queryParams, ...params}}`)
  }

  return {
    queryParams,
    setQueryParams,
  };

}

export default useLocation;