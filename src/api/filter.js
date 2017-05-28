const data = require("../../data.json");
const _ = require("lodash");
const Promise = require("bluebird");
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
        let ratingPredicate =
            options.rating !== null && place.rating >= options.rating;
        let pricePredicate =
            options.price_level !== null &&
            options.price_level >= 0 &&
            options.price_level < 5 &&
            place.price_level === options.price_level;

        // If filter by both predicate
        if (ratingPredicate && pricePredicate) temp.push(place);
        // else if (ratingPredicate)
        //     //IF just by rating
        //     temp.push(place);
        // else if (pricePredicate)
        //     // Or just price
        //     temp.push(place);
    }

    return Promise.resolve(temp);
};

const sort = (array, options) => {
    let swap, n = array.length;
    for (let c = 0; c < n - 1; c++) {
        for (let d = 0; d < n - c - 1; d++) {
            if (array[d] > array[d + 1]) {
                /* For decreasing order use < */
                swap = array[d];
                array[d] = array[d + 1];
                array[d + 1] = swap;
            }
        }
    }

    return array;
};

const filterEndpoint = (req, res) =>
    filter(req.body)
        .then(result => res.json(result))
        .catch(error => res.sendStatus(error.message));

module.exports = {
    filterEndpoint
};
