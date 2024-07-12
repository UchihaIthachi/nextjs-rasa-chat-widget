// pages/api/rasa.js

import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "http://localhost:5005/webhooks/rest/webhook",
        req.body
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to communicate with Rasa server" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
