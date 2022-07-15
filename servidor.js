var express = require("express")
var handlebars = require("express-handlebars")
var rotas = require("./routes/rotas")
var session = require("express-session")
var flash = require("connect-flash")
var passport = require("passport")
require("./configs/security")(passport)

var servidor = express()
const PORTA = 80

servidor.use(session({
    secret: "provanode",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 1000} //10min
}))
servidor.use(passport.initialize())
servidor.use(passport.session())
servidor.use(flash())

//Midleware
servidor.use((req,res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})

servidor.engine("handlebars", handlebars.engine({defaultLayout:"main"}));
servidor.set("view engine","handlebars");

servidor.use(express.urlencoded({ extended: true }));
servidor.use(rotas)

servidor.listen(PORTA,function(){
    console.log("Servidor http rodando na porta " + PORTA + "...");
})