import * as React from 'react';
import axios from 'axios';
import { serverURL } from '../../helpers/Constants';

interface IFormContainerProps {}

const FormContainer: React.FunctionComponent<IFormContainerProps> = () => {
  const [originalURL, setOriginalURL] = React.useState<string>('');
  const [shortURL, setShortURL] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverURL}/encode`, { originalURL });
      setShortURL(response.data.shortURL);
      setError('');
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setError('This URL is already shortened. Copy from below.');
        setShortURL(`${error.response.data.shortURL}`);
      } else if (error.response && error.response.status === 400) {
        setError(
          'The provided URL must be valid and it cannot be a short link.'
        );
        setShortURL(``);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${serverURL}/${shortURL}`);
      alert('Short URL copied to clipboard!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
      <h1 className="text-6xl font-bold font-chewy text-center text-purple-500 mb-4">
        ShortLink
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Shorten URL, Share Faster
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="url"
          placeholder="Enter URL to shorten in seconds!"
          required
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={originalURL}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOriginalURL(e.target.value)
          }
          onClick={(e) => e.currentTarget.select()}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600"
        >
          Shorten for free &rarr;
        </button>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg shadow-inner text-center">
          <p>{error}</p>
        </div>
      )}
      {shortURL && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-inner text-center">
          <p className="text-lg mb-4">Your shortened URL:</p>
          <div className="flex justify-center items-center space-x-4">
            <input
              type="text"
              readOnly
              value={serverURL + '/' + shortURL}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleCopy}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 flex items-center"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormContainer;
