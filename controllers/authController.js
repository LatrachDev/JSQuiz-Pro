const bcrypt = require("bcryptjs");
const { User } = require("../models");

// signup
exports.register = async (req, res) => {
    console.log("requessst hahia", req.body);
    
  const { username, password } = req.body;
  console.log(req.body);

  if (!username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hashedPassword,
      role: "user",
    });

    console.log("User registered successfully");
    

    // res.status(201).json({ message: "User registered successfully" });
    res.redirect('/auth/login');

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    // save session
    req.session.user = { id: user.id, name: user.username, role: user.role };

    // res.json({ message: "Logged in successfully", user: req.session.user });
    res.redirect('/themes');
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout error" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};