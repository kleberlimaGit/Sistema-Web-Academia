//Exportar funções
const fs = require('fs')
const data = require('../data.json')
const moment = require('moment')
const { age, date } = require('../utils')

moment.locale('pt-BR')
// show
exports.show = (req, res)=>{
    // req.params.id = /:id mostra na pagina de acordo com o id

    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if(!foundInstructor){
        return res.send("Instructor not found")
    }


    const instructor = {
        ...foundInstructor, // pega tudo dentro de foundInstructor
        age: age(foundInstructor.birth),
        speciality:foundInstructor.speciality.split(","),
       created_at: new moment(foundInstructor.created_at).format('L')
    }

    return res.render("instructors/show", {instructor})
}


// create
exports.post = (req,res)=>{
 
    const keys = Object.keys(req.body)
    for(const key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill all fileds") // **** criar a pagina renderizada
        }
    }

    let { avatar_url, birth, name , gender, speciality } = req.body
    // criação da data atual
    birth = Date.parse(birth)
    const created_at = moment()
    let id = 0
    if(data.instructors.length == 0){
        id = 1
    }else{
        id = Number(data.instructors[data.instructors.length - 1].id + 1)
    }
    


    // adiciona novos objetos no Array
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        speciality,
        created_at

    })
    
    fs.writeFile('data.json', JSON.stringify(data, null, 2),(err)=>{
        if(err){
            return res.send("Write file error")
        }
        return res.redirect(`/instructors/${id}`)
    })

    //return res.send(req.body)
}

exports.create = (req,res)=>{
    return res.render('instructors/create')
}

// edit
exports.edit = (req,res)=>{
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if(!foundInstructor){
        return res.send("Instructor not found")
    }
    const instructor ={
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    res.render('instructors/edit', {instructor} )

}


//put atualiza
exports.put = (req,res)=>{
    const { id } = req.body
    let index = 0

    // a funcao find tambem recebe um parametro index aonde mostra a posiçao a qual o objeto procurado estar
    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if(instructor.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundInstructor){
        return res.send("Instructor not found")
    }
    
    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id:Number(req.body.id)
    }

    data.instructors[index] = instructor
    fs.writeFile("data.json",JSON.stringify(data, null, 2), (err)=>{
        if(err){
            return res.send("Write error")
        }
        return res.redirect(`/instructors/${id}`)
    })
    
}

//delete
exports.delete = (req,res)=>{
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor){
        
        return instructor.id != id
    })

    data.instructors = filteredInstructors
    fs.writeFile('data.json', JSON.stringify(data, null, 2),function(err){
        if(err){
            return res.send('Write Error')
        }
        return res.redirect('/instructors')
    })
}
// pagina inicial
exports.index = (req,res)=>{
    return res.render('instructors/index', { instructors: data.instructors })
}