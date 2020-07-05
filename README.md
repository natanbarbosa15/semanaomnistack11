# Front-End Be The Hero

![ReactJS Front-End CI/CD](https://github.com/NatanNMB15/semanaomnistack11/workflows/ReactJS%20Front-End%20CI/CD/badge.svg?branch=frontend)

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

## 2. Configurar variáveis de ambiente

É necessário configurar as variáveis de ambiente, como a URL de conexão com Back-End (API), credenciais do Firebase e do Google Maps Embed API que serão utilizadas pela ReactJS. Há dois arquivos de configurações disponíveis o de desenvolvimento e de produção, ".env.development.example" e ".env.example".

### Firebase e Firebase Performance

<a href="https://firebase.google.com/docs/web/setup?hl=pt-br#aplicativos-node.js" target="_blank">Tutorial Firebase</a>

<a href="https://firebase.google.com/docs/perf-mon/get-started-web" target="_blank">Tutorial Firebase Performance</a>

Necessário configurar as variáveis de credenciais do Firebase. "REACT_APP_FIREBASE_API_KEY", "REACT_APP_FIREBASE_MESSAGING_SENDER_ID", "REACT_APP_FIREBASE_APP_ID" e "REACT_APP_GOOGLE_CLOUD_PROJECT".

### Firebase Analytics

<a href="https://firebase.google.com/docs/analytics/get-started?platform=web" target="_blank">Tutorial Firebase Analytics</a>

Necessário configurar o "measurementId" com a variável "REACT_APP_FIREBASE_MEASUREMENT_ID".

### Google Tag Manager

<a href="https://support.google.com/tagmanager/answer/6103696?hl=en" target="_blank">Tutorial Google Tag Manager</a>

Necessário configurar o ID do Google Tag Manager (GTM-XXXX) com a variável "REACT_APP_GOOGLE_TAG_MANAGER_ID".

### Google Maps Embed API

<a href="https://developers.google.com/maps/documentation/embed/get-api-key" target="_blank">Tutorial Google Maps Embed</a>

Necessário configurar a API Key para utilizar o Google Maps Embed API com a variável "REACT_APP_MAPS_API_KEY".

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

Para executar a Build é necessário ter o arquivo ".env" com as variáveis de ambientes de produção. Execute a "Build" com o seguinte comando:

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

<a href="https://getbootstrap.com/docs/4.0/getting-started/download/#npm" target="_blank">bootstrap</a>

![react-app-rewired](https://github.com/timarney/react-app-rewired)

![customize-cra](https://github.com/arackaf/customize-cra)

E outras bibliotecas, consulte o arquivo "package.json".
