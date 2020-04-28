import React from "react";
import { Link } from "react-router-dom";

import imgLogo from "../../assets/images/logo.svg";

export default function useTerms() {
  return (
    <div className="container-fluid">
      <div className="row mt-3 no-gutters">
        <div className="col-sm-0">
          <Link to="/" className="btn btn-default icon-fa">
            &#xf060;
          </Link>
        </div>
        <div className="col mr-3">
          <div className="row">
            <div className="col ml-lg-3">
              {" "}
              <img
                src={imgLogo}
                alt="Logo"
                className="img-fluid"
                id="logo"
              />{" "}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col ml-lg-3">
              <h1 className="h1 font-weight-bold">Termos de Uso</h1>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col ml-lg-4">
              <p className="text-justify"> Licença MIT </p>
              <p className="text-justify">
                {" "}
                Direitos autorais 2020 Natan De Macedo Barbosa{" "}
              </p>
              <p className="text-justify">
                {" "}
                É concedida permissão, gratuitamente, a qualquer pessoa que
                obtenha uma cópia deste software e arquivos de documentação
                associados (o "Software"), para lidar no Software sem restrição,
                incluindo, sem limitação, os direitos usar, copiar, modificar,
                mesclar, publicar, distribuir, sublicenciar e/ou vender cópias
                do Software e permitir pessoas a quem o Software está fornecido
                para isso, sujeito às seguintes condições:{" "}
              </p>
              <p className="text-justify">
                {" "}
                O aviso de direitos autorais acima e este aviso de permissão
                devem ser incluídos em todos cópias ou partes substanciais do
                Software.{" "}
              </p>
              <p className="text-justify">
                {" "}
                O SOFTWARE É FORNECIDO "TAL COMO ESTÁ", SEM GARANTIA DE QUALQUER
                TIPO, EXPRESSA OU IMPLÍCITA, INCLUINDO MAS NÃO SE LIMITANDO A
                GARANTIAS DE COMERCIALIZAÇÃO, APTIDÃO PARA UM OBJETIVO
                ESPECÍFICO E NÃO INFRACÇÃO. EM NENHUM CASO A AUTORES OU
                TITULARES DE DIREITOS AUTORAIS SÃO RESPONSÁVEIS POR QUALQUER
                REIVINDICAÇÃO, DANOS OU OUTROS RESPONSABILIDADE, SEJA EM AÇÃO DE
                CONTRATO, TORT OU DE OUTRA FORMA, DECORRENTE DE, FORA OU EM
                CONEXÃO COM O SOFTWARE OU O USO OU OUTROS NEGÓCIOS NO PROGRAMAS.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col mr-3 ml-4 mt-0">
          <div className="row">
            <div className="col">
              {" "}
              <img
                src={imgLogo}
                alt="Hidden Logo"
                className="img-fluid invisible"
              />{" "}
            </div>
          </div>
          <div className="row mt-lg-4">
            <div className="col">
              <h1 className="h1 font-weight-bold">Terms of Use</h1>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <p className="text-justify"> MIT License </p>
              <p className="text-justify">
                {" "}
                Copyright 2020 Natan De Macedo Barbosa{" "}
              </p>
              <p className="text-justify">
                {" "}
                Permission is hereby granted, free of charge, to any person
                obtaining a copy of this software and associated documentation
                files (the "Software"), to deal in the Software without
                restriction, including without limitation the rights to use,
                copy, modify, merge, publish, distribute, sublicense, and/or
                sell copies of the Software, and to permit persons to whom the
                Software is furnished to do so, subject to the following
                conditions:{" "}
              </p>
              <p className="text-justify">
                {" "}
                The above copyright notice and this permission notice shall be
                included in all copies or substantial portions of the Software.{" "}
              </p>
              <p className="text-justify">
                {" "}
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
                OTHER DEALINGS IN THE SOFTWARE.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
