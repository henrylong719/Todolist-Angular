import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decode.id).select('-password');

      next();
    } catch (error) {
      return res.status(401).send('Not authorized');
    }
  }

  if (!token) {
    return res.status(401).send('Not authorized, no token');
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    // 401 Unauthorized
    res.status(401).send('Not authorized as an admin');
  }
};

export { protect, admin };
