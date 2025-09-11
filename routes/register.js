//######################################################################################################################
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | /register Route
//######################################################################################################################

const router = require("express").Router();
const fileSystem = require("fs");
const bcrypt = require("bcrypt-nodejs");

// post /register ######################################################################################################

router.post("/", (request, response) => {

  // invalid username > error ------------------------------------------------------------------------------------------

  if (!request.body.name || 100 < request.body.name.length) {
    response.status(400).send("Register Error : invalid username");
    return;
  };

  // invalid email > error ---------------------------------------------------------------------------------------------

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!request.body.email || 100 < request.body.email.length || !emailRegex.test(request.body.email)) {
    response.status(400).send("Register Error : invalid email");
    return;
  };
  
  // invalid password > error ------------------------------------------------------------------------------------------

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{10,})/;
  if (!request.body.password || 50 < request.body.password.length || !passwordRegex.test(request.body.password)) {
    response.status(400).send("Register Error : invalid password");
    return;
  };

  // no database file > error ------------------------------------------------------------------------------------------
  
  if (!fileSystem.existsSync("users.json")) {
    response.status(404).send("Register Error : user database not found");
    return;
  };
  
  // reading database file > parsing content ---------------------------------------------------------------------------

  const fileContent = fileSystem.readFileSync("users.json", "utf-8");
  const userDB = JSON.parse(fileContent);

  // existing user > error ---------------------------------------------------------------------------------------------

  for (let user of Object.values(userDB)) {
    if (request.body.email === user.email) {
      response.status(400).send("Register Error");
      return;
    };
  };

  // creating new user id ----------------------------------------------------------------------------------------------

  let userId = 1;
  if (Object.keys(userDB).length !== 0) {
    userId = Math.max(...Object.keys(userDB)) + 1;
  };

  // creating new user record ------------------------------------------------------------------------------------------

  userDB[userId] = {
    id: userId,
    name: request.body.name,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password),
    detects: 0,
    lastLogin: new Date(),
  };
  
  // writing database file > returning new user profile ----------------------------------------------------------------

  fileSystem.writeFileSync("users.json", JSON.stringify(userDB));
  response.status(200).json(userDB[userId]);

  return;
});

// exports #############################################################################################################

module.exports = router;
