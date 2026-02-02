//######################################################################################################################
//  Complete Web Developer in 2026: Zero to Mastery
//  Final Project | SmartBrain API | Database Interface
//######################################################################################################################

const knex = require("knex");

// connecting to smartbrain database ###################################################################################

const sql = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        port: 5432,
        user: "postgres",
        password: "485l1nux0s",
        database: "smartbrain"
    }
});

// exports #############################################################################################################

module.exports = sql;
