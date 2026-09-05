// 1. Preenche o ano atual automaticamente no rodapé
const spanAno = document.getElementById("anoatual");
if (spanAno) {
    spanAno.textContent = new Date().getFullYear();
}

// 2. Preenche a data da última modificação do arquivo no rodapé
const paragrafoModificacao = document.getElementById("ultimaModificacao");
if (paragrafoModificacao) {
    paragrafoModificacao.textContent = `Última modificação: ${document.lastModified}`;

}
