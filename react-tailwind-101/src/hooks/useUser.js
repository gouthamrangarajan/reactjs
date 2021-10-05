//Custom hook to store and fetch user info from localstorage
//used in conjecture with context api and usecontext hook

import { useEffect, useState } from "react";

const useUser = () => {
  const [userValue, setUserValue] = useState({ loading: true });
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("user"))
        setUserValue({ loading: false, name: localStorage.getItem("user") });
      else setUserValue({ loading: false });
    }, 1000);
  }, []);
  const setUser = (name) => {
    setUserValue({ ...userValue, name, loading: false });
    localStorage.setItem("user", name);
  };
  return { userValue, setUser };
};

export default useUser;
