//######################################################################################################################
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | /login Route
//######################################################################################################################

const router = require("express").Router();
const fileSystem = require("fs");
const bcrypt = require("bcrypt-nodejs");

// post /login #########################################################################################################

router.post("/", (request, response) => {

  // no database file > error ------------------------------------------------------------------------------------------

  if (!fileSystem.existsSync("users.json")) {
    response.status(404).send("Login Failed : user database not found");
    return;
  };
  
  // reading database file > parsing content ---------------------------------------------------------------------------

  const fileContent = fileSystem.readFileSync("users.json", "utf-8");
  const userDB = JSON.parse(fileContent);

  // user found > returning user profile -------------------------------------------------------------------------------

  for (let user of Object.values(userDB)) {
    if (request.body.email === user.email
    && bcrypt.compareSync(request.body.password, user.password)) {
      response.status(200).json(user);
      return;
    };
  };
  
  // user not found > error --------------------------------------------------------------------------------------------

  response.status(400).send("Login Failed");
  
  return;
});

// exports #############################################################################################################

module.exports = router;
