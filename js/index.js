//Peticion inicial del juego
const url = 'http://127.0.0.1:5500/db.json';
const http = new XMLHttpRequest();

//Variables iniciales del juego
let wordSecret;
let arrayErrors = [];

//se inicializa el juego y la palabra a adivinar dentro del ahorcado
http.open("GET", url);
http.addEventListener("load", () => {
    const res = JSON.parse(http.responseText);
    const select = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const indice = select(0, res.palabras.length);
    console.log(res.palabras[indice]);
    createInput(res.palabras[indice]);
});
http.send();

//Creación de inputs dependiendo de la cantidad de letras de la palabra
const createInput = palabra => {
    wordSecret = palabra;
    const container = document.querySelector("#input-word");
    for (let i = 0; i < palabra.length; i++) {
        const div = document.createElement("div");
        div.classList.add("input-word");
        container.appendChild(div);
    }
}

//Verificación del input
window.addEventListener('keydown', (e) => {
    if (wordSecret.includes(e.key)) {
        setCorrect(e.key);
    }else{
        setErrors(e.key);
    }
});

const setCorrect = key => {
    const divInputs = document.querySelectorAll('.input-word');
    let idx = wordSecret.indexOf(key);
    let indices = [];
    while(idx != -1){
        indices.push(idx);
        idx = wordSecret.indexOf(key, idx + 1);
    }
    if (indices.length === 1) {
        showDivCorrect(key, indices[0]);
    }else{
        console.log(indices);
        for (let i = 0; i < indices.length; i++) {
            if (divInputs[indices[i]].classList.contains('input-word-correct')) {
                continue;
            }else{
                showDivCorrect(key, indices[i]);
                break;
            }
        }
    }
};

const setErrors = key => {
    if (!arrayErrors.includes(key)) {
        arrayErrors.push(key);
        createErrorDiv(key);
    }
};

const showDivCorrect = (key, i) => {
    const divInputs = document.querySelectorAll('.input-word');
    const divCorrect = divInputs[i];
    divCorrect.innerHTML = key;
    divCorrect.classList.add('input-word-correct');
};

const createErrorDiv = key => {
    const container = document.querySelector("#container-errors");
    const div = document.createElement('div');
    div.innerHTML = key;
    div.classList.add('input-word-error');
    container.appendChild(div);
};