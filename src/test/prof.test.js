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
                expect(res.body.lenght).not.toBe(0);
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
            expect(res.body.profissionaisId).toEqual({
                nome:"Teste 11",
                email:"teste_11@gmail.com",
                senha: "teste 11",
                funcao:"Professora",
                horario_atendimento:["manhã"],
                data_entrada: 2021
            });
        })
        .end((err,res) => {
            if (err) return done(err);
            done();
        });
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
        .expect ("Content-Type", /json/)
        .expect(201)
        .end((err, res) =>{
            profissionaisId = res.body.id;
            return done();
        });
   }, 20000);
   

describe("Login ", () => {
    test("Login", (done) => {
        request(app)
        .get(`/clinica/profissional/login`)
        .send({
            email: "teste6@gmail.com",
            senha: "123456"
        })
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err,res) => {
            token += res.body.token;
            if (err) return done(err);
            return done();
        });
    });
});

describe("Create Error Login", () => {
    test("Rota Login - /clinica/profissional/add ", (done) =>{
     request(app)
         .get("/clinica/profissional/add")
         .send({
             nome:"Teste 11",
             email:"teste_11@gmail.com",
             senha: "teste 11",
             funcao:"Professora",
             horario_atendimento:["manhã"],
             data_entrada: 2021
         })
         .expect ("Content-Type", /json/)
         .expect(201)
         .end((err, res) =>{
             profissionaisId = res.body.id;
             return done();
         });
    });
 }, 10000);

describe("Create Errors", () => {
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
        .expect ("Content-Type", /json/)
        .expect(201)
        .end((err, res) =>{
            profissionaisId = res.body.id;
            return done();
        });
   });
}, 10000);

describe("Create Errors", () => {
    test("No nome, email, senha, funcao, horario_atendimento e data_entrada", (done) => {
        request(app)
        .post("/clinica/profissional/add")
        .expect(400)
        .expect("Content-Type", /json/)

        .expect((res) => {
            expect(res.body.profissionais).toEqual(["nome", "email", "senha", "funcao", "horario_atendimento","data-entrada"]);
        })
        .end((err,res) => {
            if (err) return done(err);
            return done();
        });
    }, 10000);
});
 

test("Rota Delete - /clinica/profissional/delete/delete?id=", (done) =>{
    request(app)
        .delete(`/clinica/profissional/delete/delete?id=${elementId}`)
        .expect(200)
        .expect((res) =>{
            console.log(res.body);
            expect(res.body.message).toBe(`Cadastro deletado com sucesso.`)
        })
        .end((err,res) =>{
            if(err) return done(err)
            return done()
        });
    });
