const data = require("../../data.json");
const _ = require("lodash");

/**
 *  Filter restaurants
 *  @param {Object} options  Filter options
 *  @param {Number} options.rating Rating
 *  @param {Number} options.price_level Price Level 1-Cheap 2-Average 3-Expensive 4-Very Expensive
 *  @returns {Object[]} Array of filtered restaurants
 */
const filter = options => {
    let temp = [];

    for (let i = 0; i < data.length; i++) {
        let place = data[i];
        // Filter by rating
        // Filter with following predicate:
        //      place.rating >= options.rating
        //      Rating of the restaurant must be greater or equal to desired rating
        if (options.rating !== null && place.rating >= options.rating)
            temp.push(place);
    }

    for (let i = 0; i < temp.length; i++) {
        let place = temp[i];
        // Filter by price
        // Filter with following predicate:
        //      place.price_level === options.price_level
        if (
            options.price_level !== null &&
            options.price_level > 0 &&
            options.price_level < 5 &&
            place.price_level === options.price_level
        )
            temp.splice(i, 1); // Remove the element from array
    }

    return temp;
};

const filterEndpoint = (req, res) =>
    filter(req.body)
        .then(result => res.json(result))
        .catch(error => res.sendStatus(error.message));

module.exports = { filterEndpoint };
