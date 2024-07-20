import axios from "axios";
import { apiAuthURL, apiURL } from "@/utils/apiUrl";
import { useParams } from "react-router-dom";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${apiAuthURL}users/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const activateUser = async (data) => {
  try {
    const response = await axios.post(`${apiAuthURL}users/activation/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error activating user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${apiAuthURL}jwt/create/`, data);
    if (response.data.access) {
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("username", data.username);
      return true;
    }
  } catch (error) {
    console.error(
      "Error logging in user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUsername = () => {
  return localStorage.getItem("username");
};

export const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const isRequestedUser = () => {
  const { username } = useParams();
  const requestedUser = localStorage.getItem("username");
  return username == requestedUser;
};
