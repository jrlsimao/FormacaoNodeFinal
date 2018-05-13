import {Document, Schema} from 'mongoose';
import {LocalizacaoInterface} from './localizacao-interface';

export interface LocalUsuarioInterface extends Document{
    usuario: Schema.Types.ObjectId;
    localizacao: LocalizacaoInterface;
    data?: Date;
}