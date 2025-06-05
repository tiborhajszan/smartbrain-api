//######################################################################################################################
//  Zero To Mastery Academy
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | Register Route
//######################################################################################################################

const router = require("express").Router();
const fileSystem = require("fs");

// post /register ######################################################################################################

router.post("/", (request, response) => {

  // no database file > error ------------------------------------------------------------------------------------------
  if (!fileSystem.existsSync("users.json")) {
    response.status(404).send(`<p>${request.originalUrl} database not found</p>`);
  };
  
  // reading file > parsing content ------------------------------------------------------------------------------------
  const fileContent = fileSystem.readFileSync("users.json", "utf-8");
  const users = JSON.parse(fileContent);

  // creating user id --------------------------------------------------------------------------------------------------
  let userId = 1;
  if (Object.keys(users).length !== 0) {
    userId = Math.max(...Object.keys(users)) + 1;
  };

  // registering new user ----------------------------------------------------------------------------------------------
  users[userId] = {
    id: userId,
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    detects: 0,
    lastLogin: new Date(),
  };
  
  // writing file > returning new user ---------------------------------------------------------------------------------
  fileSystem.writeFileSync("users.json", JSON.stringify(users));
  response.json(users[userId]);

});

// exports #############################################################################################################

module.exports = router;
