<h1 align="center">
  <img src="./images/Logo.pgn" alt="Logo" width="500">
</h1>

# PROJETO FINAL 

Turma Online 19 - Todas em Tech | Back-end | 2022 | ROBERTA SOUZA



# Contato que educa

Um repositório para armazenamento de informações construídas a partir da interação entre os profissionais: psicopedagogos, psicológos, fisioterapeutas e pedagogos.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```

## Ferramentas utilizadas neste projeto:

| Ferramenta | Descrição |
| --- | --- |
| `javascript` | Linguagem de programação |
| `nodejs` | Ambiente de execução do javascript|
| `express` | Framework NodeJS |
| `dotenv` | Dependência para proteger dados sensíveis do projeto|
| `mongoose` | Dependência que interage com o MongoDB para a conexão da database, criação do model e das collections|
| `nodemon` | Dependência que observa as atualizações realizadas nos documentos para rodar o servidor automaticamente|
| `npm` | Gerenciador de pacotes|
| `MongoDb` | Banco de dado não relacional orietado a documentos|
| `MongoDb Compass ou Mongo Atlas` | Interface gráfica para verificar se os dados foram persistidos|
 <br>

## Arquitetura:
 ````  
   📁 projeto-final-reprograma
   |  
   |-  📁 src    
   |    |
   |    |- 📁 database  
   |         |- 📄 dbConnectprojfinal.js  
   |
   |    |- 📁 controllers  
   |         |- 📄 pacienteController.js  
   |         |- 📄 profController.js  
   |         |- 📄 relatorioController.js
   |  
   |    |- 📁 models  
   |         |- 📄 pacienteModel.js  
   |         |- 📄 profModel.js 
   |         |- 📄 relatorioModel.js 
   |  
   |    |- 📁 routes  
   |         |- 📄 index.js   
   |         |- 📄 pacienteRoutes.js 
   |         |- 📄 profRoutes.js   
   |         |- 📄 relatorioRoutes.js     
   |    |- 📄 app.js
   |    |- 📄 test.js
   |-   |- 📁 swagger 
   |         |- 📄 swagger_output.json
   |- 📄 .env
   |- 📄 .env.example
   |- 📄 .eslintrc.json 
   |- 📄 .gitignore  
   |- 📄 package-lock.json  
   |- 📄 pakage.json  
   |- 📄 README.md  
   |- 📄 server.js  
   |- 📄 swagger.js  
````
<br>

## Referências:

```
Links úteis:

# MongoDb
[mongodb](https://docs.mongobd.com/)

# MongoDb
[mongodb](https://docs.mongobd.com/manual/crud/)

# MongoDb Atlas
[mongodb](https://docs.atlas.mongodb.com/)

# MongoDb Atlas
[mongodb](https://docs.atlas.mongodb.com/)

```

## Contribuições:

Solicitações pull são bem-vindas. Para mudanças importantes, abra um problema primeiro para discutir o que você gostaria de mudar.

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Rotas utilizadas:

### Get

O método Get deve ser utilizado quando precisamos atualizar algum recurso através da nossa api, nesse caso, sua entidade precisará ser enviada integralmente e as vezes é usado até para criar um novo recurso.
Por exemplo:
Se eu quero atualizar os dados de um usuário no sistema, logo minha chamada PUT deve ir com TODOS os dados necessários, mesmo que eu não vá atualizar todos eles:

```javascript
  {
    "nome":"João Braga Santos",
    "idade": 27,
    "data_nascimento": "21/08/1990",
    "escolaridade":"superior incompleto"
  }
```
### Post

O método PUT deve ser utilizado quando precisamos atualizar algum recurso através da nossa api, nesse caso, sua entidade precisará ser enviada integralmente e as vezes é usado até para criar um novo recurso.
Por exemplo:
Se eu quero atualizar os dados de um usuário no sistema, logo minha chamada PUT deve ir com TODOS os dados necessários, mesmo que eu não vá atualizar todos eles:

```javascript
  {
    "nome":"João Braga Santos",
    "idade": 27,
    "data_nascimento": "21/08/1990",
    "escolaridade":"superior incompleto"
  }
```
