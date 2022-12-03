const request = require('supertest');
const app = require('../app');


let elementId;

describe("Teste de API - Console", () => {
    test("Rota Get - /clinica/profissional/all", (done) => {
        request(app)
            .get("/clinica/profissional/all")
            .expect(200)
            .expect((res) => {
                expect(res.body.lenght).not.toBe(0);
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            })
     });
});

test("Rota Get - clinica/profissional/id", (done) => {
    request(app)
        .get(`clinica/profissional/id`)
        .expect(500)
        .expect((res) => {
            expect(res.body.id).not.toBe(0);
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
 });

test("Rota Get - Listar por developer", (done) => {
    request(app)
        .get("/clinica/profissional/funcao?funcao=")
        .expect(200)
        .expect((res) => {
            expect(res.body.funcao).not.toBe(0);
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        })
 });

 test("Rota Post - /clinica/profissional/add ", (done) =>{
    request(app)
        .post("/clinica/profissional/add")
        .expect ("Content-Type", /json/)
        .send({
            nome:"Teste 11",
            email:"teste_11@gmail.com",
            senha: "teste 11",
            funcao:"Professora",
	        horario_atendimento:["manhã"],
            data_entrada: 2021
        })
        .expect(500)
        .end((err, res) =>{
            if(err) return done(err);
            elementId = res.body.id;
            return done();
        }, 10000);
});
 
/*
test("Rota Post: /gamestore/consoleproj/add", (done) =>{
    request(app)
        .post("/gamestore/consoleproj/add")
        .expect(200)
        .send({
            name:"Teste 2",
            developer:"Sony",
            releaseDate:2020,
            display: ["1080p"],
            storageCapacities:["16 GB DDR3"],
            numberOfPlayers:["1","2"],
            available:true,
            description:"O Xbox One apresenta jogos com gráficos de alta definição superiores aos vistos no seu antecessor."
        })
        .expect(404)
            .end((err, res) =>{
                if(err) return done(err);
                elementId = res.body.id;
                return done();
            })
    });
*/
 
test("Rota Delete - /clinica/profissional/delete/delete?id=", (done) =>{
    request(app)
        .delete(`/clinica/profissional/delete/delete?id=${elementId}`)
        .expect(200)
        .expect((res) =>{
            console.log(res.body);
            expect(res.body.message).toBe(`Cadastro excluído com sucesso.`)
        })
        .end((err,res) =>{
            if(err) return done(err)
            return done()
        });
    });
