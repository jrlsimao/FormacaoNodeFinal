import { Schema, Model, model} from "mongoose";
import {ViagemInterface} from '../../../interfaces/viagem-interface';

const ViagemSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        required: true
    },
    origem:{
        type: [Number, Number],
        required: true
    },
    destino:{
        type:[Number, Number],
        required: true
    },
    dataViagem:{
        type:Date,
        default: Date.now
    },
    motorista:{
        type: Schema.Types.ObjectId,
        required: true
    }
});

export const Viagem : Model<ViagemInterface> = model("Viagens", ViagemSchema); 