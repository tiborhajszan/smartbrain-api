//######################################################################################################################
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | /update Route
//######################################################################################################################

const router = require("express").Router();
const fileSystem = require("fs");

// put /update #########################################################################################################

router.put("/", (request, response) => {

  // no database file > sending error ----------------------------------------------------------------------------------
  
  if (!fileSystem.existsSync("users.json")) {
    response.status(200).json({
      status: false,
      message: "Update Error : Database not found"
    });
    return;
  };
  
  // reading database file > parsing content ---------------------------------------------------------------------------

  const fileContent = fileSystem.readFileSync("users.json", "utf-8");
  const userDB = JSON.parse(fileContent);

  // user not found > sending error ------------------------------------------------------------------------------------

  if (Object.keys(userDB).length === 0
  || !userDB.hasOwnProperty(request.body.id)
  || request.body.name !== userDB[request.body.id].name
  || request.body.email !== userDB[request.body.id].email) {
    response.status(200).json({
      status: false,
      message: "Update Error : User not found"
    });
    return;
  };

  // updating user record > writing database file ----------------------------------------------------------------------

  userDB[request.body.id].detects = request.body.detects;
  userDB[request.body.id].lastLogin = request.body.lastLogin;
  fileSystem.writeFileSync("users.json", JSON.stringify(userDB));
  
  // sending updated user profile --------------------------------------------------------------------------------------

  response.status(200).json({
    status: true,
    id: userDB[request.body.id].id,
    name: userDB[request.body.id].name,
    email: userDB[request.body.id].email,
    detects: userDB[request.body.id].detects,
    lastLogin: userDB[request.body.id].lastLogin
  });

  // function termination ----------------------------------------------------------------------------------------------

  return;

});

// exports #############################################################################################################

module.exports = router;
