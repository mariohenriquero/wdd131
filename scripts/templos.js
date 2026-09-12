const menuButton = document.getElementById("menu-button");
const mainNav = document.getElementById("main-nav");

menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");

    const menuAberto = mainNav.classList.contains("open");

    menuButton.setAttribute("aria-expanded", menuAberto);

    if (menuAberto) {
        menuButton.setAttribute("aria-label", "Fechar menu");
        menuButton.textContent = "✕";
    } else {
        menuButton.setAttribute("aria-label", "Abrir menu");
        menuButton.textContent = "☰";
    }
});


const spanAno = document.getElementById("anoatual");

if (spanAno) {
    spanAno.textContent = new Date().getFullYear();
}


const paragrafoModificacao = document.getElementById("ultimaModificacao");

if (paragrafoModificacao) {
    paragrafoModificacao.textContent =
        `Última modificação: ${document.lastModified}`;
}