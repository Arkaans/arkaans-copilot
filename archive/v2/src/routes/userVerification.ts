import express from "express";

const router = express.Router();

router.get("/verify-user", (req, res) => {
  res.send("User verification page");
});

export default router;
