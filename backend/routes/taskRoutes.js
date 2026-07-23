const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");

// Dashboard
router.get("/stats", verifyToken, getTaskStats);

// CRUD
router.get("/", verifyToken, getTasks);

router.get("/:id", verifyToken, getTaskById);

router.post("/", verifyToken, createTask);

router.put("/:id", verifyToken, updateTask);

router.delete("/:id", verifyToken, deleteTask);

module.exports = router;