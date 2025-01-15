import { useEffect, useState } from "react";

const useAddData = (localData, addData, setAddData, arrayName) => {
  console.log("addData", addData, "arrayName", arrayName);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("error", error, "loading", loading);
  console.log("inside add data function");

  useEffect(() => {
    console.log("inside add data useEffect");

    if (localData === null) {
      console.log("No user");
      return;
    }

    if (addData === "") {
      console.log("No data");
      return;
    }

    setError(false);

    const handleUpdateServer = async () => {
      console.log("inside add data async");
      setLoading(true);

      await fetch(
        `https://travel-planning-platform.vercel.apphttps://travel-planning-platform.vercel.app/api/users/${localData}`
      )
        .then((response) => response.json())
        .then((userData) => {
          // Check if the user has a travel options array, if not, initialize it
          const newData = userData[arrayName]
            ? [...userData[arrayName], addData]
            : [addData];

          // Send the updated data back to the server - new travel options
          fetch(
            `https://travel-planning-platform.vercel.apphttps://travel-planning-platform.vercel.app/api/users/${localData}`,
            {
              method: "PUT",
              body: JSON.stringify({ ...userData, [arrayName]: newData }),
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

    setAddData("");
  }, [addData]);
  return { error, loading };
};
export default useAddData;
