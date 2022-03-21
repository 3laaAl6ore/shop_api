const jwt = require("jsonwebtoken");
const User = require("../models/account");

module.exports = (request, response, next) => {
  const bearerHeader = request.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    //Get Token arrray by spliting
    const bearerToken = bearer[1];
    jwt.verify(
      bearerToken,
      "A6cXZ9Mj5hM4As2wiIugIz5DHNO3q1VF",
      (err, authData) => {
        if (err) {
          return response.sendStatus(403);
        } else {
          User.findById(authData._id)
            .then((account) => {
              request.token = bearerToken;
              request.account = account;
              next();
            })
            .catch((err) => {
              return response.sendStatus(403);
            });
        }
      }
    );
  } else {
    return response.sendStatus(403); // 403->i cant recognize you
    // 401 -> its not you
  }

  // console.log(bearerHeader);
};
