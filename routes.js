const express = require('express')
const routes = express.Router()
const instructors = require('./controllers/instructors')
const members = require('./controllers/members')


routes.get('/', (req,res)=>{
    return res.redirect('/instructors')
})
// == Instructors
routes.get('/instructors', instructors.index)
routes.post("/instructors", instructors.post)
routes.put("/instructors",instructors.put)
routes.get('/instructors/create', instructors.create)
routes.delete('/instructors', instructors.delete)
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)


// == Members ==


routes.get('/members', members.index)
routes.post("/members", members.post)
routes.put("/members",members.put)
routes.get('/members/create', members.create)
routes.delete('/members', members.delete)
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)





module.exports = routes