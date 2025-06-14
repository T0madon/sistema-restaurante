# 🍽️ Sistema de Gerenciamento de Restaurante - ReactJS (Vite + JSON Server)

Este projeto foi desenvolvido como o **trabalho final da disciplina de Desenvolvimento Web**. O objetivo central era criar uma aplicação **Single Page Application (SPA)** utilizando **ReactJS**, capaz de **cadastrar e listar informações de uma API REST**.

### Autores
  - **João Vitor Tomadon Daciuk**
  - **Gabriel Tonon Cimatti**

---

## 📌 Descrição do Projeto

A proposta escolhida foi criar um **sistema de gerenciamento para um restaurante fictício**, com foco nos seguintes módulos principais:

- **Gerenciamento de Cardápio (Pratos)**
- **Gerenciamento de Pedidos**
- **Pedidos Concluídos**

Para garantir uma experiência fluida e moderna, utilizei o **Vite** para iniciar o projeto rapidamente e bibliotecas como:

- **axios** → Comunicação com a API REST
- **react-router-dom** → Controle de rotas e navegação
- **json-server** → Simulação da API REST (mock backend)
- **API ViaCEP** → Para preenchimento automático de endereços com base no CEP

---

## ✅ Funcionalidades

### 📋 1. Gerenciamento de Cardápio (Pratos)

- Adicionar novo prato
- Visualizar lista de pratos cadastrados

---

### 🛒 2. Gerenciamento de Pedidos

- Cadastro de pedido, com:
  - Nome do cliente
  - Dados do endereço (busca automática via API do ViaCEP a partir do CEP)
  - Prato selecionado
- Listagem de pedidos em aberto
  - Ordenados do mais antigo para o mais recente

---

### ✅ 3. Conclusão de Pedidos

- Marcar um pedido como concluído
- Pedido desaparece da lista de abertos e aparece na página de **"Pedidos Concluídos"**

---

### 🔗 4. Navegação

- Navegação entre as páginas feita por meio de um **header fixo**, com links para:
  - Cardápio
  - Pedidos em Aberto
  - Pedidos Concluídos

---

## 🛠️ Tecnologias Utilizadas

- ReactJS (com Vite)
- Axios
- React Router DOM
- JSON Server
- API ViaCEP (serviço externo para busca de endereço)

---

## 🚀 Como Executar o Projeto Localmente

### 1️⃣ Clone o repositório:

```bash
git clone https://github.com/T0madon/sistema-restaurante.git
cd sistema-restaurante
```
2️⃣ Instale as dependências:
```bash
npm install
```
3️⃣ Inicie o backend (JSON Server):
```bash
npx json-server --watch db.json --port 3001
```
Isso vai subir a API mock em:
http://localhost:3001

4️⃣ Inicie o frontend (React/Vite):
bash
Copiar
Editar
npm run dev
A aplicação React irá abrir em algo como:
http://localhost:5173

## 🧑‍💻 Endpoints da API Mock (json-server)
Recurso	Endpoint
- Pratos	GET /pratos / POST /pratos
- Pedidos	GET /pedidos / POST /pedidos / PATCH /pedidos/:id

## 📬 Observações Finais
Este é um protótipo educacional, com foco na aplicação de conceitos aprendidos na disciplina.

Toda a persistência de dados acontece localmente via o json-server.

Não há autenticação, sendo um sistema simples apenas para fins acadêmicos.

## 👨‍🏫 Requisitos Atendidos
- ✔️ SPA com ReactJS
- ✔️ Consumo de API REST (JSON Server + ViaCEP)
- ✔️ Cadastro e listagem de dados
- ✔️ Navegação entre múltiplas telas
- ✔️ Operações de adição e remoção (CRUD básico)
- ✔️ Integração com serviço externo (ViaCEP)
