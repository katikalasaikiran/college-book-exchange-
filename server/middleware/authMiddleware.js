const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Check if the "Authorization" header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token (Remove "Bearer " from string)
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

      // Add the User ID to the request object so we know WHO is logged in
      req.user = decoded;

      next(); // Move to the next step
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;
