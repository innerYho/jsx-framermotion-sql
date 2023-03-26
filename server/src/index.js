const express = require("express");
const mysql = require("mysql2");
const conn = require("express-myconnection");
const cors = require("cors");
// const path = require("path");
const dotenv = require("dotenv");
const app = express();
app.set("port", process.env.PORT || 9876);
const dbConfig = {
    host: "localhost",
    port: "3306",
    user: "devuser",
    // user: "root",
    // password: "",
    password: "DevUser$",
    database: "db_water",
};

// middleware
app.use(conn(mysql, dbConfig, "single"));
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, "../../public/")));

// routes
// app.use("/", routesGeneral);
// app.use("/server", require("./src/routes/default.route"));

// port listen
app.listen(app.get("port"), () => {
    console.log("server running on port", app.get("port"));
});