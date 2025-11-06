//authMiddleware is used to protect your routes and verify that a request comes from an authenticated user
// In any web app, certain routes should only be accessible to logged-in users.

const { verifyToken } = require("../utils/tokenUtils");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // Authorization: Bearer <token> (this is the normal schema of our jwt which lives in header of the request)

  //Check if it starts with Bearer if not its not a token
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  //authHeader.split(' ') splits 'Bearer <token>' into ['Bearer', '<token>'].
  //[1] picks the second element, which is the token itself.
  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token); // This will return error if not verified
    req.user = decoded; // { user_id, user_role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
