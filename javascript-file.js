const db = require('./db-connect');

module.exports.myTestFunction = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const userTable = await db.query('SELECT * FROM Users');
    await db.end();
    if (userTable) {
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(userTable),
        })
    } else {
        callback('error', {
            statusCode: 400,
             headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                message: 'No functions found.'
            }),
        })
    }
};