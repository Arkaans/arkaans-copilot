import express from "express";

const router = express.Router();

router.get("/terms-of-service", (req, res) => {
  res.send("Terms of Service page");
});

export default router;
