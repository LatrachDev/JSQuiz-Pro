const bcrypt = require("bcryptjs");
const { User } = require("../models");

// signup
exports.register = async (req, res) => {
    console.log("requessst hahia", req.body);
    
  const { name , email, password } = req.body;
  console.log(req.body);

  if (!name || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({ message: "User registered successfully" });
    // res.redirect('/register');

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    // save session
    req.session.user = { id: user.id, name: user.name, role: user.role };

    res.json({ message: "Logged in successfully", user: req.session.user });
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
