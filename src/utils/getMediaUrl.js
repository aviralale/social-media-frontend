import { apiURL } from "./apiUrl";

export const getMediaUrl = (file) => {
  return file.startsWith("http") ? file : `${apiURL}${file}`;
};
