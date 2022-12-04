const mongoose = require('mongoose');

const relatorioSchema = new mongoose.Schema(
    {
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            default:mongoose.Types.ObjectId,
        },
        finalidade_atendimento:{
            type:String,
            required:true,
        },
        relator:{
            type:String,
            required:true,
        },
        metodos:{
            type:[String],
         required:true,
        },
        materiais:{
           type:[String],
          required:true,
        },
        descricao:{
            type:String,
            required:true,
        },
        resultados:{
            type:String,
            required:true,
        },
        profissional:{
            type:mongoose.Schema.Types.ObjectId, 
            required:true,
            ref:"Profissional",
        },
        paciente:{
            type:mongoose.Schema.Types.ObjectId, 
            required:true,
            ref:"Paciente",
        },
    },
    {
        timestamps:true
    }        
);

const Model = mongoose.model("Relatorio", relatorioSchema); 

module.exports = Model;