const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

const Otp = sequelize.define('Otp', {
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'otps',
});

module.exports = Otp;
