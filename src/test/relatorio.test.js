const request = require('supertest');
const app = require('../app');

let elementId;

/*describe ("Teste de API - Relatórios", () => {
    test("Rota Get - Listar todos os relatórios", (done) => {
        request(app)
            .get("/clinica/relatorio/all")
            .expect(200)
            .expect((res) => {
                expect(res.body.lenght).not.toBe(0);//
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            })
     });
});
*/

test('Listar relatório pelo id', (done) => {
    request(app)
        .get("/clinica/relatorio/id")
        .expect(200)
        .expect((res) => {    
            expect(findRelatorio).not.toBe(0)
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        }, 10000);
   });
/*
test(`Rota Get /gamestore/gamesproj/_id`, (done) => {
    request(app)
        .get("/gamestore/gamesproj/_id")
        .expect(500)
        .expect((res) => {
            expect(res.body.id).not.toBe(0);;
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        }, 10000);
 });
*/

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
        .expect(200)
        .send({
            profissionalId: "_id",
            nome_crianca: "Juliana Cristina",
            responsavel:"Maria",
            finalidade_atendimento:"Educação fundamental.",
            relator:"Fulana",
            metodos:["o o CONFIAS ","Outros"],
            materiais:["asgdsahgdtgirepytir5605 teste teste teste teste teste.", "livros", "pintura"],
            descricao: "O trabalho bla bla bla fo bla bla bla.",
            resultados: "O trabalho bla bla bla foi bla bla bla."
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    


test("Rota Delete - Deletar relatório do banco de dados.", (done) =>{
    request(app)
        .delete(`/clinica/relatorio/delete/${id}`)
        .expect(200)        
        .expect((res) =>{
            console.log(res.body);
            expect(res.body.message).toBe(`Relatório com id ${id} foi deletado com sucesso.`)
            })
            .end((err,res) =>{
                if(err) return done(err)
                return done()
        });
    });

    