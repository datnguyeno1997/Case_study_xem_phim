let prev_btn = document.getElementById('prev');
let next_btn = document.getElementById('next');
let position = 0;
next_btn.addEventListener('click', function () {
    let Featureds = document.querySelector('.Featureds');
    if (position < -280) {
        position = 140;
        renderCardSlider(sesson);
    }
    position -= 140;
    Featureds.style.transform = "";
    Featureds.style.transform += `translate3d(${position}px, 0px, 0px)`;
})
prev_btn.addEventListener('click', function () {
    let Featureds = document.querySelector('.Featureds');
    if (position > -140) {
        position = -560;
        renderCardSlider(sesson);
    }
    position += 140;
    Featureds.style.transform = "";
    Featureds.style.transform += `translate3d(${position}px, 0px, 0px)`;
})

let sesson;
let json_url = "sesson.json";
fetch(json_url).then(Response => Response.json()).then((data) => {
    sesson = data;
    data.forEach(element => {
        let { photo, name, category, date, rate, youtube } = element;
        let card = document.createElement('a');
        card.classList.add('card');
        card.href = '#';

        card.onclick = function () {
            localStorage.setItem("photo", element.photo);
            localStorage.setItem("title", element.name);
            localStorage.setItem("category", element.category);
            localStorage.setItem("date", element.date);
            localStorage.setItem("rate", element.rate);
            localStorage.setItem("youtube", youtube);
            let str = renderYoutube(element.youtube);
            document.getElementById('youtube').innerHTML = str;
        }
        card.innerHTML = `
                <img src="${photo}" alt="">
                    <h3>${name}</h3>
                    <p>${category},${date}</p><i class="bi bi-star-fill"></i>${rate}</p>
            `;
        search.appendChild(card);

    })
    renderCardSlider(data);
})

let content = document.querySelector('.content')[0];
let search = document.getElementsByClassName('search1')[0];
let search_in = document.getElementById('search_in');
search_in.addEventListener("keyup", () => {
    let find = search_in.value.toUpperCase();
    let key_find = search.getElementsByTagName("a");

    for (let i = 0; i < key_find.length; i++) {
        let found = key_find[i];
        let textValue = found.textContent || found.innerHTML;
        if (textValue.toUpperCase().indexOf(find) > -1) {
            found.style.display = "flex";
        } else {
            found.style.display = "none";
        }
        if (find == '') {
            found.style.display = "none";
        }
    }
})

function cardOnclick(photo) {
    for (const element of sesson) {
        if (element.photo == photo) {
            localStorage.setItem("photo", element.photo);
            localStorage.setItem("title", element.name);
            localStorage.setItem("category", element.category);
            localStorage.setItem("date", element.date);
            localStorage.setItem("rate", element.rate);
            localStorage.setItem("youtube", element.youtube);
            let str = renderYoutube(element.youtube);
            document.getElementById('youtube').innerHTML = str;
            return;
        }
    }
}

function renderYoutube(youtubeId) {
    return `
        <iframe allow="fullscreen" width="600" height="350" frameborder="0" scrolling="no"
            src="https://www.youtube.com/embed/${youtubeId}">
        </iframe>
    `;
}

function renderCardSlider(sesson) {
    let Featureds = document.querySelector('.Featureds');
    for (let poster of sesson) {
        Featureds.innerHTML += `
                <div class="featured" onclick='cardOnclick("${poster.photo}")' >
                    <img src="${poster.photo}" class="film" alt="">
                </div>
            `
    }
}
