import React from 'react';
import './Tutorial.css'; // Certifique-se de criar o CSS conforme o estilo desejado

const Tutorial = () => {
  return (
    <section className="tutorial-section">
      <div className="tutorial-intro">
        <h1>Bem-vindo ao Tutorial de Uso da Aplicação!</h1>
        <p>Descubra como aproveitar ao máximo nossa aplicação com este guia passo a passo. Navegue pelas abas e explore as funcionalidades principais para gerenciar documentos de maneira eficiente.</p>
      </div>

      <div className="tutorial-content">
        <div className="tutorial-step">
          
          <div className="tutorial-text">
            <h2>Aba Criação</h2>
            <p><strong>Objetivo:</strong> Inicie o processo de criação de novos documentos no banco de dados em nuvem.</p>
            <p><strong>Como Usar:</strong></p>
            <ul>
              <li>Acesse a aba <strong>Criação</strong>.</li>
              <li>Preencha os campos obrigatórios como Título, Autores, Editores, etc.</li>
              <li>Clique em <strong>Criar Documento</strong> para salvar o novo documento na nuvem.</li>
            </ul>
            <p><strong>Dica:</strong> Certifique-se de preencher todos os campos necessários antes de salvar para garantir que o documento seja criado corretamente.</p>
          </div>
        </div>

        <div className="tutorial-step">
          
          <div className="tutorial-text">
            <h2>Aba Autenticação</h2>
            <p><strong>Objetivo:</strong> Acesse e autentique documentos na nuvem, definindo os valores dos campos como verdadeiro ou falso. Também possibilita a adição de novos campos.</p>
            <p><strong>Como Usar:</strong></p>
            <ul>
              <li>Navegue até a aba <strong>Autenticação</strong>.</li>
              <li>Selecione o documento que deseja autenticar.</li>
              <li>Defina os valores dos campos como verdadeiro ou falso.</li>
              <li>Adicione novos campos, se necessário, para criar regras de negócio que devem ser cumpridas para a validação do documento.</li>
              <li>Clique em <strong>Salvar no Firestore</strong> para atualizar o status de autenticação do documento e as novas regras de negócio.</li>
            </ul>
            <p><strong>Dica:</strong> Use a funcionalidade de adicionar novos campos para personalizar a validação de documentos conforme suas necessidades específicas.</p>
          </div>
        </div>

        <div className="tutorial-step">
          
          <div className="tutorial-text">
            <h2>Aba Histórico</h2>
            <p><strong>Objetivo:</strong> Visualize o histórico de criação e modificação de um documento.</p>
            <p><strong>Como Usar:</strong></p>
            <ul>
              <li>Vá para a aba <strong>Histórico</strong>.</li>
              <li>Selecione o documento cujo histórico deseja consultar.</li>
              <li>Visualize todas as entradas de criação e modificação associadas ao documento selecionado.</li>
            </ul>
            <p><strong>Dica:</strong> Use o histórico para revisar as alterações feitas ao documento ao longo do tempo e identificar quem fez as modificações.</p>
          </div>
        </div>

        <div className="tutorial-step">
          
          <div className="tutorial-text">
            <h2>Aba Versões</h2>
            <p><strong>Objetivo:</strong> Liste todas as versões com autenticação completa dos campos de um documento.</p>
            <p><strong>Como Usar:</strong></p>
            <ul>
              <li>Acesse a aba <strong>Versões</strong>.</li>
              <li>Selecione o documento para visualizar suas versões.</li>
              <li>Todos os registros resgatados já possuem autenticação completa dos campos.</li>
            </ul>
            <p><strong>Dica:</strong> Compare as versões para entender a evolução do documento ao longo do tempo.</p>
          </div>
        </div>

        <div className="tutorial-step">
        
          <div className="tutorial-text">
            <h2>Aba Blockchain</h2>
            <p><strong>Objetivo:</strong> Resgate itens da rede Hyperledger Fabric e edite os campos dos documentos.</p>
            <p><strong>Como Usar:</strong></p>
            <ul>
              <li>Navegue até a aba <strong>Blockchain</strong>.</li>
              <li>Visualize os itens resgatados da rede Hyperledger Fabric.</li>
              <li>Para editar um documento, clique sobre ele para abrir o formulário de edição.</li>
              <li>Atualize os campos conforme necessário e clique em <strong>Salvar Alterações</strong>.</li>
            </ul>
            <p><strong>Dica:</strong> Use a aba Blockchain para interagir com a rede Hyperledger Fabric e manter seus documentos atualizados.</p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Tutorial;
