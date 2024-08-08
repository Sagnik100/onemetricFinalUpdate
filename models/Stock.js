const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
require('dotenv').config();

const Stock = sequelize.define('Stock', {
    isin_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
    },
    sc_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    scrip_cd: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock_long_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    sc_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'stocks',
});

module.exports = Stock;