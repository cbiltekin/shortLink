import express from "express";
import { createShortURL, getOriginalURL, getOriginalURLRedirect } from "../controllers/shortLinkURL";

const router = express.Router();

// Define endpoints
// Encode
router.post("/encode", createShortURL);
// Decode
router.get("/decode", getOriginalURL);
// Decode and Redirect
router.get("/:id", getOriginalURLRedirect);

export default router;
