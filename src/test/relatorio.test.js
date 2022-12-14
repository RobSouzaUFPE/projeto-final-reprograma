const request = require('supertest');
const app = require('../app');

let elementId;
let pacienteId;
let  token;

test("Rota post - Adicionar novo relatório", (done) => {
         request(app)
        .post("/clinica/relatorio/add")
        .expect("Content-Type", /json/)
        .send({
            profissionalId: "elementId",
            pacienteId: "pacienteId",
            finalidade_atendimento:"Educação Infantil",
            relator:"Fulana",
            metodos:["o o CONFIAS ","Outros"],
            materiais:["asgdsahgdtgirepytir5605 teste teste teste teste teste.", "livros", "pintura"],
            descricao: "O trabalho bla bla bla fo bla bla bla.",
            resultados: "O trabalho bla bla bla foi bla bla bla."
        })
        .expect(201)
        .end((err,res) => {
            if (err) return done(err);
            elementId = res.body.profissionais._id;
            pacienteId = res.body.relatorioModel.Id
            return done();
        });
    });

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

describe("Teste de API - Listar relatórios por id:", () => {
    test(`/clinica/relatorio/${elementId}`, (done) => {
        request(app)
        .get(`/clinica/relatorio/${elementId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.id).not.toBe(0);
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
});
   

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


describe("Delete - Deletar relatório do banco de dados:", () => {
    test(`/clinica/relatorio/delete/${elementId}`, (done) =>{
        request(app)
        .delete(`/clinica/relatorio/delete/${elementId}`)
        .expect((res) => {
            expect(res.body.msg).toBe("Relatório foi com deletado com sucesso.");
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err)
            return done()
        })
    });
});

    