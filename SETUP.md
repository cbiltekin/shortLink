# Setup Instructions for ShortLink
## Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Steps
### Clone the Repo
```
git clone
cd the-shortest-url-opfwna
```
### Set up the server
1. Navigate to the server directory:
```
cd server
```
2. Install server dependencies:
```
npm install
```
3. Create a .env file in the server directory and add the .env variables inside:
```
VITE_SERVER_URL=http://localhost:3000/api
```
4. Start the server in the dev mode at http://localhost:3000 :
```
npm run dev
```
### Set up the client
1. Navigate to the client directory:
```
cd client
```
2. Install client dependencies:
```
npm install
```
3. Create a .env file in the client directory and add the .env variables inside:
```
VITE_SERVER_URL=http://localhost:3000/api
```
4. Start the client in the dev mode at http://localhost:5000 :
```
npm run dev
```
### How to run tests
#### Backend tests
1. Navigate to the server directory again:
```
cd server
```
2. Run the backend tests:
```
npm test
```
#### E2E tests
1. Navigate to the client directory again:
```
ced client
```
2. Open Cypress
```
npm run cypress:open
```
3. Run the shortLink.spec.ts test
## API Endpoints
### Encode URL
It encodes an original URL to a short URL.
- Endpoint: /api/encode
- Method: POST
- Request Body:
```
{
  "originalURL": "https://example.com"
}
```
- Response:
```
{
  "shortURL": "abcde"
}
```
### Decode URL
It decodes a short URL to the original URL.
- Endpoint: /api/decode
- Method: GET
- Request Body:
```
{
    "shortURL": "abcde"
}
```
- Response:
```
{
  "originalURL": "https://example.com"
}
```
### Decode and Redirect URL
It decodes a short URL to the original URL and redirects to the original link.
- Endpoint: /api/:id
- Method: GET
## Tech Stack
Backend: Node.js, Express.js framework (TypeScript)

Frontend: React w/ Vite, Tailwind CSS, Axios

Test: Jest, Cypress

Formatter: Prettier

## Features
- You can enter a valid URL to shorten it. You can copy the shortened URL to clipboard via Copy button. The provided URL should not be empty and should not be a short link. Otherwise, error box is seen.
- If the original link is already shortened, another error message is displayed and its correspondent short link is displayed in the box to be copied.
- You can copy the valid shortened URL and paste it to your browser as the server and client are running. Redirection is automatically made to the original link.

## License
All the completed work belongs to Cemre Biltekin.

## Notes
In case of a bug or an issue, please contact me at cemre.biltekin@gmail.com for clarification.