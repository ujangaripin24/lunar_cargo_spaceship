import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import User from './UserModel.js';

const { DataTypes } = Sequelize;

const Product = db.define('product', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            len: [3, 255],
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
        }
    }
}, {
    freezeTableName: true,
});
// tabel join
User.hasMany(Product);
Product.belongsTo(User, {foreignKey: 'userId'});

export default Product;