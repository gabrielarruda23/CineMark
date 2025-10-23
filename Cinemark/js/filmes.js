document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formFilme');
    const lista = document.getElementById('listaFilmes');

    // Carregar filmes já salvos
    carregarFilmes();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const filme = {
            id: Date.now(),
            titulo: document.getElementById('titulo').value,
            genero: document.getElementById('genero').value,
            descricao: document.getElementById('descricao').value,
            classificacao: document.getElementById('classificacao').value,
            duracao: document.getElementById('duracao').value,
            estreia: document.getElementById('estreia').value
        };

        const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
        filmes.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmes));

        alert('Filme cadastrado com sucesso!');
        form.reset();
        carregarFilmes();
    });

    function carregarFilmes() {
        lista.innerHTML = '';
        const filmes = JSON.parse(localStorage.getItem('filmes')) || [];

        if (filmes.length === 0) {
            lista.innerHTML = '<p>Nenhum filme cadastrado ainda.</p>';
            return;
        }

        filmes.forEach(f => {
            const card = document.createElement('div');
            card.classList.add('filme-card');
            card.innerHTML = `
                <h3>${f.titulo}</h3>
                <p><strong>Gênero:</strong> ${f.genero}</p>
                <p><strong>Classificação:</strong> ${f.classificacao}</p>
                <p><strong>Duração:</strong> ${f.duracao} min</p>
                <p><strong>Estreia:</strong> ${f.estreia}</p>
                <p>${f.descricao}</p>
                <button onclick="removerFilme(${f.id})">Remover</button>
            `;
            lista.appendChild(card);
        });
    }

    window.removerFilme = (id) => {
        let filmes = JSON.parse(localStorage.getItem('filmes')) || [];
        filmes = filmes.filter(f => f.id !== id);
        localStorage.setItem('filmes', JSON.stringify(filmes));
        carregarFilmes();
    };
});
