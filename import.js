const { findPlaceNearby, findPlaceDetails } = require("./src/api/google");
const fs = require("fs");

findPlaceNearby("restaurant")
    .then(json =>
        fs.writeFileSync("data.json", JSON.stringify(json, null, 2), {
            encoding: "utf-8"
        })
    )
    .catch(err => {
        throw err;
    });
