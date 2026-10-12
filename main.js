document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. LÓGICA DO FILTRO DE CATEGORIAS
       ========================================================================== */
    const seletorCategoria = document.querySelector("#category-select");
    const cardsProdutos = document.querySelectorAll(".product-card");

    const filtrarCategoria = (categoria, atualizarUrl = true) => {
        const cardsDaCategoria = Array.from(cardsProdutos).filter(
            card => card.dataset.category === categoria
        );
        const categoriaExiste = cardsDaCategoria.length > 0;
        const categoriaSelecionada =
            categoria === "todos" || categoriaExiste ? categoria : "todos";

        seletorCategoria.value = categoriaSelecionada;
        cardsProdutos.forEach(card => {
            card.hidden =
                categoriaSelecionada !== "todos" &&
                card.dataset.category !== categoriaSelecionada;
        });

        if (atualizarUrl) {
            const url = new URL(window.location.href);
            if (categoriaSelecionada === "todos") {
                url.searchParams.delete("categoria");
            } else {
                url.searchParams.set("categoria", categoriaSelecionada);
            }
            window.history.replaceState(null, "", url);
        }

        if (categoriaSelecionada !== "todos" && cardsDaCategoria.length === 1) {
            const linkDoProduto = cardsDaCategoria[0].querySelector(
                ".product-detail-link"
            );
            if (linkDoProduto) {
                window.location.assign(linkDoProduto.href);
                return;
            }
        }

        if (categoriaSelecionada !== "todos") {
            document.querySelector(".products-grid").scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const categoriaInicial = new URLSearchParams(window.location.search).get("categoria");
    filtrarCategoria(categoriaInicial || "todos", false);
    seletorCategoria.addEventListener("change", () => {
        filtrarCategoria(seletorCategoria.value);
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