//custom hook to call api

import { useEffect, useState } from "react";
const useApi = (url) => {
  let controller = null;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  useEffect(async () => {
    try {
      controller = new AbortController();
      let signal = controller.signal;
      setLoading(true);
      const rwDt = await fetch(url, { signal });
      const jsonDt = await rwDt.json();
      setData(jsonDt);
    } catch (err) {
      console.log("error", err);
      setErr(err);
    }
    setLoading(false);
    return () => {
      controller.abort();
    };
  }, [url]);
  return { loading, data, err };
};
export default useApi;
