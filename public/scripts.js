const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for(item of menuItems){
    // a função includes retorna true ou false, fazendo um mapeamento na string para 
    //saber se existe um caracter ou uma string na string que deseja fazer o mapeamento
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}






const formDelete = document.querySelector("#delete")
const modal = document.querySelector('.modal')
const botao = document.querySelector("#modal-content-option a")

formDelete.addEventListener('click',()=>{
    modal.classList.add('ativo')
    botao.addEventListener('click',()=>{
        modal.classList.remove('ativo')
    })

})


//formDelete.addEventListener("submit",function(event){
    //const confirmation = confirm("Deseja Deletar?")
    //if(!confirmation){
    //event.preventDefault()
    //}
//})

//const botao = document.querySelectorAll("#modal-content-option a")
//for(const b of botao){
   // b.addEventListener("click",()=>{
      //  console.log(b.textContent)
   // })
//}



