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
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("An unexpected error occurred");
    }
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
    throw error.response ? error.response.data : { detail: error.detail };
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

export const myUserData = async () => {
  try {
    const response = await axiosInstance.get(`/api/auth/users/me/`);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
