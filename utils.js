module.exports = {
    age: function(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
    
        today.getDate()// retorna o dia do mes
        birthDate.getDate()
    
        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
            age = age - 1
        }
    
        return age
    },
    date: function(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()

        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        const day = `0${date.getUTCDate()}`.slice(-2)

        return (`${year}-${month}-${day}`)

        

    },
    imc: function(weight, height){
        return weight/((height/100)*height/100)

    },
    peso: function(imc){
        if(imc<18.5){
            return 'Underweight'
        }
        if(imc<=24.9){
            return 'Normal Weight'
        }
        if(imc<=29.9){
            return 'Overweight'
        }
        if(imc<= 39.9){
            return 'class II obesity'
        }
            
        return 'morbid obesity'
        
            
    }
}
