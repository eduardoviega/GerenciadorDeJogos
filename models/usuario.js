var sequelize = require("sequelize")
var banco = require("../configs/banco-config")

var usuario = banco.define("usuario",{
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: sequelize.STRING(50),
        allowNull: false,
        unique: true,
    },
    senha: {
        type: sequelize.STRING(128),
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
})

usuario.sync() //cria a tabela

module.exports = usuario