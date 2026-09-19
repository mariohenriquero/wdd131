// ================================
// ANO ATUAL
// ================================

const spanAno = document.getElementById("anoatual");

spanAno.textContent = new Date().getFullYear();


// ================================
// ÚLTIMA MODIFICAÇÃO
// ================================

const ultimaModificacao = document.getElementById("ultimaModificacao");

ultimaModificacao.textContent =
    `Última modificação: ${document.lastModified}`;


// ================================
// CLIMA
// ================================

const temperatura = 24;
const velocidadeVento = 15;


// ================================
// FUNÇÃO DE SENSAÇÃO TÉRMICA
// ================================

function calcularSensacaoTermica(temperatura, velocidadeVento) {
    return 13.12 +
        (0.6215 * temperatura) -
        (11.37 * Math.pow(velocidadeVento, 0.16)) +
        (0.3965 * temperatura * Math.pow(velocidadeVento, 0.16));
}


// ================================
// VERIFICAÇÃO
// ================================

const elementoSensacao = document.getElementById("sensacao");

if (temperatura <= 10 && velocidadeVento > 4.8) {

    const sensacao = calcularSensacaoTermica(
        temperatura,
        velocidadeVento
    );

    elementoSensacao.textContent = `${sensacao.toFixed(1)} °C`;

} else {

    elementoSensacao.textContent = "N/A";
}