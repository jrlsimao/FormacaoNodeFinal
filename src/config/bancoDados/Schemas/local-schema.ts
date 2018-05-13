import { Schema, Model, model} from "mongoose";
import {LocalInterface} from '../../../interfaces/local-interface';

const LocalSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId
    },
    localizacao:{
        type:{
            String,
            default: 'Point'
        },
        coordinates:{
            type:[Number],
            index: '2dsphere'
        }
    },
    motorista:{
        type:Boolean
    }
});

LocalSchema.index({localizacao:"2dsphere"});

export const Localizacao = model<LocalInterface>("Localizacao", LocalSchema);