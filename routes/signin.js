//######################################################################################################################
//  Zero To Mastery Academy
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | Signin Route
//######################################################################################################################

const router = require("express").Router();
const fileSystem = require("fs");
const bcrypt = require("bcrypt-nodejs");

// post /signin ########################################################################################################

router.post("/", (request, response) => {

  // no database file > error ------------------------------------------------------------------------------------------
  if (!fileSystem.existsSync("users.json")) {
    response.status(404).send(`<p>${request.originalUrl} : database not found</p>`);
    return;
  };
  
  // reading database file > parsing content ---------------------------------------------------------------------------
  const fileContent = fileSystem.readFileSync("users.json", "utf-8");
  const users = JSON.parse(fileContent);
  
  // user found > returning user profile -------------------------------------------------------------------------------
  for (const user of Object.values(users)) {
    if (request.body.email === user.email
    && bcrypt.compareSync(request.body.password, user.password)) {
      response.json(user);
      return;
    };
  };
  
  // user not found > error --------------------------------------------------------------------------------------------
  response.status(404).send(`<p>${request.originalUrl} : user not found</p>`);
  
  return;
});

// exports #############################################################################################################

module.exports = router;
