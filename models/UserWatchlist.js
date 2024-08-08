const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

const UserWatchlist = sequelize.define('UserWatchlist', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    scrip_cd: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'user_watchlist', // Specify the table name explicitly if it's different from the model name
    timestamps: false, // Disable timestamps if the table doesn't have created_at and updated_at fields
});

module.exports = UserWatchlist;