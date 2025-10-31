# Sistema Web de Controle de Cinema

## Objetivo

Desenvolver um sistema web para controle de cinema utilizando **HTML**, **CSS** e **JavaScript**, com funcionalidades de cadastro, listagem e venda de ingressos. Os dados são armazenados localmente por meio do **localStorage**, e a navegação ocorre entre páginas HTML interligadas.

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (DOM e localStorage)

## Funcionalidades

O sistema é composto por várias páginas, cada uma responsável por uma parte do gerenciamento do cinema:

1. **Página Inicial (index.html)**
   Contém o menu de navegação com links para todas as seções do sistema.

2. **Cadastro de Filmes (cadastro-filmes.html)**
   Permite cadastrar filmes com título, gênero, descrição, classificação, duração e data de estreia.

   * Armazenamento: `localStorage` (chave: **filmes**)

3. **Cadastro de Salas (cadastro-salas.html)**
   Permite cadastrar salas com nome, capacidade e tipo (2D, 3D, IMAX).

   * Armazenamento: `localStorage` (chave: **salas**)

4. **Cadastro de Sessões (cadastro-sessoes.html)**
   Permite vincular um filme e uma sala, além de definir data, hora, preço, idioma e formato.

   * Armazenamento: `localStorage` (chave: **sessoes**)

5. **Venda de Ingressos (venda-ingressos.html)**
   Permite registrar a venda de ingressos com os dados do cliente e pagamento.

   * Armazenamento: `localStorage` (chave: **ingressos**)

6. **Listagem de Sessões (sessoes.html)**
   Exibe todas as sessões cadastradas, mostrando filme, sala, data, hora e preço.
   Inclui botão para compra de ingresso redirecionando para a página de venda.

## Conceitos Trabalhados

* Manipulação do DOM com JavaScript
* Uso de `localStorage` para persistência de dados
* Estruturação de formulários e listas dinâmicas
* Encadeamento de dados entre entidades

## Navegação

Todas as páginas possuem um **menu fixo** com links entre si, permitindo acesso direto às demais seções do sistema.
