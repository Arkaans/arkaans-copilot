import express from "express";

const router = express.Router();

router.post("/api/interactions", (req, res) => {
  res.send("Interaction endpoint");
});

export default router;
