// --- Menu hambúrguer ---
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

// --- Referência ao container onde os cartões vão aparecer ---
const templeGrid = document.getElementById("temple-grid");

// --- Formata "2005-08-07" para "7 de agosto de 2005" ---
function formatarData(dataISO) {
    const data = new Date(dataISO + "T00:00:00");
    return data.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// --- Cria um cartão de templo (figure) ---
function criarCartao(templo) {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = templo.urlDaImagem;
    img.alt = templo.nomeDoTemplo;
    img.loading = "lazy"; // carregamento lento nativo

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = `
        <h3>${templo.nomeDoTemplo}</h3>
        <p><strong>Localização:</strong> ${templo.localizacao}</p>
        <p><strong>Consagrado em:</strong> ${formatarData(templo.consagracao)}</p>
        <p><strong>Área:</strong> ${templo.area.toLocaleString("pt-BR")} pés²</p>
    `;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    return figure;
}

// --- Limpa o grid e desenha uma lista de templos ---
function renderizarTemplos(lista) {
    templeGrid.innerHTML = "";
    lista.forEach(templo => templeGrid.appendChild(criarCartao(templo)));
}

// --- Aplica o filtro escolhido sobre o array "templos" ---
function filtrarTemplos(tipo) {
    switch (tipo) {
        case "antigo":
            return templos.filter(t => new Date(t.consagracao).getFullYear() < 1900);
        case "novo":
            return templos.filter(t => new Date(t.consagracao).getFullYear() > 2000);
        case "grande":
            return templos.filter(t => t.area > 90000);
        case "pequeno":
            return templos.filter(t => t.area < 10000);
        default:
            return templos; // "todos" / Página Inicial
    }
}

// --- Escuta cliques nos links do menu de navegação ---
const linksNav = document.querySelectorAll("#main-nav a");

linksNav.forEach(link => {
    link.addEventListener("click", (evento) => {
        evento.preventDefault();

        const tipo = link.dataset.filtro;
        renderizarTemplos(filtrarTemplos(tipo));

        linksNav.forEach(l => l.classList.remove("ativo"));
        link.classList.add("ativo");
    });
});

// --- Renderização inicial: mostra todos os templos ao carregar a página ---
renderizarTemplos(templos);