var query = require('./query');
var removeNullAnswers = require('./removeNullAnswers');

/**
 * Represents a function that fetches a list of questions that belong to a quiz_id
 * @param {object} client - postgres database client
 * @param {integer} quiz_id - quiz id
 * @param {function} callback - a callback function
 */

function getQuizQuestions (client, quiz_id, callback) {

    var moduleQuery = 'SELECT question_id, question, a, b, c, d FROM questions WHERE quiz_id=$1 ORDER BY question_id;';
    var moduleValue = [quiz_id];

    query(client, moduleQuery, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, removeNullAnswers(response.rows));
    });
}

module.exports = getQuizQuestions;
