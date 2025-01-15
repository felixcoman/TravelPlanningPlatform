import { useState, useEffect } from "react";

const useFetchUsers = (id, clicked, setClicked) => {
  const ALL_URL =
    "https://travel-planning-platform.vercel.apphttps://travel-planning-platform.vercel.app/api/users";
  const ID_URL = ALL_URL + `/${id}`;

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log("id", id);

  useEffect(() => {
    setClicked(false);
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("id effect", id);
        if (!id) {
          var GO_URL = ALL_URL;
        } else {
          var GO_URL = ID_URL;
        }
        console.log("GO_URL", GO_URL);
        const response = await fetch(GO_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const userData = await response.json();
        console.log("userData", userData);
        setUsers(userData);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError("Error 808");
        setLoading(false);
      }
    };

    fetchData();
  }, [clicked]);

  return { users, loading, error, clicked, setError };
};

export default useFetchUsers;
