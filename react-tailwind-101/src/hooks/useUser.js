//Custom hook to store and fetch user info from localstorage
//used in conjecture with context api and usecontext hook

import { useEffect, useState } from "react";

const useUser = () => {
  const [userValue, setUserValue] = useState({ loading: true });
  useEffect(() => {
    if (localStorage.getItem("user"))
      setUserValue({ loading: false, name: localStorage.getItem("user") });
    else setUserValue({ loading: false });
  }, []);
  const setUser = (name) => {
    setUserValue({ ...userValue, name, loading: false });
    localStorage.setItem("user", name);
  };
  return { userValue, setUser };
};

export default useUser;
