import { useEffect, useState } from "react";

const useRemoveData = (localData, indexServer, setIndexServer, arrayName) => {
  console.log("indexServer", indexServer, "arrayName", arrayName);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("error", error, "loading", loading);
  console.log("inside remove data function");

  useEffect(() => {
    console.log("inside remove data useEffect");

    if (localData === null) {
      console.log("No user");
      return;
    }

    if (indexServer === null) {
      console.log("No index for server created");
      return;
    }

    setError(false);

    const handleUpdateServer = async () => {
      console.log("inside remove data async");
      setLoading(true);

      await fetch(
        `https://travel-planning-platform.vercel.apphttps://travel-planning-platform.vercel.app/api/users/${localData}`
      )
        .then((response) => response.json())
        .then((userData) => {
          // Filter out the array of objects that contains travel options at the specified index - filters out option that needs to be deleted from server
          const updatedArray = userData[arrayName].filter(
            (e, i) => i !== indexServer
          );
          console.log("updatedArray", updatedArray);

          // Send the updated data back to the server - the remaining options
          fetch(
            `https://travel-planning-platform.vercel.apphttps://travel-planning-platform.vercel.app/api/users/${localData}`,
            {
              method: "PUT",
              body: JSON.stringify({
                ...userData,
                [arrayName]: updatedArray,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => {
              setError(error);
              console.error("Error 1 updating user data:", error);
            })
            .finally(() => setLoading(false));
        })
        .catch((error) => {
          setError(error);
          console.error("Error 2 fetching user data:", error);
        })
        .finally(() => setLoading(false));
    };

    handleUpdateServer();

    setIndexServer(null);
  }, [indexServer]);
  return { error, loading };
};
export default useRemoveData;
