// This will check if the request is coming from admin or not
//The role parameter will normally only be "admin"
const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.user.user_role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = roleMiddleware;
