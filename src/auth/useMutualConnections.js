import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "./auth"; // Assuming you have a token management function
import { apiURL } from "@/utils/apiUrl";

const useMutualConnections = (username) => {
  const [mutualConnections, setMutualConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchMutualConnections = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${apiURL}users/${username}/mutual-connections/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setMutualConnections(response.data || []);
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (username && token) {
      fetchMutualConnections();
    }
  }, [username, token]);
  return {
    mutualConnections,
    mutualConnectionsLength: mutualConnections.length,
    loading,
    error,
  };
};

export default useMutualConnections;
