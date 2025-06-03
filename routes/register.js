//######################################################################################################################
//  Zero To Mastery Academy
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | Register Route
//######################################################################################################################

const router = require("express").Router();
const dataBase = {users: [
  {id: 123, name: "John Doe", email: "john@gmail.com", password: "cookies", detects: 0, lastLogin: new Date()},
  {id: 124, name: "Sally Doe", email: "sally@gmail.com", password: "bananas", detects: 0, lastLogin: new Date()},
]};

// post register #######################################################################################################

router.post("/", (request, response) => {
  dataBase.users.push({
    id: 125,
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    detects: 0,
    lastLogin: new Date(),
  });
  response.json(dataBase.users[dataBase.users.length-1]);
});

// exports #############################################################################################################

module.exports = router;
