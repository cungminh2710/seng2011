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
    // Prepare data
    let temp = _.chain(data);

    // Filter by rating
    if (options.rating !== null)
        // Filter with following predicate:
        //      place.rating >= options.rating
        //      Rating of the restaurant must be greater or equal to desired rating
        temp = temp.filter(place => place.rating >= options.rating);

    // Filter by price
    if (
        options.price_level !== null &&
        options.price_level > 0 &&
        options.price_level < 5
    )
        // Filter with following predicate:
        //      place.price_level === options.price_level
        //
        temp = temp.filter(place => place.price_level === options.price_level);

    return temp.value();
};

const filterEndpoint = (req, res) =>
    filter(req.body)
        .then(result => res.json(result))
        .catch(error => res.sendStatus(error.message));

module.exports = { filterEndpoint };
