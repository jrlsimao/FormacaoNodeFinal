import { Schema, Model, model} from "mongoose";
import {LocalUsuarioInterface} from '../../../interfaces/local-usuario-interface';

const LocalUsuarioSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        refs: 'Usuarios'
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
    }
});

LocalUsuarioSchema.index({localizacao:"2dsphere"});

export const LocalizacaoUsuario = model<LocalUsuarioInterface>("LocalizacaoUsuarios", LocalUsuarioSchema);