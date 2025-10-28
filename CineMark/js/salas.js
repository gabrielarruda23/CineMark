document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSala");
  const lista = document.getElementById("listaSalas");
  const nome = document.getElementById("nome");
  const capacidade = document.getElementById("capacidade");
  const tipo = document.getElementById("tipo");

  function carregarSalas() {
    lista.innerHTML = "";
    const salas = JSON.parse(localStorage.getItem("salas")) || [];

    salas.forEach((sala, i) => {
      const div = document.createElement("div");
      div.className = "filme-card";
      div.innerHTML = `
        <h3>${sala.nome}</h3>
        <p><strong>Capacidade:</strong> ${sala.capacidade}</p>
        <p><strong>Tipo:</strong> ${sala.tipo}</p>
        <button onclick="editarSala(${i})">Editar</button>
        <button onclick="excluirSala(${i})">Excluir</button>
      `;
      lista.appendChild(div);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    const index = form.getAttribute("data-edit");

    const novaSala = {
      nome: nome.value,
      capacidade: capacidade.value,
      tipo: tipo.value,
    };

    if (index !== null && index !== "") {
      salas[index] = novaSala;
      alert("Sala atualizada!");
      form.removeAttribute("data-edit");
    } else {
      salas.push(novaSala);
      alert("Sala cadastrada!");
    }

    localStorage.setItem("salas", JSON.stringify(salas));
    form.reset();
    carregarSalas();
  });

  window.editarSala = (i) => {
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    const s = salas[i];
    nome.value = s.nome;
    capacidade.value = s.capacidade;
    tipo.value = s.tipo;
    form.setAttribute("data-edit", i);
  };

  window.excluirSala = (i) => {
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    if (confirm(`Excluir a sala "${salas[i].nome}"?`)) {
      salas.splice(i, 1);
      localStorage.setItem("salas", JSON.stringify(salas));
      carregarSalas();
    }
  };

  carregarSalas();
});
