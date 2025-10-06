const { User, UserBadge } = require("../models");

async function setUser(req, res, next) {
  try {
    if (req.session?.user?.id) {
      // Fetch user along with their badge
      const userFromDb = await User.findByPk(req.session.user.id, {
        include: [
          { model: UserBadge } // fetch the associated badge
        ]
      });

      if (userFromDb) {
        const userJSON = userFromDb.toJSON();
        // Save the badge name directly for easier use in EJS
        userJSON.badge = userJSON.UserBadge?.badge_name || "Beginner";
        res.locals.user = userJSON;
      } else {
        res.locals.user = null;
      }
    } else {
      res.locals.user = null;
    }
    next();
  } catch (err) {
    console.error("Error fetching user:", err);
    res.locals.user = null;
    next();
  }
}

module.exports = setUser;