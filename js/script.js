let data = []
const films__cards = document.querySelector(".films__cards")
const n1 = document.querySelector(".number-1")
const n2 = document.querySelector(".number-2")
const n3 = document.querySelector(".number-3")
const n4 = document.querySelector(".number-4")
const n5 = document.querySelector(".number-5")
const numbers = document.querySelectorAll(".films__pagination-number")

n1.addEventListener('click', function(){
    if (!this.classList.contains("number--active")){
        films__cards.innerHTML = ""
        numbers.forEach(elem => {
            elem.classList.remove("number--active")
        })
        this.classList.add("number--active")
        console.log("Выводим")
        for (let i = 0; i < 20; i++){
            draw_card(data[i])
        }
    }
})
n2.addEventListener('click', function(){
    if (!this.classList.contains("number--active")){
        films__cards.innerHTML = ""
        numbers.forEach(elem => {
            elem.classList.remove("number--active")
        })
        this.classList.add("number--active")
        for (let i = 20; i < 40; i++){
            draw_card(data[i])
        }
    }
})
n3.addEventListener('click', function(){
    if (!this.classList.contains("number--active")){
        films__cards.innerHTML = ""
        numbers.forEach(elem => {
            elem.classList.remove("number--active")
        })
        this.classList.add("number--active")
        for (let i = 40; i < 60; i++){
            draw_card(data[i])
        }
    }
})
n4.addEventListener('click', function(){
    if (!this.classList.contains("number--active")){
        films__cards.innerHTML = ""
        numbers.forEach(elem => {
            elem.classList.remove("number--active")
        })
        this.classList.add("number--active")
        for (let i = 60; i < 80; i++){
            draw_card(data[i])
        }
    }
})
n5.addEventListener('click', function(){
    if (!this.classList.contains("number--active")){
        films__cards.innerHTML = ""
        numbers.forEach(elem => {
            elem.classList.remove("number--active")
        })
        this.classList.add("number--active")
        for (let i = 80; i < 100; i++){
            draw_card(data[i])
        }
    }
})
function draw_card(card) {
    films__cards.innerHTML += `
            <div class="films__card">
                <img class="films__card-img" src="http://185.72.144.247:7757${card.poster_URL}" alt="card-img">
                <h3 class="films__card-title">${card.title}</h3>
                <div class="films__card-wrapper">
                    <p class="films__card-desc">${card.year} г.</p>
                    <p class="films__card-desc">Рейтинг: ${card.rating}</p>
                </div>
                <a class="films__card-link" href="movie.html?id=${card.id}">Перейти</a>
        </div>
    `
}
async function get_films() {
    try{
        let res = await fetch("http://185.72.144.247:7757/films")
        if (!res.ok){
            throw new Error("Error" + res.status)
        }
        data = await res.json()
        for (let i = 0; i < 20; i++){
            draw_card(data[i])
        }
    }
    catch(err){
        console.error(err)
    }
}
window.addEventListener("load", function() {
    get_films()
})