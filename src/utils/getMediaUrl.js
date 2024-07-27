import { apiURL } from "./apiUrl";

export const getMediaUrl = (file) => {
  if (!file) {
    return "";
  }
  return file.startsWith("http") ? file : `${apiURL}${file}`;
};
