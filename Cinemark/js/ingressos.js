document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formIngresso');
    const lista = document.getElementById('listaIngressos');
    const sessaoSelect = document.getElementById('sessao');

    carregarSessoes();
    carregarIngressos();

    // Carrega sessões do localStorage no <select>
    function carregarSessoes() {
        const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
        sessaoSelect.innerHTML = '<option value="">Selecione</option>';
        sessoes.forEach(s => {
            const option = document.createElement('option');
            option.value = s.id;
            option.textContent = `${s.filmeTitulo} - ${s.salaNome} (${new Date(s.dataHora).toLocaleString()})`;
            sessaoSelect.appendChild(option);
        });
    }

    // Ao enviar o formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
        const sessao = sessoes.find(s => s.id == sessaoSelect.value);

        const ingresso = {
            id: Date.now(),
            sessaoId: sessao.id,
            filmeTitulo: sessao.filmeTitulo,
            salaNome: sessao.salaNome,
            dataHora: sessao.dataHora,
            nomeCliente: document.getElementById('nomeCliente').value,
            cpf: document.getElementById('cpf').value,
            assento: document.getElementById('assento').value,
            pagamento: document.getElementById('pagamento').value
        };

        const ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
        ingressos.push(ingresso);
        localStorage.setItem('ingressos', JSON.stringify(ingressos));

        alert('Venda registrada com sucesso!');
        form.reset();
        carregarIngressos();
    });

    // Carrega lista de ingressos
    function carregarIngressos() {
        lista.innerHTML = '';
        const ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];

        if (ingressos.length === 0) {
            lista.innerHTML = '<p>Nenhum ingresso vendido ainda.</p>';
            return;
        }

        ingressos.forEach(i => {
            const card = document.createElement('div');
            card.classList.add('filme-card');
            card.innerHTML = `
                <h3>${i.filmeTitulo}</h3>
                <p><strong>Sala:</strong> ${i.salaNome}</p>
                <p><strong>Data/Hora:</strong> ${new Date(i.dataHora).toLocaleString()}</p>
                <p><strong>Cliente:</strong> ${i.nomeCliente}</p>
                <p><strong>CPF:</strong> ${i.cpf}</p>
                <p><strong>Assento:</strong> ${i.assento}</p>
                <p><strong>Pagamento:</strong> ${i.pagamento}</p>
                <button onclick="removerIngresso(${i.id})">Remover</button>
            `;
            lista.appendChild(card);
        });
    }

    // Função para remover ingresso
    window.removerIngresso = (id) => {
        let ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
        ingressos = ingressos.filter(i => i.id !== id);
        localStorage.setItem('ingressos', JSON.stringify(ingressos));
        carregarIngressos();
    };
    
    // Verifica se há uma sessão selecionada vinda da página "disponiveis"
    const sessaoSelecionada = localStorage.getItem('sessaoSelecionada');
        if (sessaoSelecionada) {
    setTimeout(() => {
        sessaoSelect.value = sessaoSelecionada;
        localStorage.removeItem('sessaoSelecionada');
    }, 200);
}

});
