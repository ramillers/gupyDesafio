# gupyDesafio
PROCESSO SELETIVO – Desafio Tunts.Rocks 2024 – NÍVEL 1 

# Sobre
Este projeto é uma solução desenvolvida como parte de um desafio proposto pela Tunts.Rocks para uma vaga de estágio em desenvolvimento de software. Ele visa criar um sistema de gerenciamento de notas escolares, integrando-se ao Google Sheets para fornecer informações sobre a situação dos alunos e as notas necessárias para aprovação.

# Iniciando
Estas instruções ajudarão você a obter uma cópia do projeto em execução na sua máquina local para desenvolvimento e testes. 

# Pré-requisitos
- Node.js instalado na sua máquina. Se não tiver, você pode baixá-lo aqui. 
- Um projeto criado no Google Cloud Plataform, com a API do Google Sheets habilitada.
# Para configurar o ambiente no Google Cloud Plataform:

- Acesse o Google Cloud Plataform.

- Crie ou faça login na sua conta.

- Crie um novo projeto.

- Vá até a aba "APIs e Serviços" e clique em "Biblioteca".

- Procure por "Google Sheets API" e habilite-a.

- Crie credenciais de conta de serviço e baixe o arquivo JSON com as credenciais.

- Instalando

# Siga estas instruções para instalar o projeto na sua máquina local:

- Clone o repositório ou faça o download do projeto:

- bash Copy code git clone https://github.com/SeuNomeDeUsuário/Avaliacao-Notas-Escolares.git Instale as dependências:

- Copy code npm install

- Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente conforme o arquivo .env.example.

- Adicione o arquivo JSON com as credenciais do Google Cloud Platform na raiz do projeto, com o nome credentials.json.

# Executando o Projeto

- Execute o seguinte comando:

    arduino

    Copy code

    npm run dev

    Acesse o endereço http://localhost:3000 no seu aplicativo de requisições HTTP e teste as rotas do sistema.

# Usando

- Agora que o projeto está rodando na sua máquina, você pode testar as rotas disponíveis no sistema.

# Rota para ler os dados da planilha:

- sql

- Copy code

- GET /values

# Rota para retornar a situação dos alunos e as notas necessárias:

- bash

- Copy code

- PUT /values

# Tecnologias Utilizadas

- Node.js - Tempo de execução JavaScript

- Express - Framework web para Node.js

- Google Sheets API - API para manipulação de planilhas do Google Sheets

- Google Cloud Plataform - Plataforma de computação em nuvem da Google 
