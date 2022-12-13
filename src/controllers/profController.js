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
    //console.log(req.url);
    profissionais.find(function (err, profissionais) {
      res.status(200).send(profissionais.sort());
  });
};

const postProfissional = async (req, res) => {
    profissionais.findOne({ nome: req.body.nome }, async function(error, profissional) {
    if(profissional) {
      return res.status(409).send(`O nome ${req.body.nome} já consta em nossa banco de dados.`);
    }
    profissionais.findOne({ email: req.body.email }, async function(error, profissional) {
    if(profissional) {
      return res.status(409).send(`O email ${req.body.email} já consta em nossa banco de dados.`);
    }

    const senhaComHash = bcrypt.hashSync(req.body.senha, 10);
    req.body.senha = senhaComHash;  
  
    try {
      const {
          nome,
          email,
          senha,
          funcao,
          horario_atendimento,
          data_entrada,
      } = req.body;  
      
      const newProfissional = new profissionais({
          nome,
          email,
          senha,
          funcao,
          horario_atendimento,
          data_entrada,
      }); 
               
    const savedProfissional = await newProfissional.save();
      res.status(201).json({message: "Profissional incluído com sucesso!", savedProfissional });
      }catch (error){        
      console.log(error);
      res.status(500).json({ message: error.message});
    };
  });
 });
};
         

const login = async (req,res) => {
    profissionais.findOne({ email: req.body.email }, async function(error, profissional) {
      if(!profissional) {
          return res.status(401).send(`Não localizamos o email ${req.body.email}`);
        }  
        const senhaValida = await bcrypt.compareSync(req.body.senha, profissional.senha);  
        if(!senhaValida) {
          return res.status(401).send(`Esta senha está incorreta.`)
        }  
        const token = jwt.sign({ email: req.body.email }, SECRET);
          return res.status(200).send(token)
      })
    }  

  const findFuncao = async (req, res) => {
    try {                       
      const filtroFuncao = await profissionais.find({funcao:req.query.funcao});
        if(!filtroFuncao){
          return res.status(400).json({message:`O nome ${req.query.funcao} não consta em nosso banco de dados.`});
        };
      res.status(200).json(filtroFuncao);
      }catch(error){
          console.log(error);
          res.status(500).json({message: error.message})
      };
  };  
  
    
const findProfissionalNome = async (req, res) => { 
    try {                       
    const filtroNome = await profissionais.findOne({nome:req.query.nome});
      if(!filtroNome){
        return res.status(400).json({message:`O nome ' ${req.query.nome} ' não foi encontrado em nosso banco de dados.`});
        };             
    res.status(200).json(filtroNome);
    } catch(error){
        console.log(error);
        res.status(500).json({message: error.message})
    };
  };  

  const findProfById = async (req, res) => {
    try {
      const {id} = req.params
      const findProfissional = await profissionais.findById(id);
        if (findProfissional == null) {
          return res.status(404).send({ message:`É necessário informar o ID.`})
        }            
      res.status(200).json(findProfissional);
        }catch (error) {
        res.status(500).json({ message: error.message })
      }
    }
     

//criação de rota para atualizar cadastro de profissionais
const updateCadProfissional = async (req, res) => {
  profissionais.find({ email: req.body.email }, async function(error, profissional) {
    if(!profissional) {
        return res.status(401).send(`Não localizamos o email ${req.body.email}`);
      } 
    profissionais.findOne({ senha: req.body.senha }, async function(error, senha) {
    if(!senha) {
        return res.status(401).send(`Senha não confere.`);
      }  
    const dataEntrada= moment().format('l')

      try {
        const {
            nome,
            email,
            senha,
            funcao,
            horario_atendimento,
            dataEntrada,
        } = req.body;
        const updateCadProfissional = await profissionais.findByIdAndUpdate(req.params.id, {
            nome,
            email,
            senha,
            funcao,
            horario_atendimento,
            dataEntrada,
        });
        const savedCadProfissional = await updateCadProfissional.save();
        return res.status(201).json({ message: "Cadastro alterado com sucesso.", savedCadProfissional});
        }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
      };
    });
   });
  };
  

const deleteDadosProfissional = async (req, res) => {
  try {
    const {id} = req.params;
    const findProf = await profissionais.findById(id);  
    if (!findProf) {
         return res.status(404).json({message: `Profissional com ${id} não encontrado`})
        };
    await findProf.remove();
         res.status(200).json({message: `Dados do profissionail com ${id} deletado com sucesso.`});
    }catch(error){
         res.status(500).json({message: error.message });
  };
};

module.exports = {
    findAllProfissionais,
    postProfissional,
    login,
    findFuncao,
    findProfissionalNome,
    findProfById,
    updateCadProfissional,
    deleteDadosProfissional,
}

