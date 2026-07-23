const express = require("express");
const router = express.Router();

const {
  login,
  registerAdmin,
} = require("../controllers/authController");

router.post("/login", login);

// Run once only
router.get("/create-admin", registerAdmin);

module.exports = router;