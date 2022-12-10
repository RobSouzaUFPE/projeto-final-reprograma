const  pacientes = require("../models/pacienteModel");
const  SECRET = process.env.SECRET
const  jwt = require("jsonwebtoken");
const  bcrypt = require("bcrypt");


const findAllPacientes = async (req, res) => {
  const authHeader = req.get (`Authorization`);
  const token = authHeader.split(' ')[1];
  if(!token){
    return res.status(400).send("Você precisa de uma autorização para acessar a lista de pacientes.");
  }
  const err = jwt.verify(token,SECRET,function(error){
    if(error) return error 
  })  
  if (err) return res.status(400).send("Não autorizado.")
    console.log(req.url);
    pacientes.find(function (err, pacientes){
      res.status(200).send(pacientes);
  });
};

const postPaciente = async (req, res) => {
  pacientes.findOne({nome_crianca: req.body.nome_crianca}, async function(error, paciente) {
    if(paciente) {
      return res.status(409).send(`O nome ${req.body.nome_crianca} já consta em nossa banco de dados.`);
    }
    pacientes.findOne({responsaveis: req.body.responsaveis }, async function(error, paciente) {
    if(paciente) {
      return res.status(409).send(`Os responséveis: ${req.body.responsaveis} já constam em nosso banco de dados.`);
    }
    const senhaComHash = bcrypt.hashSync(req.body.senha, 10);
    req.body.senha = senhaComHash;  
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
      res.status(201).json({message: "Paciente incluído(a) com sucesso!", savedPaciente});
      }catch (error){        
      console.log(error);
      res.status(500).json({ message: error.message});
    };
  });
 });
};

  const login = async (req,res) => {
    pacientes.findOne({ nome_crianca: req.body.nome_crianca }, async function(error, paciente) {
      if(!paciente) {
          return res.status(401).send(`Não localizamos o nome ${req.body.nome_crianca}`);
        }  
        const senhaValida = await bcrypt.compareSync(req.body.senha, paciente.senha);  
        if(!senhaValida) {
          return res.status(401).send(`A  senha informada está incorreta.`)
        }  
        const token = jwt.sign({nome_crianca: req.body.nome_crianca}, SECRET);
          return res.status(200).send(token)
      })
    }  
 
const findPacienteNome = async (req, res) => { 
  try {                       
    const filtroNome = await pacientes.findOne({nome_crianca:req.query.nome_crianca});
      if(!filtroNome){
        return res.status(400).json({message:`O nome ${req.query.nome_crianca} não foi encontrado em nosso banco de dados.`});
      };      
    res.status(200).json(filtroNome);
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message})
    };
  };  

const findPacienteById = async (req, res) => {
    try {
        const findPacId = await pacientes.findById(req.params.id);
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
        const message = `Profissional com nome ${deleteDadosPaciente.nome_crianca} teve seus dados deletados.` ;
        res.status(200).json({message});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});

    };
};

module.exports = {
    findAllPacientes,
    postPaciente,
    login,
    findPacienteNome,
    findPacienteById,
    updateCadPaciente,
    deleteDadosPaciente,
}