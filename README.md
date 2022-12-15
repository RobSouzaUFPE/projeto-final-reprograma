![pexels-vlada-karpovich-7031300](https://user-images.githubusercontent.com/101438321/207749137-3c7ce7f0-ef33-49e6-91fa-ae977223a459.jpg)

# PROJETO FINAL 

<h1 align="center">Turma Online 19 - Todas em Tech | Back-end | 2022 | ROBERTA SOUZA</h1>

## Sumário:

- [Contato que educa](#contato-que-educa)
    - [O que é](#solução)
    - [Como funciona](#funcionamento)
    - [Quem pode usar a solução](#quem-pode-usar-solução)
  - [Documentação](#documentação)
    - [Ferramentas utilizadas neste projeto](#ferramentas-utilizadas-neste-projeto)
    - [Outras dependências](#outras-dependências)
  - [Arquitetura](#arquitetura)
  - [Rotas utilizadas](#rotas-utilizadas)
    - [Material da aula](#material-da-aula)
    - [Glossário](#glossário)
    - [Links Úteis](#links-úteis)
    - - [Métodos HTTP: GET + POST](#métodos-http-get--post)
  - [Esse curso seguirá a convenção de comunicação API RESTful]
    - 

# Contato que educa:

## O que é:
É um projeto que surguiu como uma demanda por um repositório para armazenamento e consulta de informações construídas a partir da interação entre os profissionais: psicopedagogos, psicológos, fisioterapeutas e pedagogos e crianças em uma clínica que presta o serviço terapia para as mesmas.
## Como funciona?
A princípio deve ser criado o perfil com dados dos pacientes e dos professores, com o elemento ID para cada um deles, a partir dessas informações é criado o relatório, tudo isso será armazenado no MongoDB.
## Quem poderá usar esta solução?
Como a dificuldade, ou problemática enfrentada pela Clínica é o de armazenar com segurança as informações dos atendimentos e também acessar os relatórios a fim de avaliar o desenvolvimento das crianças atendidas, está solução poderá ser usada pelo gestor e pelos profissionais que prestam o serviço terapeútico. A aplicação pode ser usada em ambientes web, onde requisições poderão ser realizadas tanto por usuários (clientes) quanto outros sistemas. 
# Documentação

Para visualizar a documentação do projeto segue endereço do [swagger](https://swagger.io/) que foi utilizado para este fim:

```bash
http://localhost:3030/rota-de-documentacao-clinica/
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

## Outras dependências:

| Ferramenta | Descrição |
| --- | --- |
| `swagger` | Ferramenta que permite documementar a API |
| `eslint` | ferramenta de análise de código estático para identificar padrões problemáticos encontrados no código JavaScript |
| `bcrypt` | Método de criptografia do tipo hash para senhas baseado no Blowfish|
| `cors` | Cross-Origin Resource Sharing, para o compartilhamento de recursos com origens diferentes |
| `jsonwebtoken` | JSON Web Token é um padrão da indústria definido pela RFC7519 que tem como objetivo transmitir ou armazenar de forma compacta e segura objetos JSON |
| `secret` | chave secreta para autenticação |
| `jest` | Jest é um framework de teste unitário de código aberto em JavaScript criado pelo Facebook a partir do framework Jasmine. |
| `supertest` | Biblioteca permite criar simulações de requisições HTTP. |
| `insomnia` | framework Open Source para desenvolvimento/teste de API Clients. |

## Arquitetura:

   Este projeto utiliza como arquitetura o padrão MVC, Model-view-controller (MVC), já que facilita o entendimento e desenvolvimento de código. Apenas a camada View, ainda não foi implantada para uma arquitetura completa. A pasta SRC armazena todas as pastas com os códigos responsáveis por cada ação da solução proposta, a pasta controllers armazena o controle da aplicação, a pasta model armazena os modelos utilizados em nosso banco de dados, a pasta routes armazena os arquivos com as rotas, utilizadas nas requisições http. Alguns arquivos estão na pasta principal do projeto os principais são o app.js responsável pela aplicação em sim, nele encontram todas as dependências e também o arvivo server.js que traz a comunicação entre o app e o servidor.
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

## Rotas utilizadas:

As sequintes médotos fazem parte do projeto e foram testadas no insomnia.
### Get

O método Get foi utilizado para as requisições onde foram consultados dados sobre os profissionais, os pacientes e a lista de relatórios.

Por exemplo:
Utilizando o método GET para listar os profissionais que já estão cadastrados no banco de dados da clínica, temos a seguinte resposta em forma de dados:

```javascript
  {
	"message": "Profissional incluído com sucesso!",
	"savedProfissional": {
		"nome": "Carlos Eduardo",
		"email": "teste17@gmail.com",
		"senha": "$2b$10$mFEtUo0DsgZY1WeJwvBgvOjDfLBH7WmdnmDRtcY7nZNgFazxvXlxy",
		"funcao": "Fisioterapeuta",
		"horario_atendimento": [
			"tarde",
			"manhã"
		],
		"data_entrada": "2022",
		"_id": "639b5d1ce337881db2e822c2"
	  }
  }
```
### Post

O método Post foi utilizado para inserir dados no banco de dados sobre os profissionais, os pacientes e a inclusão de informações no relatório.

Por exemplo:
Utilizando o método Post para a criação de cadastro de pacientes, temos a seguinte resposta em forma de dados:

```javascript
  {
	"message": "Paciente incluído(a) com sucesso!",
	"savedPaciente": {
		"nome_crianca": "Juliana Maria Fictícia",
		"senha": "$2b$10$j8rDtlFxnBivRR9NAVNspuAl3Yce5G8kXGDmwlC664Z.lafDu7uq2",
		"idade": "10 anos",
		"responsaveis": [
			"Maria Cristina",
			"Pai: Marcos"
		],
		"restricoes": "Criança não gosta de certos tipos de texturas.",
		"alergias": [
			"Chocolate"
		],
		"data_entrada": 2022,
		"_id": "639b5e5be337881db2e822c9"
	}
}
```
### Put

O método Put foi utilizado para atualizar os dados no banco de dados sobre os profissionais, os pacientes e a inclusão de novas informações nos relatórios, para as requisições com este métodos o usuário precisa informar o id antes de fazer a alteração.

Por exemplo:
Utilizando o método Put para alterar criação de cadastro de pacientes, para inserir um tipo de alergia, por exemplo e outros aspectos, temos a seguinte resposta em forma de dados:

```javascript
  {
	"message": "Cadastro alterado com sucesso.",
	"updateCadPaciente": {
		"_id": "63914155d72dd29e7119bcd5",
		"nome_crianca": "Clara da Silva",
	  "idade": "08 anos",
		"responsaveis": [
			"mãe: Tereza",
			"Pai: Marcos"
		],
		"restricoes": "Criança não gosta de certos tipos de texturas.",
		"alergias": [
			"Poeira"
		],
		"data_entrada": 2022
	}
}
```
### Delete

O método Post foi utilizado para inserir dados no banco de dados sobre os profissionais, os pacientes e a inclusão de informações no relatório. Para as requisições com este métodos o usuário precisa informar o id antes de fazer a alteração. Deve ser implementado posteriormente uma etapa de autenticação.

Por exemplo:
Utilizando o método Delete para a exclusão dos dados cadastrais de um profissional, temos a seguinte resposta:

```javascript
{
	"message": "Dados do profissional deletado com sucesso."
}
```
![readme (1)](https://user-images.githubusercontent.com/101438321/207942408-eecea577-09e8-42b5-b49a-35e8403f4060.png)

```
## Contribuições:

Solicitações pull são bem-vindas. Para mudanças importantes, abra um problema primeiro para discutir o que você gostaria de mudar.

## License

[ISC](https://opensource.org/licenses/ISC)

## Referências:

```
Links úteis:

# MongoDb
[mongodb](https://docs.mongobd.com/)

# MongoDb
[mongodb](https://docs.mongobd.com/manual/crud/)

# MongoDb Atlas
[mongodb](https://docs.atlas.mongodb.com/)

# Insomnia
[mongodb](https://insomnia.rest/)

```