//custom hook to call api

import { useEffect, useState } from "react";
const useApi = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(async () => {
    try {
      setLoading(true);
      const rwDt = await fetch(url);
      const jsonDt = await rwDt.json();
      setData(jsonDt);
    } catch (err) {
      console.log(err);
      setErr(err);
    }
    setLoading(false);
  }, [url]);
  return { loading, data, err };
};
export default useApi;
