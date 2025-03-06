// Tests shortLinkURL controller
import request from "supertest";
import {
  saveShortLink,
  fetchOriginalURL,
  findShortByOriginal,
  isShortURL,
  clearData,
} from "../src/models/shortLinkURL";
import { app, server } from "../src/server";

describe("shortLinkURL controller (API) unit tests", () => {
  beforeAll(() => {
    // Clear the urlData object before test
    clearData();
  });

  afterAll((done) => {
    server.close(done);
  });

  it("It should be able to create a short URL from an unseen original URL", async () => {
    const response = await request(app)
      .post("/api/encode")
      .send({ originalURL: "https://example.com" });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("shortURL");
  });

  it("It should be able to give an error for creating a short URL from a short URL", async () => {
    saveShortLink("abcde1", "https://example1.com");
    const response = await request(app)
      .post("/api/encode")
      .send({ originalURL: "https://localhost:3000/api/abcde1" });
    expect(response.status).toBe(400);
  });

  it("It should be able to decode a short URL to an original URL", async () => {
    saveShortLink("abcde2", "https://example2.com");
    const response = await request(app)
      .get("/api/decode")
      .send({ shortURL: "abcde2" })
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toHaveProperty("originalURL");
    expect(response.body.originalURL).toBe("https://example2.com");
  });

  it("It should be able to give an error for decoding a non-existent short URL to an original URL", async () => {
    saveShortLink("abcde2", "https://example2.com");
    const response = await request(app)
      .get("/api/decode")
      .send({ shortURL: "abcde3" })
      .expect("Content-Type", /json/)
      .expect(404);
  });

  it("It should be able to redirect to the original URL", async () => {
    saveShortLink("abcde4", "https://example4.com");
    const response = await request(app)
      .get("/api/abcde4")
      .expect(302)
      .expect("Location", "https://example4.com");
  });
});
