const express = require("express");
const path = require("path");
const next = require("next");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({
    dir: ".",
    dev: false
});
const handle = app.getRequestHandler();
const API = require("./src/api");

app.prepare().then(_ => {
    const server = express();
    server.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    server.use(bodyParser.json());
    server.use(cookieParser());
    server.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });

    // server.post("/api/register", (req, res) => API.auth.register(req, res));
    // server.post("/api/login", (req, res) => API.auth.login(req, res));
    server.post("/api/place/autocomplete", API.google.autoCompleteEndpoint);
    server.post("/api/place/details", API.google.findPlaceDetailsEndpoint);
    server.post("/api/place/search", API.google.findPlaceNearbyEndpoint);
    server.post("/api/place/filter", API.filter.filterEndpoint);
    server.get("*", (req, res) => handle(req, res));

    server.listen(8000, err => {
        if (err) throw error;

        console.log("> App running on port 3000");
    });
});
