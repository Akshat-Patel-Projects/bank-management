import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header

  if (!token) {
    console.log('No token found');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using your JWT secret
    console.log('Token decoded:', decoded);  // Log the decoded token for debugging
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log('Token error:', error);  // Log error for debugging
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
