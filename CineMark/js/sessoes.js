document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSessao");
  const lista = document.getElementById("listaSessoes");
  const selectFilme = document.getElementById("filme");
  const selectSala = document.getElementById("sala");

  function carregarSelects() {
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const salas = JSON.parse(localStorage.getItem("salas")) || [];

    selectFilme.innerHTML = "<option value=''>Selecione um filme</option>";
    filmes.forEach(f => {
      selectFilme.innerHTML += `<option value="${f.titulo}">${f.titulo}</option>`;
    });

    selectSala.innerHTML = "<option value=''>Selecione uma sala</option>";
    salas.forEach(s => {
      selectSala.innerHTML += `<option value="${s.nome}">${s.nome}</option>`;
    });
  }

  function carregarSessoes() {
    lista.innerHTML = "";
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

    sessoes.forEach((s, i) => {
      const div = document.createElement("div");
      div.className = "filme-card";
      div.innerHTML = `
        <h3>${s.filme}</h3>
        <p><strong>Sala:</strong> ${s.sala}</p>
        <p><strong>Data e Hora:</strong> ${s.dataHora}</p>
        <p><strong>Preço:</strong> R$ ${s.preco}</p>
        <p><strong>Idioma:</strong> ${s.idioma}</p>
        <p><strong>Formato:</strong> ${s.formato}</p>
        <button onclick="editarSessao(${i})">Editar</button>
        <button onclick="excluirSessao(${i})">Excluir</button>
      `;
      lista.appendChild(div);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    const index = form.getAttribute("data-edit");

    const novaSessao = {
      filme: selectFilme.value,
      sala: selectSala.value,
      dataHora: document.getElementById("dataHora").value,
      preco: document.getElementById("preco").value,
      idioma: document.getElementById("idioma").value,
      formato: document.getElementById("formato").value,
    };

    if (index !== null && index !== "") {
      sessoes[index] = novaSessao;
      alert("Sessão atualizada!");
      form.removeAttribute("data-edit");
    } else {
      sessoes.push(novaSessao);
      alert("Sessão cadastrada!");
    }

    localStorage.setItem("sessoes", JSON.stringify(sessoes));
    form.reset();
    carregarSessoes();
  });

  window.editarSessao = (i) => {
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    const s = sessoes[i];

    selectFilme.value = s.filme;
    selectSala.value = s.sala;
    document.getElementById("dataHora").value = s.dataHora;
    document.getElementById("preco").value = s.preco;
    document.getElementById("idioma").value = s.idioma;
    document.getElementById("formato").value = s.formato;

    form.setAttribute("data-edit", i);
  };

  window.excluirSessao = (i) => {
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    if (confirm(`Excluir sessão do filme "${sessoes[i].filme}"?`)) {
      sessoes.splice(i, 1);
      localStorage.setItem("sessoes", JSON.stringify(sessoes));
      carregarSessoes();
    }
  };

  carregarSelects();
  carregarSessoes();
});
