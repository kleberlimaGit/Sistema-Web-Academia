const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for(item of menuItems){
    // a função includes retorna true ou false, fazendo um mapeamento na string para 
    //saber se existe um caracter ou uma string na string que deseja fazer o mapeamento
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}




