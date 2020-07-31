const express = require("express")
const nunjucks = require("nunjucks")
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()


server.use(express.urlencoded({
   extended:true 
}))

server.use(express.static('public'))
// é necessario que sobrescreva o metodo antes de enviar para as rotas por iso o methodOverride deve vim primeiro que a chamada da rota
server.use(methodOverride('_method'))
server.use(routes)

// faz com que, a template engine nao exija a extençao .html
server.set("view engine", "html")



nunjucks.configure("views",{
    express: server,
    autoescape:false,
    noCache: true

})

server.listen(3000, ()=>{
    console.log('Serving is running')
})