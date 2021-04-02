import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // expire time
    // ""expiresIn should be a number of seconds or string that represents a time span eg: "1d", "20h",
    expiresIn: process.env.TOKEN_EXPIRESIN, // 7200000 ms
  });
};

export default generateToken;
