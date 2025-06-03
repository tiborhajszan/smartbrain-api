//######################################################################################################################
//  Zero To Mastery Academy
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | Signin Route
//######################################################################################################################

const router = require("express").Router();
const dataBase = {users: [
  {id: 123, name: "John Doe", email: "john@gmail.com", password: "cookies", detects: 0, lastLogin: new Date()},
  {id: 124, name: "Sally Doe", email: "sally@gmail.com", password: "bananas", detects: 0, lastLogin: new Date()},
]};

// post signin #########################################################################################################

router.post("/", (request, response) => {
  if (request.body.email === dataBase.users[0].email &&
  request.body.password === dataBase.users[0].password) {
    response.send("<p>/signin success</p>");
  } else {
    response.status(400).send("<p>/signin failure</p>");
  };
});

// exports #############################################################################################################

module.exports = router;
