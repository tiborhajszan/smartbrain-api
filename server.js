//######################################################################################################################
//  Zero To Mastery Academy
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | BackEnd Server
//######################################################################################################################

const express = require("express");
const api = express();
api.listen(3000);

// get root ############################################################################################################

api.get("/", (request, response) => {
  const render = `
    <h1>SmartBrain API</h1>
    <p>BackEnd server for the SmartBrain face detection webapp.</p>
  `;
  response.send(render);
});
