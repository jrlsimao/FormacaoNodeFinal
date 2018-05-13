import {MotoristaInterface} from "../../../interfaces/motorista-interface";
import { Schema, Model, model } from "mongoose";

export const motoristaSchema : Schema  = new Schema({
    nome:{
        type: String,
        required: true
    },
    dataNascimento:{
        type: Date,
        required:false
    },
    cartaConducao:{
        type:String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "Usuarios"
    },
    morada:{
        rua:{
            type: String
        },
        numero:{
            type:Number
        },
        codPostal3:{
            type:Number
        },
        codPostal2:{
            type:Number
        },
        cidade:{
            type: String
        },
        pais:{
            type: String
        }
    },
    telefone:{
        type: Number
    },
    veiculo:{
        marca:{
            type:String,
            required: true
        },
        modelo:{
            type:String,
            required: true
        },
        ano:{
            type: Number,
            required:false
        },
        matricula:{
            type:String,
            required: false
        }
    },
    status:{
        type: String,
        required: true
    }
});

export const Motorista : Model<MotoristaInterface> = model<MotoristaInterface>("Motoristas", motoristaSchema);
