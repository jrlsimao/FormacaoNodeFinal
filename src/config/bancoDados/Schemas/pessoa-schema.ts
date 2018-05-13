import { Schema, Model, model} from "mongoose";
import {PessoaInterface} from "../../../interfaces/pessoa-interface";

export const pessoaSchema : Schema = new Schema({
    Nome:{
        type: String,
        required: true
    },
    NascData:{
        type: Date,
        default: Date.now(),
        required: false
    },
    Telefone:{
        type: Number,
        required: false
    },
    NIF:{
        type: Number,
        required: false
    },
    Usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    }
});

export const Pessoa : Model<PessoaInterface> = model<PessoaInterface>("Pessoas", pessoaSchema);