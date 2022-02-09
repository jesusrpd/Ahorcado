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

//Verificación del input
window.addEventListener('keydown', (e) => {
    if (/^([0-9])*$/) {
        console.log('es un número');
    }else{
        if (wordSecret.includes(e.key)) {
            setCorrect(e.key);
        }else{
            setErrors(e.key);
        }
    }
});

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

//verificación de la respuesta correcta
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
        for (let i = 0; i < indices.length; i++) {
            if (divInputs[indices[i]].classList.contains('input-word-correct')) {
                continue;
            }else{
                showDivCorrect(key, indices[i]);
                break;
            }
        }
    }
    
    verifyRequest(divInputs);
};

//Verificar si la palabra se adivin completamente
const verifyRequest = inputs => {
    for(let i=0; i < inputs.length; i++){
        if (!inputs[i].classList.contains('input-word-correct')) {
            return false;
        }
    }

    return setModal(`<div class="modal modal-win">
        <h2>¡FELICIDADES, HAS GANADO!</h2>
        <div>
            <button id="btn-return" class="btn btn-orange">Volver a jugar</button>
            <button id="btn-exit" class="btn btn-blue">Salir</button>
        </div>
    </div>`);
}

//verificar que no se muestren los mismo errores en pantalla
const setErrors = key => {
    if (!arrayErrors.includes(key)) {
        arrayErrors.push(key);
        createErrorDiv(key);
        draw(arrayErrors.length);
        if (arrayErrors.length >= 7) {
            setModal(`<div class="modal modal-game-over">
                <h2>¡HAZ PERDIDO!</h2>
                <p>La palabra correcta: palabra</p>
                <div>
                    <button id="btn-return" class="btn btn-orange">Volver a jugar</button>
                    <button id="btn-exit" class="btn btn-blue">Salir</button>
                </div>
            </div>`);
        }
    }
};

//mostrar las letras correctas
const showDivCorrect = (key, i) => {
    const divInputs = document.querySelectorAll('.input-word');
    const divCorrect = divInputs[i];
    divCorrect.innerHTML = key;
    divCorrect.classList.add('input-word-correct');
};

//mostrar los errores en pantalla
const createErrorDiv = key => {
    const container = document.querySelector("#container-errors");
    const div = document.createElement('div');
    div.innerHTML = key;
    div.classList.add('input-word-error');
    container.appendChild(div);
};

//Mostrar modal
const setModal = modal => {
    const overlay = document.querySelector('.overlay');
    const modalWarning = document.querySelector('.modal-warning');
    const container = document.querySelector('#section');
    overlay.innerHTML = `${modal}`;
    overlay.classList.remove('overlay-show');
    container.removeChild(modalWarning);
    btnModal();
};

//Manejo de los botones del mosal game over
const btnModal = () => {
    //Botones del menu game over
    const btnSalir = document.querySelector('#btn-exit');
    const btnReturn = document.querySelector('#btn-return');

    btnSalir.addEventListener('click', () => window.location.href = '/index.html');

    btnReturn.addEventListener('click', () => window.location.reload());
};