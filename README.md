DriverShopper

Bem-vindo ao DriverShopper, um projeto desenvolvido com o intuito de demonstrar minha experiência e habilidades em React, Node.js, TypeScript, MongoDB, e Docker. Este repositório contém o frontend e backend para um sistema web otimizado, pronto para produção.

📋 Descrição

Este projeto foi criado como uma oportunidade para aplicar as melhores práticas de desenvolvimento, o objetivo é apresentar soluções modernas e eficientes para a construção de sistemas web, com foco em:

Frontend: Desenvolvido em React com TypeScript, criando uma aplicação Single Page Application (SPA) com componentes reutilizáveis, integrando com o backend para fornecer uma experiência fluida ao usuário.

Backend: Desenvolvido em Node.js com TypeScript, garantindo um código robusto, escalável e bem tipado. Integração com a API do Google Maps e uso do MongoDB como banco de dados.

Containerização: Docker para garantir consistência entre os ambientes de desenvolvimento e produção, oferecendo flexibilidade e eficiência na execução do projeto em qualquer infraestrutura.

🛠️ Tecnologias Utilizadas

Frontend:

React com TypeScript para o desenvolvimento do cliente.

Suporte a variáveis de ambiente com .env.

Build otimizado para produção com npm run build.

Backend:

Node.js e TypeScript para a API.

MongoDB como banco de dados.

Integração com a API do Google Maps para calcular as rotas e estimativas de distância.

Suporte a variáveis de ambiente e estrutura modular.

Infraestrutura:

Docker para orquestração de containers.

Docker Compose para simplificar a configuração multi-container.

📦 Estrutura do Repositório

|-- backend/
  |     |-- src/
  |     |     |-- controllers/
  |     |     |     |-- rideController.ts
  |     |     |-- services/
  |     |     |     |-- rideService.ts
  |     |     |-- models/
  |     |     |     |-- userModel.ts
  |     |     |     |-- driverModel.ts
  |     |     |     |-- rideModel.ts
  |     |     |-- routes/
  |     |     |     |-- rideRoutes.ts
  |     |     |-- utils/
  |     |     |     |-- googleMapsHelper.ts
  |     |     |-- app.ts
  |     |-- tests/
  |     |     |-- rideController.test.ts
  |     |-- Dockerfile
  |     |-- package.json
  |     |-- tsconfig.json
  |
  |-- frontend/
  |     |-- public/
  |     |-- src/
  |     |     |-- components/
  |     |     |     |-- RideForm.tsx
  |     |     |     |-- RideOptions.tsx
  |     |     |     |-- RideHistory.tsx
  |     |     |-- services/
  |     |     |     |-- apiService.ts
  |     |     |-- App.tsx
  |     |-- Dockerfile
  |     |-- package.json
  |     |-- tsconfig.json
  |
  |-- docker-compose.yml
  |-- README.md

🚀 Como Rodar o Projeto Localmente

Pré-requisitos:

Docker instalado.

Docker Compose configurado.

Passos:

Clone o Repositório

git clone git@github.com:seb2301/API_DriverShopper.git
cd drivershopper-challenger

**Configure o **.env

Certifique-se de que seu arquivo .env na raiz contém uma variável GOOGLE_API_KEY válida.

Inicie os Containers

docker-compose up --build

Acesse a Aplicação

Frontend: http://localhost:8080

Backend: http://localhost:8080

🧪 Scripts Disponíveis

No Frontend:

npm run dev: Inicia o servidor de desenvolvimento.

npm run build: Cria uma build otimizada.

npm run start: Inicia o servidor de produção.

No Backend:

npm run start: Inicia o servidor em produção.

npm run build: Compila o TypeScript para JavaScript.

🌟 Contribuindo

Contribuições são muito bem-vindas! Para contribuir:

Faça um fork do projeto.

Crie sua branch (git checkout -b minha-feature).

Commit suas mudanças (git commit -m 'Minha nova feature').

Faça o push para sua branch (git push origin minha-feature).

Abra um Pull Request.

📜 Por Sebastião Soares da Silva Filho.
