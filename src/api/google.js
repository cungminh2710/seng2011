require('isomorphic-fetch');

const API_KEY = 'AIzaSyBbf8SUfyWfP_6UzhQx74CkMyn7sJwIMcw';
const GOOGLE_MAP_API = 'https://maps.googleapis.com/maps/api';
const AUTO_COMPLETE_ENDPOINT = GOOGLE_MAP_API + '/place/autocomplete/json?key=' + API_KEY;
const PLACE_NEARBY = GOOGLE_MAP_API + '/place/nearbysearch/json?key=' + API_KEY;
const PLACE_DETAILS = GOOGLE_MAP_API + '/place/details/json?key=' + API_KEY;

const autoComplete = location =>
    fetch(AUTO_COMPLETE_ENDPOINT + '&types=establishment&input=' + encodeURIComponent(location))
    .then(res => {
        if (res.status >= 400)
            return Promise.reject(res.status);
        return res.json();
    })
    .then(response => Promise.resolve(
        response.predictions.map(
            place => ({
                id: place.id,
                description: place.description

            })
        )));

const findPlaceNearby = query =>
    fetch(PLACE_NEARBY + '&type=restaurant&location=-33.8670522,151.1957362&radius=500&query=' + query)
    .then(res => {
        if (res.status >= 400)
            return Promise.reject(res.status);
        return res.json();
    })
    .then(response => Promise.resolve(response.results));

const findPlaceDetails = id =>
    fetch(PLACE_DETAILS + '&placeid=' + id)
    .then(res => {
        if (res.status >= 400)
            return Promise.reject(res.status);
        return res.json();
    })
    .then(response => Promise.resolve(response.result));

const autoCompleteEndpoint = (req, res) => {
    autoComplete(req.body.location)
        .then(result => res.json(result))
        .catch(error => res.sendStatus(error.message))
}

const findPlaceNearbyEndpoint = (req, res) => {
    findPlaceNearby(req.body.query)
        .then(results => res.json(results))
        .catch(error => res.sendStatus(error.message))
}

const findPlaceDetailsEndpoint = (req, res) => {
    findPlaceNearby(req.body.placeid)
        .then(results => res.json(results))
        .catch(error => res.sendStatus(error.message))
}

module.exports = {
    autoCompleteEndpoint,
    findPlaceNearbyEndpoint,
    findPlaceDetailsEndpoint
}