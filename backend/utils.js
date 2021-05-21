const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somesecret",
    {
      expiresIn: "1d",
    }
  );
};

const isAuth = (req, res, next) => {
  console.log("came to isAuth",req.body);
  const authorization = req.headers.authorization;
  console.log("authorization is : ",authorization)
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer xxxxx
    jwt.verify(token, process.env.JWT_SECRET || "somesecret", (err, decode) => {
      if (err) {
        console.log("err is",err)
        res.status(401).send({ message: "Invalid Token" });
      } else {
        console.log("inside success of isAuth");
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

const isAdmin = (req, res, next) => {
  console.log("came to isAdmin");
  if (req.user && req.user.isAdmin) {
    console.log("inside sucess of isAdmin");
    next();
  } else {
    res.status(401).send({ message: "invalid admin token" });
  }
};

module.exports = { jwt, isAuth, isAdmin, generateToken };
