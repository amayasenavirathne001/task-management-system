const pool = require("../config/db");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, due_date } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks
      (title,description,priority,status,due_date,user_id)
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        title,
        description,
        priority,
        status,
        due_date,
        req.user.id,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

// Get All Tasks + Search + Filter + Sort
const getTasks = async (req, res) => {
  try {
    const { search, status, priority, sort } = req.query;

    let query =
      "SELECT * FROM tasks WHERE user_id = $1";

    const values = [req.user.id];

    let index = 2;

    if (search) {
      query += ` AND LOWER(title) LIKE LOWER($${index})`;
      values.push(`%${search}%`);
      index++;
    }

    if (status) {
      query += ` AND status=$${index}`;
      values.push(status);
      index++;
    }

    if (priority) {
      query += ` AND priority=$${index}`;
      values.push(priority);
      index++;
    }

    if (sort === "oldest") {
      query += " ORDER BY created_at ASC";
    } else if (sort === "due_date") {
      query += " ORDER BY due_date ASC";
    } else {
      query += " ORDER BY created_at DESC";
    }

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

// Get Single Task
const getTaskById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE id=$1 AND user_id=$2",
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      due_date,
    } = req.body;

    const result = await pool.query(
      `UPDATE tasks
      SET
      title=$1,
      description=$2,
      priority=$3,
      status=$4,
      due_date=$5,
      updated_at=NOW()
      WHERE id=$6
      AND user_id=$7
      RETURNING *`,
      [
        title,
        description,
        priority,
        status,
        due_date,
        req.params.id,
        req.user.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Update failed",
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id=$1 AND user_id=$2 RETURNING *",
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task Deleted Successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Delete Failed",
    });
  }
};

// Dashboard Statistics
const getTaskStats = async (req, res) => {
  try {
    const total = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE user_id=$1",
      [req.user.id]
    );

    const pending = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE status='Pending' AND user_id=$1",
      [req.user.id]
    );

    const progress = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE status='In Progress' AND user_id=$1",
      [req.user.id]
    );

    const completed = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE status='Completed' AND user_id=$1",
      [req.user.id]
    );

    const overdue = await pool.query(
      `SELECT COUNT(*) FROM tasks
       WHERE due_date<CURRENT_DATE
       AND status!='Completed'
       AND user_id=$1`,
      [req.user.id]
    );

    res.json({
      total: Number(total.rows[0].count),
      pending: Number(pending.rows[0].count),
      inProgress: Number(progress.rows[0].count),
      completed: Number(completed.rows[0].count),
      overdue: Number(overdue.rows[0].count),
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
};