document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formIngresso");
  const lista = document.getElementById("listaIngressos");
  const selectSessao = document.getElementById("sessao");
  const nomeCliente = document.getElementById("nomeCliente");
  const cpf = document.getElementById("cpf");
  const assento = document.getElementById("assento");
  const pagamento = document.getElementById("pagamento");

  function carregarSessoes() {
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    selectSessao.innerHTML = "<option value=''>Selecione</option>";
    sessoes.forEach((s, i) => {
      selectSessao.innerHTML += `<option value="${i}">${s.filme} - ${s.sala} - ${s.dataHora}</option>`;
    });
  }

  function carregarIngressos() {
    lista.innerHTML = "";
    const ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

    ingressos.forEach((ingresso, i) => {
      const sessao = sessoes[ingresso.sessao];
      const div = document.createElement("div");
      div.className = "filme-card";
      div.innerHTML = `
        <h3>${sessao ? sessao.filme : "Sessão Removida"}</h3>
        <p><strong>Cliente:</strong> ${ingresso.nomeCliente}</p>
        <p><strong>CPF:</strong> ${ingresso.cpf}</p>
        <p><strong>Assento:</strong> ${ingresso.assento}</p>
        <p><strong>Pagamento:</strong> ${ingresso.pagamento}</p>
        <button onclick="editarIngresso(${i})">Editar</button>
        <button onclick="excluirIngresso(${i})">Excluir</button>
      `;
      lista.appendChild(div);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];
    const index = form.getAttribute("data-edit");

    const novoIngresso = {
      sessao: selectSessao.value,
      nomeCliente: nomeCliente.value,
      cpf: cpf.value,
      assento: assento.value,
      pagamento: pagamento.value,
    };

    if (index !== null && index !== "") {
      ingressos[index] = novoIngresso;
      alert("Ingresso atualizado!");
      form.removeAttribute("data-edit");
    } else {
      ingressos.push(novoIngresso);
      alert("Ingresso vendido!");
    }

    localStorage.setItem("ingressos", JSON.stringify(ingressos));
    form.reset();
    carregarIngressos();
  });

  window.editarIngresso = (i) => {
    const ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];
    const ing = ingressos[i];
    selectSessao.value = ing.sessao;
    nomeCliente.value = ing.nomeCliente;
    cpf.value = ing.cpf;
    assento.value = ing.assento;
    pagamento.value = ing.pagamento;
    form.setAttribute("data-edit", i);
  };

  window.excluirIngresso = (i) => {
    const ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];
    if (confirm(`Excluir ingresso de ${ingressos[i].nomeCliente}?`)) {
      ingressos.splice(i, 1);
      localStorage.setItem("ingressos", JSON.stringify(ingressos));
      carregarIngressos();
    }
  };

  carregarSessoes();
  carregarIngressos();
});
