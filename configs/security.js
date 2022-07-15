var localStrategy = require("passport-local").Strategy
var bcrypt = require("bcryptjs")

//modelo do usuário
var Usuario = require('../models/usuario');

module.exports = function(passport){

    passport.serializeUser((user,done)=>{
        done(null, user.id)
    })

    passport.deserializeUser( async (id, done)=>{
        try{
            const user = await Usuario.findByPk(id)
            done(null, user)
        }catch(erro){
            done(erro, user)
        }
    })
    
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    },
    async (email,senha,done) => {
        try{
            const user = await Usuario.findOne({
                raw: true,
                where: {
                    email: email
                }})
                
            if(!user){
                return done(null,false,{message:"Esta conta não existe"})
            }
            
            const eValido = await bcrypt.compare(senha, user.senha)

            if(!eValido) return done(null, false, {message: "Senha incorreta!"})
            
            return done(null, user)
        }catch(erro){
            done(erro, false)
        }
    }))
}