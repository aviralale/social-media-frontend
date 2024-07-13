import axios from "axios";
import { apiURL } from "./apiUrl";

export const followUser = async (username) => {
  try {
    const data = {
      followed: username,
    };
    await axios.post(`${apiURL}/api/followers/follow/`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
