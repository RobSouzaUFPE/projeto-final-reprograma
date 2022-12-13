const request = require('supertest');
const app = require('../app');


let elementId;
let token;

describe("Teste de API - Dados profissionais", () => {
    test("Rota Get - /clinica/profissional/all", (done) => {
        request(app)
            .get("/clinica/profissional/all")
            .set("Authorization", token)
            .expect(200)
            .expect((res) => {
                expect(res.body).toBe(0);
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            })
     }, 10000);
});

test("Rota Get - clinica/profissional/id", (done) => {
    request(app)
        .get(`clinica/profissional/${elementId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toEqual({
                nome:"Teste 11",
                email:"teste_11@gmail.com",
                senha: "teste 11",
                funcao:"Professora",
                horario_atendimento:["manhã"],
                data_entrada: 2021
            });
        })
        .end((err, res) =>{
            return done();
        }, 10000);
    });


test("Rota Get - Listar por função", (done) => {
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
        .send({
            nome:"Teste 11",
            email:"teste_11@gmail.com",
            senha: "teste 11",
            funcao:"Professora",
	        horario_atendimento:["manhã"],
            data_entrada: 2021
        })
        .expect(201)
        .expect ("Content-Type", /json/)
        .end((err, res) =>{
            elementId = res.body._id;
            return done();
        });
   }, 20000);
   

describe("Login ", () => {
    test("Login - /clinica/profissional/login", (done) => {
        request(app)
        .post(`/clinica/profissional/login`)
        .send({
            email: "teste9@gmail.com",
            senha: "1234"
        })
        .expect(200)       
        .end((err,res) => {
            token += res.body.token;
            if (err) return done(err);
            return done();
        }, 10000);
    });
});


describe("Create Error Post", () => {
    test("Rota Criar - /clinica/profissional/- nome repetido", (done) =>{
        request(app)
        .post(`/clinica/profissional/add`)
        .send({
            nome: "nome",
            email: "email",
            senha: "teste 11",
            funcao:"Professora",
	        horario_atendimento:["manhã"],
            data_entrada: 2021
        })
        .expect(404)
        .expect("Content-Type", /json/)
        .expect(res => {
            expect(res.body.msg).toBe(`O nome ${nome} já consta em nossa banco de dados.`)
        })
        .end((err,res) => {
            elementId = res.body._id;
            if (err) return done (err);
            return done();
        })
    });
});

test("Rota Delete - /clinica/profissional/delete/delete?id=", (done) =>{
    request(app)
        .delete(`/clinica/profissional/delete/delete?id=${elementId}`)
        .expect(200)
        .expect((res) =>{
            expect(res.body.message).toBe(`Cadastro deletado com sucesso.`)
        })
        .end((err,res) =>{
            if(err) return done(err)
            return done()
        });
    });
