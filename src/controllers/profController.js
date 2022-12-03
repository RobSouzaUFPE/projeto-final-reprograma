const  profissionais = require("../models/profModel");
const  SECRET = process.env.SECRET
const  jwt = require("jsonwebtoken");
const  bcrypt = require("bcrypt");


const findAllProfissionais = async (req, res) => {
  const authHeader = req.get (`authorization`);
  const token = authHeader.split(' ')[1];
  //console.log(`Meu header:`, token);
  if(!token){
    return res.status(401).send("Você precisa de uma autorização.");
  }
  const err = jwt.verify(token,SECRET,function(error){
    if(error) return error 
  })  
  if (err) return res.status(401).send("não autorizado")
    console.log(req.url);
    profissionais.find(function (err, profissionais) {
      res.status(200).send(profissionais);
  });
};

const postProfissional = (req, res) => {
    const senhaComHash = bcrypt.hashSync(req.body.senha, 10);
    req.body.senha = senhaComHash;  
    console.log(req.body);
    const profissional = new profissionais(req.body);
  
    profissional.save(function (err) {
      if (err) {
        return res.status(500)
      }
      res.status(201).send(profissional.toJSON());
    });
  };

const login = (req,res) => {
    profissionais.findOne({ email: req.body.email }, function(error, profissional) {
      if(!profissional) {
        return res.status(404).send(`Não localizamos o email ${req.body.email}`);
      }
  
      const senhaValida = bcrypt.compareSync(req.body.senha, profissional.senha);
  
      if(!senhaValida) {
        return res.status(403).send(`Esta senha está incorreta.`)
      }
  
      const token = jwt.sign({ email: req.body.email }, SECRET);
        return res.status(200).send(token)
    })
  }  

const findFuncao = async (req, res) => {   
    try {                       
        const filtroFuncao = await profissionais.find({funcao:req.query.funcao});
        if(!filtroFuncao){
            res.status(404).json({message:'Profissional não encontrado.'});
            return 
        }
        res.status(200).json(filtroFuncao);
        }catch(error){
        console.log(error);
        res.status(500).json({message: error.message})
    };
  };  
  
const findProfissionalNome = async (req, res) => { 
    try {                       
        const filtroNome = await profissionais.find({nome:req.query.nome});
        res.status(200).json(filtroNome);
        }catch(error){
        console.log(error);
        res.status(500).json({message: error.message})
    };
  };  

const findProfById = async (req, res) => {
    try {
        const findProfId = await profissionais.findById(req.params.id);
        if(!findProfId){
           res.status(404).json({message:'Id não encontrado.'});
           return
        }        
        res.status(200).json(findProfId);
    }catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    };
};

const addNewProfissional = async (req, res) => {
    try {
        const{
          nome,
          email,
          senha,
          funcao,
          data_entrada,
        } = req.body;
        const newProfissional = new profModel({
          nome,
          email,
          senha,
          funcao,
          data_entrada,
        });
        const savedProfissional = await newProfissional.save();
        res.status(200).json({ message: "Novo colaborador inserido com sucesso.", savedProfissional});
    }catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    };
};

const updateCadProfissional = async (req, res) => {
    try {
        const {
            nome,
            email,
            senha,
            funcao,
            data_entrada,
        } = req.body;
        const updateCadProfissional = await profissionais.findByIdAndUpdate(req.params.id, {
            nome,
            email,
            senha,
            funcao,
            data_entrada,
        });
        res.status(200).json({ message: "Cadastro alterado com sucesso.", updateCadProfissional});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    };
};

const deleteDadosProfissional = async (req, res) => {
    try {
        const{id} = req.params;
        const deleteDadosProfissional = await profissionais.findOneAndDelete(id);
        const message = `Profissional com nome ${deleteDadosProfissional.nome} teve seus dados deletados.` ;
        res.status(200).json({message});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});

    };
};

module.exports = {
    findAllProfissionais,
    postProfissional,
    addNewProfissional,
    login,
    findFuncao,
    findProfissionalNome,
    findProfById,
    updateCadProfissional,
    deleteDadosProfissional,
}

