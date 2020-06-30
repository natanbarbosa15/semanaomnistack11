# Back-End Be The Hero

![ExpressJS Back-End CI/CD](https://github.com/NatanNMB15/semanaomnistack11/workflows/ExpressJS%20Back-End%20CI/CD/badge.svg?branch=backend)

[Documentação OpenAPI da API](https://petstore.swagger.io/?url=https://be-the-hero-275300.appspot.com.storage.googleapis.com/openapi/openapi-appengine.yaml)

## 1. Instalação

Necessário estar com o Node JS versão 12 instalado.

Executar o comando abaixo para instalar as dependências:

Utilizando Yarn:

```
yarn install
```

Utilizando NPM:

```
npm install
```

## 2. Executar no ambiente de desenvolvimento

Inicie o banco de dados local com SQLite. Execute o comando abaixo para realizar as migrações:

Utilizando Yarn:

```
yarn knex:migrate:dev
```

Utilizando NPM:

```
npm knex:migrate:dev
```

Inicie o servidor de desenvolvimento com o seguinte comando:

Utilizando Yarn:

```
yarn dev
```

Utilizando NPM:

```
npm dev
```

## 3. Executar no ambiente de produção

É necessário configurar as variáveis de ambiente para conexão com o banco de dados ao usar o ambiente de produção. No ambiente de desenvolvimento não é necessário pois utiliza SQLite. O arquivo ".env.production.example" mostra as variáveis de ambiente necessárias.

Após configurar, execute o comando abaixo para realizar as migrações no banco de dados de produção:

Utilizando Yarn:

```
yarn knex:migrate:production
```

Utilizando NPM:

```
npm knex:migrate:production
```

Inicie o servidor de produção com o comando abaixo:

Utilizando Yarn:

```
yarn start
```

Utilizando NPM:

```
npm start
```

## Revertendo migrações no banco de dados

Para reverter as migrações no banco de dados no ambiente de desenvolvimento execute o comando abaixo:

Utilizando Yarn:

```
yarn knex:rollback:dev
```

Utilizando NPM:

```
npm knex:rollback:dev
```

Para reverter as migrações no banco de dados no ambiente de produção execute o comando abaixo:

Utilizando Yarn:

```
yarn knex:rollback:production
```

Utilizando NPM:

```
npm knex:rollback:production
```
