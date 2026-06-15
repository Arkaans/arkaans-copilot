import express from "express";

const router = express.Router();

router.get("/privacy-policy", (req, res) => {
  res.send("Privacy Policy page");
});

export default router;
