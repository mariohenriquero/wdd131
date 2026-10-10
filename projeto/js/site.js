// ===== Dados do site =====
const historias = [
    {
        id: 1,
        titulo: "A Copa de 1970 e o tricampeonato",
        clube: "Seleção Brasileira",
        categoria: "Copa do Mundo",
        ano: 1970,
        resumo: "A seleção do México 70 conquistou o tricampeonato mundial e ficou conhecida como uma das maiores equipes da história.",
        imagem: "imagens/historia-copa-1970.webp",
        alt: "Camisa da seleção brasileira de futebol"
    },
    {
        id: 2,
        titulo: "O Palmeiras e a Copa Rio de 1951",
        clube: "Palmeiras",
        categoria: "Clubes",
        ano: 1951,
        resumo: "O Palmeiras venceu a Copa Rio de 1951, torneio que reuniu grandes clubes da Europa e da América do Sul.",
        imagem: "imagens/historia-palmeiras-1951.webp",
        alt: "Escudo do Palmeiras"
    },
    {
        id: 3,
        titulo: "O Maracanazo de 1950",
        clube: "Seleção Brasileira",
        categoria: "Copa do Mundo",
        ano: 1950,
        resumo: "A derrota para o Uruguai na final marcou o Maracanã e a memória do futebol brasileiro.",
        imagem: "imagens/historia-maracanazo-1950.webp",
        alt: "Estádio do Maracanã, no Rio de Janeiro"
    },
    {
        id: 4,
        titulo: "Pelé, aos 17 anos, campeão do mundo",
        clube: "Seleção Brasileira",
        categoria: "Copa do Mundo",
        ano: 1958,
        resumo: "Aos 17 anos, Pelé marcou dois gols na final contra a Suécia, na vitória por 5 a 2, e ajudou o Brasil a conquistar o primeiro título mundial.",
        imagem: "imagens/historia-pele-1958.webp",
        alt: "Camisa 10 da seleção brasileira"
    },
    {
        id: 5,
        titulo: "O Flamengo campeão do mundo em 1981",
        clube: "Flamengo",
        categoria: "Clubes",
        ano: 1981,
        resumo: "Em Tóquio, o Flamengo venceu o Liverpool por 3 a 0 e conquistou o Mundial de Clubes.",
        imagem: "imagens/historia-flamengo-1981.webp",
        alt: "Escudo do Flamengo"
    },
    {
        id: 6,
        titulo: "A Democracia Corinthiana",
        clube: "Corinthians",
        categoria: "Bastidores",
        ano: 1982,
        resumo: "No início dos anos 1980, jogadores e comissão técnica passaram a decidir juntos, por votação, assuntos do dia a dia do clube.",
        imagem: "imagens/historia-democracia-corinthiana.webp",
        alt: "Escudo do Corinthians"
    }
];

const curiosidades = [
    {
        categoria: "Jogadores",
        texto: "Pelé é o único jogador que conquistou três Copas do Mundo: 1958, 1962 e 1970.",
        imagem: "imagens/historia-pele-1958.webp",
        alt: "Camisa 10 da seleção brasileira"
    },
    {
        categoria: "Seleção",
        texto: "O Brasil é a única seleção que disputou todas as edições da Copa do Mundo e tem cinco títulos mundiais.",
        imagem: "imagens/historia-copa-1970.webp",
        alt: "Camisa da seleção brasileira de futebol"
    },
    {
        categoria: "Estádios",
        texto: "O Maracanã foi inaugurado em 1950, para a Copa do Mundo disputada no Brasil.",
        imagem: "imagens/historia-maracanazo-1950.webp",
        alt: "Estádio do Maracanã, no Rio de Janeiro"
    },
    {
        categoria: "Jogadores",
        texto: "Marta foi eleita seis vezes a melhor jogadora do mundo pela FIFA.",
        imagem: "imagens/curiosidade-marta.webp",
        alt: "Camisa 10 da seleção brasileira feminina"
    }
];

const CHAVE_FAVORITOS = "futebolcontexto-favoritos";
const CHAVE_SUGESTOES = "futebolcontexto-sugestoes";
let categoriaAtual = "Todas";
let indiceCuriosidadeAtual = -1;

// ===== localStorage: favoritos =====
function carregarFavoritos() {
    try {
        const salvos = localStorage.getItem(CHAVE_FAVORITOS);
        return salvos ? JSON.parse(salvos) : [];
    } catch (erro) {
        return [];
    }
}

function salvarFavoritos(favoritos) {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
}

function alternarFavorito(id) {
    const favoritos = carregarFavoritos();
    const atualizados = favoritos.includes(id)
        ? favoritos.filter((item) => item !== id)
        : [...favoritos, id];

    salvarFavoritos(atualizados);
}

// ===== Montagem dos cartões =====
function criarCartao(historia, favoritos) {
    let botaoFavorito = "";

    if (favoritos) {
        const favorita = favoritos.includes(historia.id);

        botaoFavorito = `
            <button type="button" class="botao-favorito" data-id="${historia.id}" aria-pressed="${favorita}">
                ${favorita ? "★ Remover dos favoritos" : "☆ Favoritar"}
            </button>
        `;
    }

    return `
        <article class="cartao">
            <img src="${historia.imagem}" alt="${historia.alt}" width="800" height="533" loading="lazy">
            <h3>${historia.titulo}</h3>
            <p>${historia.clube} • ${historia.ano}</p>
            <p>${historia.resumo}</p>
            ${botaoFavorito}
        </article>
    `;
}

// ===== Rodapé =====
function mostrarAnoAtual() {
    const campoAno = document.querySelector("#ano-atual");

    if (campoAno) {
        campoAno.textContent = new Date().getFullYear();
    }
}

// ===== Busca da página inicial =====
function buscarHistorias(termo) {
    const termoNormalizado = termo.trim().toLowerCase();

    return historias.filter((historia) => {
        return `${historia.titulo} ${historia.clube} ${historia.categoria}`
            .toLowerCase()
            .includes(termoNormalizado);
    });
}

function mostrarResultados(lista) {
    const areaResultado = document.querySelector("#resultado-busca");

    if (lista.length === 0) {
        areaResultado.innerHTML = `<p>Nenhuma história encontrada. Tente outro termo.</p>`;
        return;
    }

    areaResultado.innerHTML = lista.map((historia) => criarCartao(historia)).join("");
}

function configurarBusca() {
    const formularioBusca = document.querySelector("#form-busca");

    if (!formularioBusca) {
        return;
    }

    formularioBusca.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const termo = document.querySelector("#termo-busca").value;
        mostrarResultados(buscarHistorias(termo));
    });
}

// ===== Página Histórias =====
function renderizarFiltros() {
    const areaFiltros = document.querySelector("#filtros");
    const categorias = ["Todas", ...new Set(historias.map((historia) => historia.categoria))];

    areaFiltros.innerHTML = categorias
        .map((categoria) => `
            <button type="button" data-categoria="${categoria}" aria-pressed="${categoria === categoriaAtual}">
                ${categoria}
            </button>
        `)
        .join("");
}

function renderizarHistorias() {
    const areaLista = document.querySelector("#lista-historias");
    const favoritos = carregarFavoritos();
    const lista = categoriaAtual === "Todas"
        ? historias
        : historias.filter((historia) => historia.categoria === categoriaAtual);

    areaLista.innerHTML = lista.map((historia) => criarCartao(historia, favoritos)).join("");
}

function renderizarFavoritos() {
    const areaFavoritos = document.querySelector("#lista-favoritos");
    const favoritos = carregarFavoritos();
    const lista = historias.filter((historia) => favoritos.includes(historia.id));

    if (lista.length === 0) {
        areaFavoritos.innerHTML = `<p>Você ainda não favoritou nenhuma história.</p>`;
        return;
    }

    areaFavoritos.innerHTML = lista.map((historia) => criarCartao(historia, favoritos)).join("");
}

function atualizarPagina() {
    renderizarHistorias();
    renderizarFavoritos();
}

function configurarPaginaHistorias() {
    const areaFiltros = document.querySelector("#filtros");
    const listaHistorias = document.querySelector("#lista-historias");
    const listaFavoritos = document.querySelector("#lista-favoritos");

    function aoClicarFavorito(evento) {
        const botao = evento.target.closest(".botao-favorito");

        if (!botao) {
            return;
        }

        const id = Number(botao.dataset.id);
        const veioDaLista = evento.currentTarget === listaHistorias;

        alternarFavorito(id);
        atualizarPagina();

        if (veioDaLista) {
            listaHistorias.querySelector(`[data-id="${id}"]`).focus();
        }
    }

    areaFiltros.addEventListener("click", (evento) => {
        const botao = evento.target.closest("button[data-categoria]");

        if (!botao) {
            return;
        }

        categoriaAtual = botao.dataset.categoria;
        renderizarFiltros();
        renderizarHistorias();
        areaFiltros.querySelector(`[data-categoria="${categoriaAtual}"]`).focus();
    });

    listaHistorias.addEventListener("click", aoClicarFavorito);
    listaFavoritos.addEventListener("click", aoClicarFavorito);

    renderizarFiltros();
    atualizarPagina();
}

// ===== Página Curiosidades =====
function escaparHtml(texto) {
    return texto.replace(/[&<>"']/g, (caractere) => `&#${caractere.charCodeAt(0)};`);
}

function carregarSugestoes() {
    try {
        const salvas = localStorage.getItem(CHAVE_SUGESTOES);
        return salvas ? JSON.parse(salvas) : [];
    } catch (erro) {
        return [];
    }
}

function salvarSugestoes(sugestoes) {
    localStorage.setItem(CHAVE_SUGESTOES, JSON.stringify(sugestoes));
}

function sortearCuriosidade() {
    const area = document.querySelector("#area-curiosidade");
    let indice;

    do {
        indice = Math.floor(Math.random() * curiosidades.length);
    } while (indice === indiceCuriosidadeAtual && curiosidades.length > 1);

    indiceCuriosidadeAtual = indice;
    const curiosidade = curiosidades[indice];

    area.innerHTML = `
        <img src="${curiosidade.imagem}" alt="${curiosidade.alt}" width="800" height="533">
        <h3>${curiosidade.categoria}</h3>
        <p>${curiosidade.texto}</p>
    `;
}

function renderizarSugestoes() {
    const area = document.querySelector("#lista-sugestoes");
    const sugestoes = carregarSugestoes();

    if (sugestoes.length === 0) {
        area.innerHTML = `<p>Você ainda não enviou nenhuma sugestão.</p>`;
        return;
    }

    area.innerHTML = sugestoes
        .map((sugestao) => `
            <article class="cartao">
                <h3>${escaparHtml(sugestao.categoria)}</h3>
                <p>${escaparHtml(sugestao.texto)}</p>
                <p>Enviada por ${escaparHtml(sugestao.nome)}</p>
            </article>
        `)
        .join("");
}

function configurarPaginaCuriosidades() {
    const botaoSortear = document.querySelector("#botao-sortear");
    const formulario = document.querySelector("#form-sugestao");
    const mensagem = document.querySelector("#mensagem-form");

    botaoSortear.addEventListener("click", sortearCuriosidade);

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nome = formulario.elements.nome.value.trim();
        const categoria = formulario.elements.categoria.value;
        const texto = formulario.elements.texto.value.trim();

        if (nome.length < 2 || texto.length < 20) {
            mensagem.textContent = `Preencha o nome (mínimo de 2 letras) e a curiosidade (mínimo de 20 caracteres).`;
            return;
        }

        const sugestoes = carregarSugestoes();
        salvarSugestoes([...sugestoes, { nome, categoria, texto }]);

        formulario.reset();
        mensagem.textContent = `Obrigado, ${nome}! Sua sugestão foi salva neste navegador.`;
        renderizarSugestoes();
    });

    renderizarSugestoes();
}

// ===== Inicialização =====
mostrarAnoAtual();
configurarBusca();

if (document.querySelector("#lista-historias")) {
    configurarPaginaHistorias();
}

if (document.querySelector("#form-sugestao")) {
    configurarPaginaCuriosidades();
}