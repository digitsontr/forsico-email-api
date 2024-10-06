const { ApiResponse, ErrorDetail } = require("../models/apiResponse");
const { jwtDecode } = require("jwt-decode");
const jwt = require("jsonwebtoken");

const jwtSettings = {
  issuer: "forsicoio.authApi.com",
  audience: "forsicoio.authApi.com",
  secretKey: "Bnxfm3x42ynnTUONOuE7gXCmb2oXYFzL",
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (isTokenExpired(token)) {
    return res
      .status(401)
      .json(ApiResponse.fail([new ErrorDetail("Invalid access token!")]));
  }

  try {
    const decoded = jwt.verify(token, jwtSettings.secretKey, {
      issuer: jwtSettings.issuer,
      audience: jwtSettings.audience,
      algorithms: ["HS256"],
    });

    req.user = decoded;
    req.accessToken = token;

    //console.log("USER FROM TOKEN : ", decoded);

    next();
  } catch (err) {
    console.log("ERR", err);

    return res
      .status(FORBIDDEN)
      .json(ApiResponse.fail([new ErrorDetail("User has not authorized!")]));
  }
};

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

module.exports = verifyToken;