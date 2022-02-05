const url = 'http://127.0.0.1:5500/db.json';
const http = new XMLHttpRequest();

let wordSecret;

http.open("GET", url);
http.addEventListener("load", () => {
    const res = JSON.parse(http.responseText);
    const select = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const indice = select(0, res.palabras.length);
    console.log(res.palabras[indice]);
    createInput(res.palabras[indice]);
});
http.send();


const createInput = palabra => {
    wordSecret = palabra;
    const container = document.querySelector("#input-word");
    for (let i = 0; i < palabra.length; i++) {
        const div = document.createElement("div");
        div.classList.add("input-word");
        container.appendChild(div);
    }
}

window.addEventListener('keydown', (e) => {
    if (wordSecret.includes(e.key)) {
        setCorrect(e.key);
    }else{
        setErrors(e.key);
    }
});

const setCorrect = key => {
    const container = document.querySelectorAll('.input-word');
    console.log(container);
};

const setErrors = key => {
    const container = document.querySelector("#container-errors");
    const div = document.createElement("div");
    div.classList.add('input-word-error');
    div.innerHTML = key;
    container.appendChild(div);
};