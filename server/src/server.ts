import express from "express";
import cors from "cors";
import session from "express-session";
import shortLinkURL from "./routes/shortLinkURL";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const serverURL = process.env.VITE_SERVER_URL || "http://localhost:3000/api";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

app.use("/api/", shortLinkURL);

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export { app, server };
