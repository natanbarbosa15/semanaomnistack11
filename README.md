# Front-End Be The Hero

![ReactJS Front-End CI/CD](https://github.com/NatanNMB15/semanaomnistack11/workflows/ReactJS%20Front-End%20CI/CD/badge.svg?branch=frontend)

## 1. Instalação

Necessário estar com o Node JS versão 12 instalado.

Executar o comando abaixo para instalar as depedências:

Utilizando Yarn:

```
yarn install
```

Utilizando NPM:

```
npm install
```

## 2. Configurar variáveis de ambiente

É necessário configurar as variáveis de ambiente da URL de conexão com Back-End (API), do Firebase e do Google Maps Embed API que serão utilizadas pela ReactJS. Há dois arquivos disponíveis o de desenvolvimento e de produção.

![Tutorial Firebase](https://firebase.google.com/docs/web/setup?hl=pt-br#aplicativos-node.js)
![Tutorial Google Maps Embed](https://developers.google.com/maps/documentation/embed/get-api-key)

## 3. Executar na máquina local

Para executar na máquina local é necessário ter o arquivo ".env.development" e/ou ".env" com as variáveis de ambientes de desenvolvimento ou de produção. Execute com o seguinte comando:

Utilizando Yarn:

```
yarn dev
```

Utilizando NPM:

```
npm dev
```

## 4. Realizar a "Build" para o ambiente de produção

Para executar a Build é necessário ter o arquivo ".env" com as variáveis de ambientes de produção. Execute com o seguinte comando:

Utilizando Yarn:

```
yarn build
```

Utilizando NPM:

```
npm build
```

Irá gerar uma pasta "build" com os arquivos estáticos do Site.

## Executar testes com o Cypress

Esse projeto já possui arquivos para testar o Site com o Cypress. Com o Site rodando localmente em sua máquina ou em um domínio específico, execute o comando abaixo:

Utilizando Yarn:

```
yarn cypress:open
```

Utilizando NPM:

```
npm cypress:open
```

Irá abrir a tela do Cypress, mande executar todos os testes, eles já estão na ordem correta. É possível alterar as configurações pelo Cypress ou pelo arquivo "cypress.json" dentro da pasta "cypress".

## Informações Adicionais

Esse projeto utiliza as seguintes relevantes bibliotecas do NodeJS no projeto:
![cep-promise](https://github.com/filipedeschamps/cep-promise)
![firebase](https://github.com/firebase/firebase-js-sdk)
![bootstrap](https://getbootstrap.com/docs/4.0/getting-started/download/#npm)
![react-app-rewired](https://github.com/timarney/react-app-rewired)
![customize-cra](https://github.com/arackaf/customize-cra)

E outras bibliotecas, consulte o arquivo "package.json".
