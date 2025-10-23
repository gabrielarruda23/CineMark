document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formSessao');
    const lista = document.getElementById('listaSessoes');
    const filmeSelect = document.getElementById('filme');
    const salaSelect = document.getElementById('sala');

    carregarFilmes();
    carregarSalas();
    carregarSessoes();

    // Carrega filmes do localStorage no <select>
    function carregarFilmes() {
        const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
        filmeSelect.innerHTML = '<option value="">Selecione</option>';
        filmes.forEach(f => {
            const option = document.createElement('option');
            option.value = f.id;
            option.textContent = f.titulo;
            filmeSelect.appendChild(option);
        });
    }

    // Carrega salas do localStorage no <select>
    function carregarSalas() {
        const salas = JSON.parse(localStorage.getItem('salas')) || [];
        salaSelect.innerHTML = '<option value="">Selecione</option>';
        salas.forEach(s => {
            const option = document.createElement('option');
            option.value = s.id;
            option.textContent = s.nome;
            salaSelect.appendChild(option);
        });
    }

    // Salvar sessão
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
        const salas = JSON.parse(localStorage.getItem('salas')) || [];

        const filme = filmes.find(f => f.id == filmeSelect.value);
        const sala = salas.find(s => s.id == salaSelect.value);

        const sessao = {
            id: Date.now(),
            filmeId: filme.id,
            filmeTitulo: filme.titulo,
            salaId: sala.id,
            salaNome: sala.nome,
            dataHora: document.getElementById('dataHora').value,
            preco: parseFloat(document.getElementById('preco').value).toFixed(2),
            idioma: document.getElementById('idioma').value,
            formato: document.getElementById('formato').value
        };

        const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
        sessoes.push(sessao);
        localStorage.setItem('sessoes', JSON.stringify(sessoes));

        alert('Sessão cadastrada com sucesso!');
        form.reset();
        carregarSessoes();
    });

    // Carregar e exibir sessões
    function carregarSessoes() {
        lista.innerHTML = '';
        const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];

        if (sessoes.length === 0) {
            lista.innerHTML = '<p>Nenhuma sessão cadastrada ainda.</p>';
            return;
        }

        sessoes.forEach(sessao => {
            const card = document.createElement('div');
            card.classList.add('filme-card');
            card.innerHTML = `
                <h3>${sessao.filmeTitulo}</h3>
                <p><strong>Sala:</strong> ${sessao.salaNome}</p>
                <p><strong>Data/Hora:</strong> ${new Date(sessao.dataHora).toLocaleString()}</p>
                <p><strong>Preço:</strong> R$ ${sessao.preco}</p>
                <p><strong>Idioma:</strong> ${sessao.idioma}</p>
                <p><strong>Formato:</strong> ${sessao.formato}</p>
                <button onclick="removerSessao(${sessao.id})">Remover</button>
            `;
            lista.appendChild(card);
        });
    }

    // Função global para remover sessão
    window.removerSessao = (id) => {
        let sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
        sessoes = sessoes.filter(s => s.id !== id);
        localStorage.setItem('sessoes', JSON.stringify(sessoes));
        carregarSessoes();
    };
});
