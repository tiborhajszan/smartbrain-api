//######################################################################################################################
//  Zero To Mastery Academy
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | Register Route
//######################################################################################################################

const router = require("express").Router();
const fileSystem = require("fs");
const bcrypt = require("bcrypt-nodejs");

// post /register ######################################################################################################

router.post("/", (request, response) => {

  // no database file > error ------------------------------------------------------------------------------------------
  if (!fileSystem.existsSync("users.json")) {
    response.status(404).send(`<p>${request.originalUrl} : database not found</p>`);
    return;
  };
  
  // reading database file > parsing content ---------------------------------------------------------------------------
  const fileContent = fileSystem.readFileSync("users.json", "utf-8");
  const users = JSON.parse(fileContent);

  // existing user > error ---------------------------------------------------------------------------------------------
  for (const user of Object.values(users)) {
    if (user.email === request.body.email) {
      response.status(400).send(`<p>${request.originalUrl} : user already exists</p>`);
      return;
    };
  };

  // creating new user id ----------------------------------------------------------------------------------------------
  let userId = 1;
  if (Object.keys(users).length !== 0) {
    userId = Math.max(...Object.keys(users)) + 1;
  };

  // creating new user record ------------------------------------------------------------------------------------------
  users[userId] = {
    id: userId,
    name: request.body.name,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password),
    detects: 0,
    lastLogin: new Date(),
  };
  
  // writing database file > returning new user profile ----------------------------------------------------------------
  fileSystem.writeFileSync("users.json", JSON.stringify(users));
  response.json(users[userId]);

  return;
});

// exports #############################################################################################################

module.exports = router;
