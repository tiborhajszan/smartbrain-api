//######################################################################################################################
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | /login Route
//######################################################################################################################

const router = require("express").Router();
const fileSystem = require("fs");
const bcrypt = require("bcrypt-nodejs");

// post /login #########################################################################################################

router.post("/", (request, response) => {

  // no database file > sending error ----------------------------------------------------------------------------------

  if (!fileSystem.existsSync("users.json")) {
    response.status(200).json({
      status: false,
      message: "User Database Error"
    });
    return;
  };
  
  // reading database file > parsing content ---------------------------------------------------------------------------

  const fileContent = fileSystem.readFileSync("users.json", "utf-8");
  const userDB = JSON.parse(fileContent);

  // user found > sending user profile ---------------------------------------------------------------------------------

  for (let key in userDB) {
    if (request.body.email === userDB[key].email
    && bcrypt.compareSync(request.body.password, userDB[key].password)) {
      response.status(200).json({
        status: true,
        id: Number(key),
        name: userDB[key].name,
        email: userDB[key].email,
        detects: userDB[key].detects,
        lastLogin: userDB[key].lastLogin
      });
      return;
    };
  };
  
  // user not found > sending error ------------------------------------------------------------------------------------

  response.status(200).json({
    status: false,
    message: "Login Failed"
  });

  // method ends -------------------------------------------------------------------------------------------------------
  
  return;

});

// exports #############################################################################################################

module.exports = router;
