// on définit le model book qui se traduira par une table avec ses champs dans la BDD
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Book', {
        // Model attributes are defined here
        
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "The name is already taken."
            },
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
    },
        publication: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: {
                    msg: "The date must be an integer."
                }
            }
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: {
                    msg: "The price must be an integer."
                }
            }
        },
        language: {
            type: DataTypes.STRING,
        },
        
    }, {
        onDelete: 'CASCADE'
    }
    );
}
