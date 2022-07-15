const express = require("express");
const passport = require("passport");
const controlador = require("../controllers/controlador");
const controladorUsuarios = require("../controllers/controladorUsuarios");
const {autenticado}= require("../helpers/acesso")

const rotas = express.Router();

rotas.get("/", controlador.buscarJogoBanco);
rotas.post("/", autenticado, controlador.inserirJogoBanco);
rotas.put("/:id", controlador.atualizarJogoBanco);
rotas.delete("/:id", controlador.removerJogoBanco);

rotas.get("/cadastrar", autenticado, controlador.cadastro);
rotas.get("/editar/:id", autenticado, controlador.editarFormulario) //retorna a pagina de edição
rotas.post("/ediReq/:id", autenticado, controlador.montarReqEdicao) //monta requisição de edição
rotas.get("/remover/:id", autenticado, controlador.montarReqDelete)  //monta requisição de remoção


//autenticação
rotas.get("/login", controladorUsuarios.mostrarFormLogin);
rotas.post("/cadastrar/usuario", controladorUsuarios.inserirUsuarioBanco);
rotas.get("/cadastro/usuario", controladorUsuarios.cadastro);

rotas.post("/logar", (req,res,next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "login",
        failureFlash: true
    })(req,res,next)
})

rotas.get("/logout", (req,res) => {
    req.logout(req.user, erro => {
        if(erro) return next(erro);
        req.flash('success_msg', "Você saiu!")
        res.redirect("/");
    })
})

module.exports = rotas;