function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // Add user to req object so it's accessible in routes
    req.user = req.session.user;
    return next();
  }
  // Redirect to login page for web routes
  return res.redirect('/auth/login');
};

function isAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Forbidden. Admins only." });
};

module.exports = {
    isAuthenticated, isAdmin,
};