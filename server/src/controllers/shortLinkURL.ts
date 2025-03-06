import { Request, Response } from "express";
import { nanoid } from "nanoid";
import {
  saveShortLink,
  fetchOriginalURL,
  findShortByOriginal,
  isShortURL,
} from "../models/shortLinkURL";

export const createShortURL = async (req: Request, res: Response) => {
  try {
    const { originalURL } = req.body;
    // Invalid request from client
    if (!originalURL) {
      res.status(400).json({ error: "Valid URL entry is required." });
      return;
    }
    // Check if the original URL is already shortened
    const shortURLFound = findShortByOriginal(originalURL);
    if (shortURLFound) {
      res.status(409).json({
        error: "This URL is already shortened.",
        shortURL: shortURLFound,
      });
      return;
    }
    // Check if the original URL is a short link
    const isPotentialShortLink = isShortURL(originalURL);
    if (isPotentialShortLink) {
      res.status(400).json({
        error: "The provided URL cannot be a short link.",
      });
      return;
    }
    // Generate a short URL with Nanoid & Make sure it's unique
    let shortURL;
    do {
      shortURL = nanoid(6);
    } while (fetchOriginalURL(shortURL) !== null);
    // Save the pair in memory
    saveShortLink(shortURL, originalURL);
    // Return that the shortened URL creation was successful
    res.status(201).json({ shortURL });
    return;
  } catch (error) {
    // Unexpected error
    res.status(500).json({ error: "Internal server error." });
    return;
  }
};

export const getOriginalURL = async (req: Request, res: Response) => {
  try {
    const { shortURL } = req.body;
    // Fetch the original URL from memory using the unique short link
    const originalURL = fetchOriginalURL(shortURL as string);
    if (!originalURL) {
      res.status(404).json({ error: "Requested shortened URL is not found." });
      return;
    }
    res.status(200).json({ originalURL });
    return;
  } catch (error) {
    // Unexpected error
    res.status(500).json({ error: "Internal server error." });
    return;
  }
};

export const getOriginalURLRedirect = async (req: Request, res: Response) => {
  try {
    const shortURL = req.params.id;
    // Fetch the original URL from memory using the unique short link
    const originalURL = fetchOriginalURL(shortURL as string);
    if (!originalURL) {
      res.status(404).json({ error: "Requested shortened URL is not found." });
      return;
    }
    res.redirect(originalURL);
    return;
  } catch (error) {
    // Unexpected error
    res.status(500).json({ error: "Internal server error." });
    return;
  }
};
