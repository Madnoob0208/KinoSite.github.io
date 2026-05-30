const topCards = document.querySelector(".top__cards")
let data = []
const pagination = document.querySelector(".films__pagination")
const paginationNumbers = document.querySelectorAll(".films__pagination-number")
let page = 1
const inputYear = document.querySelector(".input-year")
const inputTitle = document.querySelector(".input-title")
inputTitle.addEventListener('change', function(){
    const title = inputTitle.value.toLowerCase()
    const filteredData = data.filter(film => film.title.toLowerCase().includes(title))
    if (!title){
        topCards.innerHTML = ""
        if (page == 1){
            draw_page(0, 10)
        }
        else if (page == 2){
            draw_page(10, 20)
        }
        else if (page == 3){
            draw_page(20, 25)
        }
        pagination.style.display = "flex"
    }
    else if (filteredData.length == 0){
        topCards.innerHTML = "<h2 class = 'no-films'>Фильмы не найдены</h2>"
        pagination.style.display = "none"
    }
    else{
        topCards.innerHTML = ""
        filteredData.forEach(film =>{
            draw_card(film, data.indexOf(film) + 1)
        })
        pagination.style.display = "none"
    }
})
inputYear.addEventListener('change', function(){
    const year = inputYear.value
    if ((year < 1800 || year > 2026) && year){
        alert("Фильмов такого года не существует!")
    }
    const filteredData = data.filter(film => film.year == year)
    if (!year){
        topCards.innerHTML = ""
        if (page == 1){
            draw_page(0, 10)
        }
        else if (page == 2){
            draw_page(10, 20)
        }
        else if (page == 3){
            draw_page(20, 25)
        }
        pagination.style.display = "flex"
    }
    else if (filteredData.length == 0){
        topCards.innerHTML = "<h2 class = 'no-films'>Фильмы не найдены</h2>"
        pagination.style.display = "none"
    }
    else{
        topCards.innerHTML = ""
        filteredData.forEach(film =>{
            draw_card(film, data.indexOf(film) + 1)
        })
        pagination.style.display = "none"
    }
})
function draw_page(start, end){
    topCards.innerHTML = ""
    for (let i = start; i < end; i++){
        draw_card(data[i], i + 1)
    }
}
pagination.addEventListener('click', function(event){
    const object = event.target
    if (object.classList.contains("films__pagination-number") && !object.classList.contains("number--active")){
        let flag = 0
        if (object.textContent == ">" && page != 6){
            flag = page + 1
        }
        if (object.textContent == "<" && page != 1){
            flag = page - 1
        }
        if (object.textContent == "1" || flag == 1){
            topCards.innerHTML = ""
            draw_page(0, 10)
            page = 1
        }
        else if (object.textContent == "2" || flag == 2){
            topCards.innerHTML = ""
            draw_page(10, 20)
            page = 2
        }
        else if (object.textContent == "3" || flag == 3){
            topCards.innerHTML = ""
            draw_page(20, 25)
            page = 3
        }
        paginationNumbers.forEach(elem => {
            elem.classList.remove("number--active")
            if (elem.textContent == page){
                elem.classList.add("number--active")
            }
        })
    }
})
function draw_card(film, place){
    let className = ""
    if (place >= 1 && place <= 3){
        className = "grandPlace"
    }
    else if (place >= 4 && place <= 10){
        className = "topPlace"
    }
    else if (place >= 11 && place <= 20){
        className = "middlePlace"
    }
    else{
        className = "bottomPlace"
    }
    topCards.innerHTML += `
    <div class="top__card">
        <h2 class="top__card-${className}">${place}</h2>
        <img class="top__card-img" src="http://185.72.144.247:7757${film.poster_URL}" alt="card-img">
        <div class="top__card-info">
            <h3 class="top__card-title"><a class="top__card-title-link" href = 'movie.html?id=${film.id}'>${film.title}<a></h3>
            <p class="top__card-desc">${film.desc}</p>
            <p class="top__card-rating">Рейтинг: ${film.rating}</p>
        </div>
        <div class="top__card-data">
            <div class="top__card-data-item">
                <h4 class="top__card-data-title">Год выпуска</h4>
                <p class="top__card-data-text">${film.year}</p>
            </div>
        </div>
        <div class="top__card-data">
            <div class="top__card-data-item">
                <h4 class="top__card-data-title">Возраст</h4>
                <p class="top__card-data-text">${film.age_rating}+</p>
            </div>
        </div>
        <div class="top__card-data">
            <div class="top__card-data-item">
                <h4 class="top__card-data-title">Длительность</h4>
                <p class="top__card-data-text">${film.duration} мин</p>
            </div>
        </div>
    </div>
    `
}
async function get_top() {
    try{
        let res = await fetch("http://185.72.144.247:7757/top25")
        if (!res.ok){
            throw new Error("Error" + res.status)
        }
        data = await res.json()
        draw_page(0,10)
    }
    catch(err){
        console.error(err)
    }
}
window.addEventListener('load', function(){
    get_top()
})