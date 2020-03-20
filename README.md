Pre-requisitos:
    - mongodb (v4.0.10)
    - node.js (v11.13.0)
    - npm (v6.7.0)

1. Download
Entre em uma repositório e digite: 
    git clone http://git.opah.com.br/app-do-gado/backend-user.git


2. Executar
Esses passos requer alguns terminais do pronpt aberto.

Startup mongoDB:
Novo terminal, execute:
    mongod

Novo terminal, Entre na pasta raiz e execute:
    npm i

ainda dentro da pasta raiz, execute:
    tsc -w

Abra um novo terminal e dentro da pasta /dist, execute:
    nodemon app-init.js

Pronto. o Backend já está rodando.
Para testar se a API está ON, basta ir no browser:
    http://localhost:2001/