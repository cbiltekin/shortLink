import dotenv from 'dotenv';

dotenv.config();

const serverURL = process.env.VITE_SERVER_URL;

interface URLModel {
  [shortKey: string]: string;
}

const urlData: URLModel = {};

const saveShortLink = (shortURL: string, originalURL: string) => {
  urlData[shortURL] = originalURL;
};

const fetchOriginalURL = (shortURL: string): string | null => {
  return urlData[shortURL] || null;
};

const findShortByOriginal = (originalURL: string): string | null => {
  return (
    Object.keys(urlData).find(
      (shortURL) => urlData[shortURL] === originalURL
    ) || null
  );
};

const isShortURL = (originalURL: string): boolean => {
  const url = new URL(originalURL);
  const serverDomain = new URL(serverURL!).hostname;
  return url.hostname === serverDomain;
};

const clearData = () => {
  Object.keys(urlData).forEach((key) => delete urlData[key]);
};

export { saveShortLink, fetchOriginalURL, findShortByOriginal, isShortURL, clearData };