//######################################################################################################################
//  Zero To Mastery Academy
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | Profile Route
//######################################################################################################################

const router = require("express").Router();
const fileSystem = require("fs");

// get /profile/id #####################################################################################################

router.get("/:id", (request, response) => {

  // no database file > error ------------------------------------------------------------------------------------------
  if (!fileSystem.existsSync("users.json")) {
    response.status(404).send(`<p>${request.url} database not found</p>`);
  }

  // reading file > parsing file ---------------------------------------------------------------------------------------
  const fileContent = fileSystem.readFileSync("users.json", "utf-8");
  const users = JSON.parse(fileContent);

  // database empty > error --------------------------------------------------------------------------------------------
  if (Object.keys(users).length === 0) {
    response.status(404).send(`<p>${request.url} database empty</p>`);
  }

  // user not found > error --------------------------------------------------------------------------------------------
  if (!users.hasOwnProperty(request.params.id)) {
    response.status(404).send(`<p>${request.url} user not found</p>`);
  }

  // returning user ----------------------------------------------------------------------------------------------------
  response.json(users[request.params.id]);
});

// exports #############################################################################################################

module.exports = router;
