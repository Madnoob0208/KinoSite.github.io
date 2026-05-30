fetch("header.html")
    .then(response => response.text())
    .then(data =>{
        document.querySelector(".header-placeholder").outerHTML = data
    })
fetch("subscribe.html")
    .then(response => response.text())
    .then(data =>{
        document.querySelector(".subscribe-placeholder").outerHTML = data
    })
    fetch("footer.html")
    .then(response => response.text())
    .then(data =>{
        document.querySelector(".footer-placeholder").outerHTML = data
    })

window.addEventListener('load', function(){
    const header__menuBurger = document.querySelector(".header__menu-burger")
    const header__menuList = document.querySelector(".header__menu-list")
    const inputName = document.querySelector("#form-inputName")
    const inputEmail = document.querySelector("#form-inputEmail")
    const formBtn = document.querySelector(".subscribe__form-btn")
    header__menuBurger.addEventListener("click", function(){
        header__menuList.classList.toggle("header__menu--active")
        header__menuList.classList.toggle("header__menu-list")
    })
    formBtn.addEventListener("click", function(event){
    event.preventDefault()
    if (!inputName.value){
        inputName.classList.add("required")
    }
    else if (!inputEmail.value){
        inputName.classList.remove("required")
        inputEmail.classList.add("required")
    }
    else{
        inputEmail.classList.remove("required")
        console.log(`
            Вы подписались!
            Ваше имя: ${inputName.value}
            Ваша почта: ${inputEmail.value}
        `)
    }
})
})