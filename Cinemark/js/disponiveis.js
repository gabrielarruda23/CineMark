document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('listaSessoes');
    carregarSessoes();

    function carregarSessoes() {
        lista.innerHTML = '';
        const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];

        if (sessoes.length === 0) {
            lista.innerHTML = '<p>Nenhuma sessão disponível no momento.</p>';
            return;
        }

        sessoes.forEach(sessao => {
            const card = document.createElement('div');
            card.classList.add('filme-card');
            card.innerHTML = `
                <h3>${sessao.filmeTitulo}</h3>
                <p><strong>Sala:</strong> ${sessao.salaNome}</p>
                <p><strong>Data e Hora:</strong> ${new Date(sessao.dataHora).toLocaleString()}</p>
                <p><strong>Preço:</strong> R$ ${sessao.preco}</p>
                <p><strong>Idioma:</strong> ${sessao.idioma}</p>
                <p><strong>Formato:</strong> ${sessao.formato}</p>
                <button onclick="comprarIngresso(${sessao.id})">Comprar Ingresso</button>
            `;
            lista.appendChild(card);
        });
    }

    // Redireciona para a página de ingressos com a sessão selecionada
    window.comprarIngresso = (idSessao) => {
        localStorage.setItem('sessaoSelecionada', idSessao);
        window.location.href = 'ingressos.html';
    };
});
