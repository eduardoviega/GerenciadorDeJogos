var jogo = require('../models/jogo');
var axios = require("axios")
var qs = require("querystring")

const jogoControlador = {};

//CREATE
jogoControlador.inserirJogoBanco = function (req, res) {
    jogo.create({
        descricao: req.body.descricao,
        criador: req.body.criador,
        ano: req.body.ano,
        idade: req.body.idade
    }).then(
        function(){
            res.status(200).redirect("/");
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao criar jogo: " + error);
        }
    )
}

//READ
jogoControlador.buscarJogoBanco = function(req,res){
    jogo.findAll({
        raw: true
    }).then(
        function(dados){
            res.render("inicio",{jogos: dados})
            console.log(dados)
        }
    ).catch(
        function(erro){
            res.status(500).send(`Erro ao buscar os jogos: ${erro}`)
        }
    )
}

//UPDATE
jogoControlador.atualizarJogoBanco = function (req, res) {
    erros = []
    
    jogo.update({
        descricao: req.body.descricao,
        criador: req.body.criador,
        ano: req.body.ano,
        idade: req.body.idade
    },{
        where: {
            id: req.params.id
        }
    }).then(
        function(){
            res.sendStatus(200)
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao atualizar o jogo: " + error)
        }
    )
}

//DELETE
jogoControlador.removerJogoBanco = function (req, res) {
    jogo.destroy(
        {
        where: {
            id: req.params.id
        }
    }).then(
        function(){
            res.sendStatus(200)
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao remover jogo: " + error)
        }
    )
}

//métodos do handlebars
jogoControlador.cadastro = function (req, res) {
    try {
        res.render("cadastro")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de cadastro: " + error);
    }
};

//solicitarEditarFormulario
jogoControlador.editarFormulario = function(req,res){
    jogo.findOne({
        raw: true,
        where: {
            id: req.params.id
        }
    }).then(
        function(game){
            res.render("editarForm",{
                idJogo: req.params.id,
                descJogo: game.descricao,
                criadorJogo: game.criador,
                anoJogo: game.ano,
                idadeJogo: game.idade
            })
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao acessar página de edição: " + error)
        }
    )
}

//montarRequisiçãoEditar
jogoControlador.montarReqEdicao = function (req, res) {
    axios.put("/" + req.params.id,
        qs.stringify({
            descricao: req.body.descricao,
            criador: req.body.criador,
            ano: req.body.ano,
            idade: req.body.idade,
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            proxy:{
                host: "localhost",
                port: 80
            }
        }
    ).then(function () {
            res.status(200).redirect("/")
        })
    .catch(function (err) {
        res.status(500).send("Erro ao editar o jogo: " + err);
    })
}

//montarRequisiçãoRemover
jogoControlador.montarReqDelete = function (req, res) {
    axios.delete('/' + req.params.id,{
        proxy:{
            host: "localhost",
            port: 80
        }
    }).then(function () {
            res.status(200).redirect("/")
        })
        .catch(function (err) {
            res.status(500).send("Erro ao apagar um jogo: " + err);
        })
}

module.exports = jogoControlador;