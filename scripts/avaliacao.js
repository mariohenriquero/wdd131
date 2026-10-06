const CHAVE = "contadorAvaliacoes";

let total = Number(localStorage.getItem(CHAVE)) || 0;
total += 1;
localStorage.setItem(CHAVE, total);

document.querySelector("#contador").textContent = total;
document.querySelector("#texto-contador").textContent =
    total === 1 ? "avaliação" : "avaliações";

document.querySelector("#ano-atual").textContent = new Date().getFullYear();
document.querySelector("#ultima-modificacao").textContent = document.lastModified;