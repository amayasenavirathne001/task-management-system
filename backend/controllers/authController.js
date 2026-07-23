const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN USER
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// CREATE ADMIN USER (Run only once)
const registerAdmin = async (req, res) => {
  try {
    const check = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      ["admin@test.com"]
    );

    if (check.rows.length > 0) {
      return res.json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await pool.query(
      `INSERT INTO users
      (name,email,password)
      VALUES($1,$2,$3)`,
      [
        "Admin",
        "admin@test.com",
        hashedPassword,
      ]
    );

    res.json({
      message: "Admin Created Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  login,
  registerAdmin,
};