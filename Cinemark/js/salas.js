document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formSala');
    const lista = document.getElementById('listaSalas');

    carregarSalas();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const sala = {
            id: Date.now(),
            nome: document.getElementById('nome').value,
            capacidade: document.getElementById('capacidade').value,
            tipo: document.getElementById('tipo').value
        };

        const salas = JSON.parse(localStorage.getItem('salas')) || [];
        salas.push(sala);
        localStorage.setItem('salas', JSON.stringify(salas));

        alert('Sala cadastrada com sucesso!');
        form.reset();
        carregarSalas();
    });

    function carregarSalas() {
        lista.innerHTML = '';
        const salas = JSON.parse(localStorage.getItem('salas')) || [];

        if (salas.length === 0) {
            lista.innerHTML = '<p>Nenhuma sala cadastrada ainda.</p>';
            return;
        }

        salas.forEach(s => {
            const card = document.createElement('div');
            card.classList.add('filme-card');
            card.innerHTML = `
                <h3>${s.nome}</h3>
                <p><strong>Capacidade:</strong> ${s.capacidade} lugares</p>
                <p><strong>Tipo:</strong> ${s.tipo}</p>
                <button onclick="removerSala(${s.id})">Remover</button>
            `;
            lista.appendChild(card);
        });
    }

    window.removerSala = (id) => {
        let salas = JSON.parse(localStorage.getItem('salas')) || [];
        salas = salas.filter(s => s.id !== id);
        localStorage.setItem('salas', JSON.stringify(salas));
        carregarSalas();
    };
});
