import React from "react";

import Header from "~/components/header";

import gifCadastro from "~/assets/gifs/cadastro.gif";
import gifLogin from "~/assets/gifs/login.gif";
import gifCriarCaso from "~/assets/gifs/criarCaso.gif";
import gifVerCaso from "~/assets/gifs/verCaso.gif";
import gifAtualizarCaso from "~/assets/gifs/atualizarCaso.gif";
import gifExcluirCaso from "~/assets/gifs/excluirCaso.gif";
import gifAtualizarConta from "~/assets/gifs/atualizarConta.gif";
import gifAtualizarSenha from "~/assets/gifs/atualizarSenha.gif";
import gifExcluirConta from "~/assets/gifs/excluirConta.gif";

export default function Tutorial() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt-4 mb-4 no-gutters">
          <div className="col-lg ml-lg-5">
            <div className="row ml-0">
              <div className="col">
                <h1 className="h1 font-weight-bold">Tutorial</h1>
              </div>
            </div>
            <div className="row mx-3 mt-3">
              <div className="col">
                <h1 className="h2 font-weight-bold">1. Crie sua Conta</h1>
                <p className="text-justify">
                  Acesse o menu de cadastro para realizar o registro da ONG:
                </p>
              </div>
            </div>
            <div className="row mx-3">
              <div className="col">
                <img
                  className="img-fluid img-rounded"
                  src={gifCadastro}
                  alt="GIF Cadastro"
                />
              </div>
            </div>
            <div className="row mx-3 mt-3">
              <div className="col">
                <h1 className="h2 font-weight-bold">2. Faça o seu Login</h1>
                <p className="text-justify">
                  Após criar o seu cadastro realize o Login no sistema:
                </p>
              </div>
            </div>
            <div className="row mx-3">
              <div className="col">
                <img
                  className="img-fluid img-rounded"
                  src={gifLogin}
                  alt="GIF Login"
                />
              </div>
            </div>
            <div className="row mx-3 mt-3">
              <div className="col">
                <h1 className="h2 font-weight-bold">
                  3. Crie o seu primeiro caso
                </h1>
                <p className="text-justify">
                  Após realizar o Login cadastre um novo caso no sistema (é
                  possível cadastrar quantos casos quiser):
                </p>
              </div>
            </div>
            <div className="row mx-3">
              <div className="col">
                <img
                  className="img-fluid img-rounded"
                  src={gifCriarCaso}
                  alt="GIF Criar caso"
                />
              </div>
            </div>
            <div className="row mx-3 mt-3">
              <div className="col">
                <h1 className="h2 font-weight-bold">
                  4. Pronto o seu caso já está visível para o público
                </h1>
                <p className="text-justify">
                  Após cadastrar o caso ele estará visível para o público, e em
                  breve alguém poderá entrar em contato para ajudar.
                </p>
              </div>
            </div>
            <div className="row mx-3">
              <div className="col">
                <img
                  className="img-fluid img-rounded"
                  src={gifVerCaso}
                  alt="GIF Visualizar caso"
                />
              </div>
            </div>
            <div className="row mx-3 mt-4">
              <div className="col">
                <h1 className="h1 font-weight-bold">Tutoriais Extras</h1>
              </div>
            </div>
            <div className="row mx-3 mt-3">
              <div className="col">
                <h1 className="h2 font-weight-bold">
                  Atualizar um caso cadastrado
                </h1>
                <p className="text-justify">
                  Após realizar o Login é possível atualizar um caso já
                  cadastrado:
                </p>
              </div>
            </div>
            <div className="row mx-3">
              <div className="col">
                <img
                  className="img-fluid img-rounded"
                  src={gifAtualizarCaso}
                  alt="GIF Atualizar caso"
                />
              </div>
            </div>
            <div className="row mx-3 mt-3">
              <div className="col">
                <h1 className="h2 font-weight-bold">
                  Excluir um caso cadastrado
                </h1>
                <p className="text-justify">
                  Após realizar o Login é possível excluir um caso já
                  cadastrado:
                </p>
              </div>
            </div>
            <div className="row mx-3">
              <div className="col">
                <img
                  className="img-fluid img-rounded"
                  src={gifExcluirCaso}
                  alt="GIF Excluir caso"
                />
              </div>
            </div>
            <div className="row mx-3 mt-3">
              <div className="col">
                <h1 className="h2 font-weight-bold">
                  Atualizar dados do cadastro da ONG
                </h1>
                <p className="text-justify">
                  Após realizar o Login é possível atualizar os dados da ONG:
                </p>
              </div>
            </div>
            <div className="row mx-3">
              <div className="col">
                <img
                  className="img-fluid img-rounded"
                  src={gifAtualizarConta}
                  alt="GIF Atualizar conta"
                />
              </div>
            </div>
            <div className="row mx-3 mt-3">
              <div className="col">
                <h1 className="h2 font-weight-bold">Atualizar senha</h1>
                <p className="text-justify">
                  Após realizar o Login é possível atualizar a senha de acesso:
                </p>
              </div>
            </div>
            <div className="row mx-3">
              <div className="col">
                <img
                  className="img-fluid img-rounded"
                  src={gifAtualizarSenha}
                  alt="GIF Atualizar senha"
                />
              </div>
            </div>
            <div className="row mx-3 mt-3">
              <div className="col">
                <h1 className="h2 font-weight-bold">Excluir conta</h1>
                <p className="text-justify">
                  Após realizar o Login é possível excluir sua conta (ao excluir
                  sua conta os casos cadastrados também serão excluídos
                  automaticamente):
                </p>
              </div>
            </div>
            <div className="row mx-3">
              <div className="col">
                <img
                  className="img-fluid img-rounded"
                  src={gifExcluirConta}
                  alt="GIF Excluir conta"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
