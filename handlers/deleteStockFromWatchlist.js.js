const UserWatchlist = require('../models/UserWatchlist');

const deleteStockFromWatchlist = async (event) => {
    const { user_id, scrip_cd } = JSON.parse(event.body);

    if (!user_id || !scrip_cd) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing user_id or scrip_cd' }),
        };
    }

    try {
        const result = await UserWatchlist.destroy({
            where: { user_id, scrip_cd },
        });

        if (result === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Stock not found in watchlist' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Stock deleted from watchlist' }),
        };
    } catch (error) {
        console.error('Error deleting stock from watchlist:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to delete stock from watchlist', details: error.message }),
        };
    }
};

exports.handler = deleteStockFromWatchlist;