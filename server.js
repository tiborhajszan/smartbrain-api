//######################################################################################################################
//  Complete Web Developer in 2025: Zero to Mastery
//  Final Project | SmartBrain API | BackEnd Server
//######################################################################################################################

const express = require("express");
const api = express();
api.listen(3000);

// middleware ##########################################################################################################

api.use(express.json());

// routes ##############################################################################################################

api.use("/register", require("./routes/register.js"));
api.use("/login", require("./routes/login.js"));
api.use("/update", require("./routes/update.js"));
api.use("/detect", require("./routes/detect.js"));

// get root ############################################################################################################

api.get("/", (request, response) => {
  response.send(`
    <h1>SmartBrain API</h1>
    <p>Server for the SmartBrain Face Detector web application.</p>
  `);
});
