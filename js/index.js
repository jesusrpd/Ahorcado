const url = 'http://127.0.0.1:5500/db.json';
const http = new XMLHttpRequest();

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
    const container = document.querySelector("#input-word");
    for (let i = 0; i < palabra.length; i++) {
        const div = document.createElement("div");
        div.classList.add("input-word");
        container.appendChild(div);
    }
}

window.addEventListener('keydown', (e) => {
    console.log(e.key);
});