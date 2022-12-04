const mongoose = require ('mongoose');

const pacienteSchema = new mongoose.Schema(
    {
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            default:mongoose.Types.ObjectId
        },
        nome_crianca:{
            type:String,
            required:true,
        },
        senha:{
            type:String,
            required:true,
        },
        idade:{
            type:String,
            required:true,
        },
       responsaveis:{
            type:[String],
            required:true,
        },
       restricoes:{
            type:String,
            require:true,
       },
       alergias:{
                type:[String],
                require:true,
       },
       data_entrada:{
            type: Number,
            require:true,
       },
       },
    {
        timestampe:true,
        versionKey :false
    }
);

const Model = mongoose.model("Paciente", pacienteSchema);

module.exports = Model;