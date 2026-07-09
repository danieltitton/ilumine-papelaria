document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. LÓGICA DO FILTRO DE CATEGORIAS
       ========================================================================== */
    const botoesFiltro = document.querySelectorAll(".btn-filter");
    const cardsProdutos = document.querySelectorAll(".product-card");

    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", () => {
            // 1. Remove a classe 'active' de todos os botões e adiciona no clicado
            botoesFiltro.forEach(b => b.classList.remove("active"));
            botao.classList.add("active");

            // 2. Pega a categoria do botão clicado
            const categoriaSelecionada = botao.getAttribute("data-filter");

            // 3. Filtra os produtos na vitrine
            cardsProdutos.forEach(card => {
                const categoriaCard = card.getAttribute("data-category");

                if (categoriaSelecionada === "todos" || categoriaSelecionada === categoriaCard) {
                    card.style.display = "block"; // Mostra o produto
                    // Pequeno delay para efeito visual de fade-in controlado por CSS se quiser depois
                    setTimeout(() => card.style.opacity = "1", 10); 
                } else {
                    card.style.opacity = "0";
                    card.style.display = "none"; // Esconde o produto
                }
            });
        });
    });

    /* ==========================================================================
       2. LÓGICA DO CARROSSEL (SLIDER)
       ========================================================================== */
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const btnNext = document.querySelector(".btn-next");
    const btnPrev = document.querySelector(".btn-prev");
    
    let slideAtualIndex = 0;

    // Função que move o carrossel para o slide correto baseado no index
    const moverParaSlide = (index) => {
        const larguraSlide = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${larguraSlide * index}px)`;
        slideAtualIndex = index;
    };

    // Botão Próximo
    btnNext.addEventListener("click", () => {
        let proximoIndex = slideAtualIndex + 1;
        // Se chegar no último, volta para o primeiro
        if (proximoIndex >= slides.length) {
            proximoIndex = 0;
        }
        moverParaSlide(proximoIndex);
    });

    // Botão Anterior
    btnPrev.addEventListener("click", () => {
        let anteriorIndex = slideAtualIndex - 1;
        // Se estiver no primeiro e voltar, vai para o último
        if (anteriorIndex < 0) {
            anteriorIndex = slides.length - 1;
        }
        moverParaSlide(anteriorIndex);
    });

    // Ajusta o carrossel se a janela mudar de tamanho (responsividade)
    window.addEventListener("resize", () => {
        moverParaSlide(slideAtualIndex);
    });

    // (Opcional) Carrossel Automático - Passa a cada 5 segundos
    setInterval(() => {
        btnNext.click();
    }, 5000);

});