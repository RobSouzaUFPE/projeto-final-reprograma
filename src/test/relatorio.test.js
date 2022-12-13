const request = require('supertest');
const app = require('../app');

let elementId;
let  token;

describe ("Teste de API - Relatórios", () => {
    test("Rota Get - Listar todos os relatórios", (done) => {
        request(app)
            .get("/clinica/relatorio/all")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body.lenght).not.toBe(0);
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            })
     }, 10000);
});

/*
test('Listar relatório pelo id', (done) => {
    request(app)
        .get(`/clinica/relatorio/${elementId}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {    
            expect(res.body.relatorioModel.id).not.toBe(0)
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        }, 10000);
   });
*/

test("Encontrar relatório por ID", (done) => {
    request(app)
    .get(`/clinica/relatorio/${elementId}`)
    .expect(200)
    .expect(res => {
        expect(res.body._id).toEqual({
            profissionalId: "63979f40cb06baa36631da52",
            pacienteId: "63913ea9146e53f73932e7a3",
            finalidade_atendimento:"Educação fundamental.",
            relator:"Fulana",
            metodos:[],
            materiais:[],
            descricao: "O trabalho bla bla bla fo bla bla bla.",
            resultados: "O trabalho bla bla bla foi bla bla bla."
        })
        .end((err,res) => {
            if (err) return done (err);
            return done();
        })
      });
   }, 10000);
   

test("Rota Get - Listar relatório por nome da criança", (done) => {
    request(app)
        .get("/clinica/relatorio/nome?nome_crianca=")
        .expect(200)
        .expect((res) => {
            expect(res.body.nome_crianca).not.toBe(0);
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        })
 });

test("Rota post - Adicionar novo relatório", (done) => {
    request(app)
        .post("/clinica/relatorio/add")
        .send({
            profissionalId: "6397dd6772879862b5221244",
            pacienteId: "63913ea9146e53f73932e7a3",
            finalidade_atendimento:"Educação Infantil",
            relator:"Fulana",
            metodos:["o o CONFIAS ","Outros"],
            materiais:["asgdsahgdtgirepytir5605 teste teste teste teste teste.", "livros", "pintura"],
            descricao: "O trabalho bla bla bla fo bla bla bla.",
            resultados: "O trabalho bla bla bla foi bla bla bla."
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err,res) => {
            if (err) return done(err);
            return done();
        });
    });
    

describe("Delete - Deletar relatório do banco de dados:", () => {
    test("/clinica/profissional/delete/", (done) =>{
    request(app)
        .delete(`/clinica/relatorio/delete/${elementId}`)
        .expect((res) =>{
           expect(res.body.message).toBe(`Relatório foi deletado com sucesso.`)
        })
        .expect(200)
        .end((err,res) =>{
            if(err) return done(err)
            return done()
        });
    });
});

    