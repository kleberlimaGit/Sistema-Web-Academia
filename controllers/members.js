//Exportar funções
const fs = require('fs')
const data = require('../data.json')
const moment = require('moment')
const { date, imc, peso } = require('../utils')

moment.locale('pt-BR')

exports.index = (req,res)=>{
    return res.render('members/index', { members: data.members })
}

exports.create = (req,res)=>{
    return res.render('members/create')
}

exports.post = (req,res)=>{
 
    const keys = Object.keys(req.body)
    for(const key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill all fileds") // **** criar a pagina renderizada
        }
    }

    let { avatar_url, birth, name , gender, email, blood, weight, height } = req.body
    // criação da data atual
    birth = Date.parse(birth)
    let id = 0
    if(data.members.length == 0){
        id = 1
    }else{
        id = Number(data.members[data.members.length - 1].id + 1)
    }


    


    // adiciona novos objetos no Array
    data.members.push({
        id,
        avatar_url,
        name,
        email,
        birth,
        gender,
        blood,
        weight,
        height,
        imc: imc(weight, height),
        peso: peso(imc(weight, height))

    })
    
    fs.writeFile('data.json', JSON.stringify(data, null, 2),(err)=>{
        if(err){
            return res.send("Write file error")
        }
        return res.redirect(`/members/${id}`)
    })

    //return res.send(req.body)
}


exports.show = (req, res)=>{
    // req.params.id = /:id mostra na pagina de acordo com o id

    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if(!foundMember){
        return res.send("Member not found")
    }


    const member = {
        ...foundMember, // pega tudo dentro de foundMember
        birth:moment(foundMember.birth).format('DD/MM'),
       //created_at: new moment(foundMember.created_at).format('L')
    }

    return res.render("members/show", {member})
}

exports.edit = (req,res)=>{
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if(!foundMember){
        return res.send("Member not found")
    }
    const member ={
        ...foundMember,
        birth: date(foundMember.birth)
    }

    res.render('members/edit', {member} )

}

exports.put = (req,res)=>{
    const { id } = req.body
    let index = 0

    // a funcao find tambem recebe um parametro index aonde mostra a posiçao a qual o objeto procurado estar
    const foundMember = data.members.find(function(member, foundIndex){
        if(member.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundMember){
        return res.send("Member not found")
    }
    
    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id:Number(req.body.id)
    }

    data.members[index] = member
    fs.writeFile("data.json",JSON.stringify(data, null, 2), (err)=>{
        if(err){
            return res.send("Write error")
        }
        return res.redirect(`/members/${id}`)
    })
    
}

exports.delete = (req,res)=>{
    const { id } = req.body

    const filteredMembers = data.members.filter(function(member){
        
        return member.id != id
    })

    data.members = filteredMembers
    fs.writeFile('data.json', JSON.stringify(data, null, 2),function(err){
        if(err){
            return res.send('Write Error')
        }
        return res.redirect('/members')
    })
}



