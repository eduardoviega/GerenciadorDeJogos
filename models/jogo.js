var sequelize = require("sequelize")
var banco = require("../configs/banco-config")

var jogo = banco.define("jogo",{
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    criador: {
        type: sequelize.STRING(40),
        allowNull: false,
    },
    ano: {
        type: sequelize.STRING(20),
        allowNull: false,
    },
    idade: {
        type: sequelize.INTEGER,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
})

jogo.sync() //cria a tabela

module.exports = jogo