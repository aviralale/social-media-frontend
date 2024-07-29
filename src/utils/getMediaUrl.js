import { baseURL } from "./apiUrl";

export const getMediaUrl = (file) => {
  if (!file) {
    return "";
  }
  return file.startsWith("http") ? file : `${baseURL}${file}`;
};
