document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formFilme");
  const listaFilmes = document.getElementById("listaFilmes");

  function carregarFilmes() {
    listaFilmes.innerHTML = "";
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];

    filmes.forEach((filme, i) => {
      const div = document.createElement("div");
      div.className = "filme-card";
      div.innerHTML = `
        <h3>${filme.titulo}</h3>
        <p><strong>Gênero:</strong> ${filme.genero}</p>
        <p><strong>Classificação:</strong> ${filme.classificacao}</p>
        <p><strong>Duração:</strong> ${filme.duracao} min</p>
        <p><strong>Estreia:</strong> ${filme.estreia}</p>
        <p>${filme.descricao}</p>
        <button onclick="editarFilme(${i})"> Editar</button>
        <button onclick="excluirFilme(${i})"> Excluir</button>
      `;
      listaFilmes.appendChild(div);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const index = form.getAttribute("data-edit");

    const novoFilme = {
      titulo: titulo.value,
      genero: genero.value,
      descricao: descricao.value,
      classificacao: classificacao.value,
      duracao: duracao.value,
      estreia: estreia.value,
    };

    if (index !== null && index !== "") {
      filmes[index] = novoFilme;
      alert("Filme atualizado!");
      form.removeAttribute("data-edit");
    } else {
      filmes.push(novoFilme);
      alert("Filme cadastrado!");
    }

    localStorage.setItem("filmes", JSON.stringify(filmes));
    form.reset();
    carregarFilmes();
  });

  window.editarFilme = (i) => {
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const f = filmes[i];
    titulo.value = f.titulo;
    genero.value = f.genero;
    descricao.value = f.descricao;
    classificacao.value = f.classificacao;
    duracao.value = f.duracao;
    estreia.value = f.estreia;
    form.setAttribute("data-edit", i);
  };

  window.excluirFilme = (i) => {
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    if (confirm(`Excluir "${filmes[i].titulo}"?`)) {
      filmes.splice(i, 1);
      localStorage.setItem("filmes", JSON.stringify(filmes));
      carregarFilmes();
    }
  };

  carregarFilmes();
});
