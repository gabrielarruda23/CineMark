// Função para carregar os filmes do localStorage
function carregarCartaz() {
  const cartaz = document.getElementById("cartaz");
  cartaz.innerHTML = "";

  const filmes = JSON.parse(localStorage.getItem("filmes")) || [];

  if (filmes.length === 0) {
    cartaz.innerHTML = "<p style='color:white; text-align:center;'>Nenhum filme cadastrado ainda.</p>";
    return;
  }

  filmes.forEach(filme => {
    const card = document.createElement("div");
    card.classList.add("filme-card");

    card.innerHTML = `
      <img src="${filme.imagem}" alt="Cartaz de ${filme.titulo}" class="poster">
      <h3>${filme.titulo}</h3>
      <p><strong>Gênero:</strong> ${filme.genero}</p>
      <p><strong>Duração:</strong> ${filme.duracao} min</p>
      <p><strong>Classificação:</strong> ${filme.classificacao}</p>
      <p><strong>Estreia:</strong> ${filme.dataEstreia}</p>
      <p>${filme.descricao}</p>
      <button onclick="verSessoes('${filme.titulo}')">Ver Sessões</button>
    `;

    cartaz.appendChild(card);
  });
}

// Redireciona para a página de sessões do filme selecionado
function verSessoes(titulo) {
  localStorage.setItem("filmeSelecionado", titulo);
  window.location.href = "disponiveis.html";
}

// Executa quando a página carregar
document.addEventListener("DOMContentLoaded", carregarCartaz);
