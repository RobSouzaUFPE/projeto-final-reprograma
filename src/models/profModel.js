const mongoose = require ('mongoose');

const profSchema = new mongoose.Schema(
    {
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            default:mongoose.Types.ObjectId
        },
        nome:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
       },
       senha:{
            type:String,
            required:true,
       },
       funcao:{
            type:String,
            require:true,
       },
       horario_atendimento:{
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

const Model = mongoose.model("Profissional", profSchema);

module.exports = Model;