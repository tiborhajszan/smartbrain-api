//######################################################################################################################
//  Zero To Mastery Academy
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | Detect Route
//######################################################################################################################

const router = require("express").Router();
const fileSystem = require("fs");

// put /detect #########################################################################################################

router.put("/", (request, response) => {

  // no database file > error ------------------------------------------------------------------------------------------

  if (!fileSystem.existsSync("users.json")) {
    response.status(404).send(`<p>${request.originalUrl} database not found</p>`);
  };

  // reading file > parsing content ------------------------------------------------------------------------------------

  const fileContent = fileSystem.readFileSync("users.json", "utf-8");
  const users = JSON.parse(fileContent);

  // user not found > error --------------------------------------------------------------------------------------------

  if (Object.keys(users).length === 0 || !users.hasOwnProperty(request.body.id)) {
    response.status(404).send(`<p>${request.originalUrl} user not found</p>`);
  };

  // updating profile > writing file > returning user ------------------------------------------------------------------

  users[request.body.id].detects++;
  fileSystem.writeFileSync("users.json", JSON.stringify(users));
  response.json(users[request.body.id]);

});

// exports #############################################################################################################

module.exports = router;
