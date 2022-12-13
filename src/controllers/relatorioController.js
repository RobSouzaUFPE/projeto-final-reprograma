const profModel = require("../models/profModel");
const pacientes = require("../models/pacienteModel")
const relatorioModel = require("../models/relatorioModel");

const findAllRelatorios = async (req, res) => {
    try {
      const allRelatorios = await relatorioModel.find().populate("profissional");
      res.status(200).send(allRelatorios);
    }catch(error){
      res.status(500).json({message: error.message});
    };
  };

const findNomeAtendimento = async (req, res) => {    
    try {                       
        const filtroNome = await relatorioModel.find({nome_crianca:req.query.nome_crianca});
        if(!filtroNome){
          res.status(404).json({message:'Nome informado, não foi encontrado.'});
          return 
        }
        res.status(200).json(filtroNome);
        }catch(error){
        console.log(error);
        res.status(400).json({message: error.message})};
  };
  
const findRelatorioById = async (req, res) => {
    try {
      const findRelatorio = await relatorioModel.findById(req.params.id).populate("profissional");
      if(findRelatorio == null) {
        res.status(404).json({message: `Relatório com id", ${findRelatorio}, "não encontrado.`});
      }
      res.status(200).json(findRelatorio);
      }catch(error){
      res.status(500).json({message: error.message});
    };
  };

const addNewRelatorio = async (req, res) => {
    try {
      const {
        profissionalId,
        pacienteId,
        finalidade_atendimento,
        relator,
        metodos,
        materiais,
        descricao,
        resultados,
      } = req.body;  
      if (!profissionalId) {
        return res
          .status(400)
          .json({ message: "Required: Informe o id do profissional." });
      };
      if (!pacienteId) {
        return res
          .status(400)
          .json({ message: "Required: Informe o id do paciente" });
      };
  
      const findProfissional = await profModel.findById(profissionalId);
  
      if (!findProfissional) {
        return res.status(404).json({ message: "Profissional não encontrado(a)." });
      };
  
      const findPaciente = await pacientes.findById(pacienteId);
  
      if (!findPaciente) {
        return res.status(404).json({ message: "Paciente não encontrado(a)." });
      };

      const newRelatorio = new relatorioModel({
        profissional: profissionalId,
        paciente: pacienteId,
        finalidade_atendimento,
        relator,
        metodos,
        materiais,
        descricao,
        resultados,
      });
      
      const savedRelatorio = await newRelatorio.save();
      res
        .status(200)
        .json({message: "Relatório incluído com sucesso!", savedRelatorio});
     }catch (error){
      console.log(error);
      res.status(500).json({ message: error.message});
    };
  };
  
const updateRelatorio = async (req, res) => {
    try {
      const {id} = req.params;
      const {
        profissionalId,
        pacienteId,
        finalidade_atendimento,
        relator,
        metodos,
        materiais,
        descricao,
        resultados,
      } = req.body;
      const findRelatorio = await profModel.findById(id);
      if(findRelatorio == null) {
        res.status(404).json({message: "Relatório não encontrado"});
      };

      if(profissionalId) {
        const findProfissional = await profModel.findById(profissionalId);  
          if(findProfissional == null) {
              return res.status(404).json({ message: "Profissional não encontrado."});
        };
      };
      findRelatorio.finalidade_atendimento = finalidade_atendimento || findRelatorio.finalidade_atendimento;
      findRelatorio.relator = relator || findRelatorio.relator;
      findRelatorio.metodos = metodos || findRelatorio.metodos;
      findRelatorio.materiais= materiais || findRelatorio.materiais;
      findRelatorio.descricao = descricao || findRelatorio.descricao;
      findRelatorio.resultados = resultados || findRelatorio.resultados;
  
      const savedRelatorio = await findRelatorio.save();
      res.status(200).json({message: "Relatório atualizado com sucesso", savedRelatorio 
    });
      }catch(error){
      res.status(500).json({message: error.message});
    };
  };

const deleteRelatorio = async (req, res) => {
    try {
      const {id} = req.params;
      const findRelatorios = await relatorioModel.findById(id);  
      if (!findRelatorios) {
           return res.status(404).json({message: `Relatório com ${id} não encontrado`})
          };
      await findRelatorios.remove();
           res.status(200).json({message: `Relatório foi com deletado com sucesso.`});
      }catch(error){
           res.status(500).json({message: error.message });
    };
  };

module.exports = {
    findAllRelatorios,
    findNomeAtendimento,
    findRelatorioById,
    addNewRelatorio,
    updateRelatorio,
    deleteRelatorio,
}