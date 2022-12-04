const  pacientes = require("../models/pacienteModel");
const  SECRET = process.env.SECRET
const  jwt = require("jsonwebtoken");
const  bcrypt = require("bcrypt");


const findAllPacientes = async (req, res) => {
  const authHeader = req.get (`authorization`);
  const token = authHeader.split(' ')[1];
  if(!token){
    return res.status(401).send("Você precisa de uma autorização para acessar a lista de pacientes.");
  }
  const err = jwt.verify(token,SECRET,function(error){
    if(error) return error 
  })  
  if (err) return res.status(401).send("Não autorizado.")
    console.log(req.url);
    pacientes.find(function (err, pacientes){
      res.status(200).send(pacientes);
  });
};

const postPaciente = (req, res) => {
    const senhaComHash = bcrypt.hashSync(req.body.senha, 10);
    req.body.senha = senhaComHash;  
    console.log(req.body);
    const paciente = new pacientes(req.body);
  
    paciente.save(function (err) {
      if (err) {
        return res.status(500)
      }
      res.status(201).send(paciente.toJSON());
    });
  };

const login = (req,res) => {
    pacientes.findOne({nome_crianca: req.body.nome_crianca }, function(error, paciente) {
      if(!paciente) {
        return res.status(404).send(`Não localizamos o paciente com nome ${req.body.nome_crianca}`);
      }
  
      const senhaValida = bcrypt.compareSync(req.body.senha, paciente.senha);
  
      if(!senhaValida) {
        return res.status(403).send(`Esta senha está incorreta.`)
      }  
      const token = jwt.sign({nome_crianca: req.body.nome_crianca }, SECRET);
        return res.status(200).send(token)
    })
  }  
 
const findPacienteNome = async (req, res) => { 
    try {                       
        const filtroNome = await pacientes.find({nome:req.query.nome_crianca});
        res.status(200).json(filtroNome);
        }catch(error){
        console.log(error);
        res.status(500).json({message: error.message})
    };
  };  

const findPacienteById = async (req, res) => {
    try {
        const findPacId = await pessoais.findById(req.params.id);
        if(!findPacId ){
           res.status(404).json({message:'Id não encontrado.'});
           return
        }        
        res.status(200).json(findPacId);
    }catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    };
};

const addNovoPaciente = async (req, res) => {
    try {
        const{
            nome_crianca,
            senha,
            idade,
            responsaveis,
            restricoes,
            alergias,
            data_entrada,
        } = req.body;
        const newPaciente = new pacientes({
            nome_crianca,
            senha,
            idade,
            responsaveis,
            restricoes,
            alergias,
            data_entrada,
        });
        const savedPaciente = await newPaciente.save();
        res.status(200).json({ message: "Novo colaborador inserido com sucesso.", savedPaciente});
    }catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    };
};

const updateCadPaciente = async (req, res) => {
    try {
        const {
            nome_crianca,
            senha,
            idade,
            responsaveis,
            restricoes,
            alergias,
            data_entrada,
        } = req.body;
        const updateCadPaciente = await pacientes.findByIdAndUpdate(req.params.id, {
            nome_crianca,
            senha,
            idade,
            responsaveis,
            restricoes,
            alergias,
            data_entrada,
        });
        res.status(200).json({ message: "Cadastro alterado com sucesso.", updateCadPaciente});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    };
};

const deleteDadosPaciente = async (req, res) => {
    try {
        const{id} = req.params;
        const deleteDadosPaciente = await pacientes.findOneAndDelete(id);
        const message = `Profissional com nome ${deleteDadosPaciente.nome} teve seus dados deletados.` ;
        res.status(200).json({message});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});

    };
};

module.exports = {
    findAllPacientes,
    postPaciente,
    addNovoPaciente,
    login,
    findPacienteNome,
    findPacienteById,
    updateCadPaciente,
    deleteDadosPaciente,
}