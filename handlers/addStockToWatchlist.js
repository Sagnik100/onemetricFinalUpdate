const UserWatchlist = require('./models/UserWatchlist');

const addStockToWatchlist = async (event) => {
    // Assuming the request body is passed in as a string
    const { user_id, scrip_cd } = JSON.parse(event.body);

    if (!user_id || !scrip_cd) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing user_id or scrip_cd' }),
        };
    }

    try {
        const newEntry = await UserWatchlist.create({ user_id, scrip_cd });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Stock added to watchlist', data: newEntry }),
        };
    } catch (error) {
        console.error('Error adding stock to watchlist:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to add stock to watchlist', details: error.message }),
        };
    }
};

exports.handler = addStockToWatchlist;